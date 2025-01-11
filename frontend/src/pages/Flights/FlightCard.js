import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    Button,
    Chip
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FlightCard = ({ flight }) => {
    // Fiyatı formatlama fonksiyonu
    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(price);
    };

    return (
        <Card
            sx={{
                mb: 2,
                border: '1px solid #C5D5EA',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(115, 146, 183, 0.2)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                }
            }}
        >
            <CardContent>
                {/* Uçuş Numarası ve Fiyat */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                        label={`Uçuş: ${flight.flightNumber}`}
                        sx={{
                            bgcolor: '#FFECD6',
                            color: '#7392B7',
                            fontWeight: 'bold'
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#7392B7',
                            fontWeight: 'bold'
                        }}
                    >
                        {formatPrice(flight.price)}
                    </Typography>
                </Box>

                {/* Kalkış ve Varış Bilgileri */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <FlightTakeoffIcon sx={{ color: '#7392B7', mb: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {flight.origin}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {flight.departureTime}
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#B3C5D7'
                    }}>
                        <AccessTimeIcon sx={{ mx: 1 }} />
                        <Divider sx={{ width: 100 }} />
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <FlightLandIcon sx={{ color: '#7392B7', mb: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {flight.destination}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {flight.arrivalTime}
                        </Typography>
                    </Box>
                </Box>

                {/* Seç Butonu */}
                <Box sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#7392B7',
                            '&:hover': {
                                bgcolor: '#759EB8'
                            }
                        }}
                    >
                        Seç
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FlightCard;