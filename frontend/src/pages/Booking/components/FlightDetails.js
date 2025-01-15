import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { formatDateTime, formatPrice } from '../utils/formatters';

const FlightDetails = ({ flight }) => {
    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#7392B7' }}>
                Uçuş Bilgileri
            </Typography>

            <Grid container spacing={3}>
                {/* Kalkış Bilgileri */}
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography color="textSecondary" variant="body2">
                                Kalkış
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {flight.origin}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {formatDateTime(flight.departureTime)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Varış Bilgileri */}
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FlightLandIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography color="textSecondary" variant="body2">
                                Varış
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
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

            {/* Uçuş Detayları Alt Kısım */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="body2" color="textSecondary">
                        Uçuş Numarası
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                        {flight.flightNumber}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="textSecondary">
                        Bilet Fiyatı
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                        {formatPrice(flight.price)}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default FlightDetails;