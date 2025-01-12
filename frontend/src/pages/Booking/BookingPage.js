import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    Divider,
    Alert
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { useAuth } from '../../contexts/AuthContext';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const flight = location.state?.flight;
    const [error, setError] = useState('');

    if (!flight) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    Uçuş bilgisi bulunamadı. Lütfen uçuş seçim sayfasına dönün.
                </Alert>
                <Button
                    onClick={() => navigate('/flights')}
                    sx={{ mt: 2 }}
                >
                    Uçuşlara Dön
                </Button>
            </Container>
        );
    }

    const formatDateTime = (dateTimeStr) => {
        return new Date(dateTimeStr).toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(price);
    };

    const handleBooking = async () => {
        try {
            // API çağrısı eklenecek
            navigate('/payment', { state: { flight } });
        } catch (err) {
            setError('Rezervasyon işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <Box sx={{ bgcolor: '#D8E1E9', minHeight: '90vh', py: 4 }}>
            <Container>
                <Typography
                    variant="h4"
                    sx={{ color: '#7392B7', mb: 4, fontWeight: 'bold' }}
                >
                    Uçuş Rezervasyonu
                </Typography>

                <Grid container spacing={3}>
                    {/* Uçuş Detayları */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#7392B7' }}>
                                Uçuş Bilgileri
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                                        <Box>
                                            <Typography color="textSecondary" variant="body2">
                                                Kalkış
                                            </Typography>
                                            <Typography variant="body1">
                                                {flight.origin}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {formatDateTime(flight.departureTime)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <FlightLandIcon sx={{ color: '#7392B7' }} />
                                        <Box>
                                            <Typography color="textSecondary" variant="body2">
                                                Varış
                                            </Typography>
                                            <Typography variant="body1">
                                                {flight.destination}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {formatDateTime(flight.arrivalTime)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle1">
                                    Uçuş No: {flight.flightNumber}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#7392B7' }}>
                                    {formatPrice(flight.price)}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Yolcu Bilgileri */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#7392B7' }}>
                                Özet
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography color="textSecondary">Toplam Tutar</Typography>
                                <Typography variant="h5" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                                    {formatPrice(flight.price)}
                                </Typography>
                            </Box>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleBooking}
                                sx={{
                                    bgcolor: '#7392B7',
                                    '&:hover': { bgcolor: '#759EB8' }
                                }}
                            >
                                Rezervasyon Yap
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BookingPage;