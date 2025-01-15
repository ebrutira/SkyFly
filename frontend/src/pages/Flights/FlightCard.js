import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const FlightCard = ({ flight, onSelect }) => {
    const navigate = useNavigate();

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return new Intl.DateTimeFormat('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const handleBooking = () => {
        navigate('/booking', { state: { flight } });
    };

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Chip
                            label={`Uçuş: ${flight.flightNumber}`}
                            sx={{
                                bgcolor: '#FFECD6',
                                color: '#7392B7',
                                fontWeight: 'bold'
                            }}
                        />
                        <Chip
                            label={flight.companyName}
                            variant="outlined"
                            sx={{ color: '#7392B7', borderColor: '#7392B7' }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{ color: '#7392B7', fontWeight: 'bold' }}
                    >
                        {formatPrice(flight.price)}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <FlightTakeoffIcon sx={{ color: '#7392B7', mb: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {flight.origin}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatDateTime(flight.departureTime)}
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#B3C5D7',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2
                        }}>
                            <AccessTimeIcon />
                            <Divider sx={{ flex: 1 }} />
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <FlightLandIcon sx={{ color: '#7392B7', mb: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {flight.destination}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatDateTime(flight.arrivalTime)}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        onClick={handleBooking}
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