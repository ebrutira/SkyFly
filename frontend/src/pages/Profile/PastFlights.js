import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Grid,
    Divider,
    Tabs,
    Tab,
    CircularProgress
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useAuth } from '../../contexts/AuthContext';

const PastFlights = () => {
    const [tabValue, setTabValue] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/bookings/my-bookings', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // Sadece geçerli uçuş bilgisi olan rezervasyonları filtrele
                const validBookings = data.filter(booking => booking.flight);
                setBookings(validBookings);
            }
        } catch (error) {
            console.error('Uçuş bilgileri alınamadı:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return '';
        const date = new Date(dateTimeStr);
        return new Intl.DateTimeFormat('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(price);
    };

    const currentDate = new Date();

    const pastBookings = bookings.filter(booking =>
        booking.flight && new Date(booking.flight.departureTime) < currentDate
    );

    const upcomingBookings = bookings.filter(booking =>
        booking.flight && new Date(booking.flight.departureTime) >= currentDate
    );

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const renderFlightCard = (booking) => (
        <Paper
            key={booking.id}
            sx={{
                p: 3,
                mb: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #C5D5EA',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(115, 146, 183, 0.2)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                }
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Rezervasyon No: {booking.bookingNumber}
                        </Typography>
                        <Chip
                            label={booking.status}
                            color={booking.status === 'CONFIRMED' ? 'success' : 'default'}
                            size="small"
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Kalkış
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {booking.flight?.origin}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDateTime(booking.flight?.departureTime)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FlightLandIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Varış
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {booking.flight?.destination}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDateTime(booking.flight?.arrivalTime)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DateRangeIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Yolcu Sayısı
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {booking.passengers?.length || 0} Yolcu
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Uçuş No: {booking.flight?.flightNumber}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#7392B7' }}>
                            {formatPrice(booking.totalPrice)}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                    mb: 3,
                    '& .MuiTab-root.Mui-selected': { color: '#7392B7' },
                    '& .MuiTabs-indicator': { backgroundColor: '#7392B7' }
                }}
            >
                <Tab label={`Gelecek Uçuşlar (${upcomingBookings.length})`} />
                <Tab label={`Geçmiş Uçuşlar (${pastBookings.length})`} />
            </Tabs>

            {tabValue === 0 ? (
                <>
                    <Typography variant="h6" sx={{ mb: 3, color: '#7392B7' }}>
                        Gelecek Uçuşlarınız
                    </Typography>
                    {upcomingBookings.length > 0 ? (
                        upcomingBookings.map(booking => renderFlightCard(booking))
                    ) : (
                        <Typography color="text.secondary" align="center">
                            Gelecek uçuşunuz bulunmamaktadır.
                        </Typography>
                    )}
                </>
            ) : (
                <>
                    <Typography variant="h6" sx={{ mb: 3, color: '#7392B7' }}>
                        Geçmiş Uçuşlarınız
                    </Typography>
                    {pastBookings.length > 0 ? (
                        pastBookings.map(booking => renderFlightCard(booking))
                    ) : (
                        <Typography color="text.secondary" align="center">
                            Geçmiş uçuşunuz bulunmamaktadır.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default PastFlights;