import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    Grid,
    Divider
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DateRangeIcon from '@mui/icons-material/DateRange';

const PastFlights = () => {
    // Örnek geçmiş uçuş verileri
    const pastFlights = [
        {
            id: 1,
            flightNumber: 'TK1234',
            origin: 'İstanbul',
            destination: 'Ankara',
            date: '2024-01-05',
            status: 'Tamamlandı',
            price: '799.99'
        },
        {
            id: 2,
            flightNumber: 'PC2345',
            origin: 'İzmir',
            destination: 'İstanbul',
            date: '2023-12-28',
            status: 'Tamamlandı',
            price: '649.99'
        },
        {
            id: 3,
            flightNumber: 'TK5678',
            origin: 'Ankara',
            destination: 'Antalya',
            date: '2023-12-15',
            status: 'İptal Edildi',
            price: '549.99'
        }
    ];

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3, color: '#7392B7' }}>
                Geçmiş Uçuşlarınız
            </Typography>

            {pastFlights.map((flight) => (
                <Paper
                    key={flight.id}
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
                    <Grid container spacing={2} alignItems="center">
                        {/* Üst Kısım - Uçuş No ve Durum */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    Uçuş No: {flight.flightNumber}
                                </Typography>
                                <Chip
                                    label={flight.status}
                                    color={flight.status === 'Tamamlandı' ? 'success' : 'error'}
                                    size="small"
                                />
                            </Box>
                        </Grid>

                        {/* Orta Kısım - Uçuş Detayları */}
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Kalkış
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {flight.origin}
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
                                        {flight.destination}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DateRangeIcon sx={{ color: '#7392B7' }} />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Tarih
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {flight.date}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Alt Kısım - Fiyat */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant="h6" sx={{ color: '#7392B7' }}>
                                    ₺{flight.price}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            {pastFlights.length === 0 && (
                <Typography variant="body1" color="text.secondary" align="center">
                    Henüz geçmiş uçuşunuz bulunmamaktadır.
                </Typography>
            )}
        </Box>
    );
};

export default PastFlights;