import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Divider
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { formatPrice } from '../utils/formatters';

const PaymentSummary = ({ bookingData }) => {
    return (
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" sx={{ color: '#7392B7', mb: 2 }}>
                Rezervasyon Özeti
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Kalkış
                            </Typography>
                            <Typography variant="body1">
                                {bookingData?.flight?.origin}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {bookingData?.flight?.departureTime}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FlightLandIcon sx={{ color: '#7392B7' }} />
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Varış
                            </Typography>
                            <Typography variant="body1">
                                {bookingData?.flight?.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {bookingData?.flight?.arrivalTime}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography color="textSecondary">Yolcu Sayısı</Typography>
                        <Typography variant="h6">
                            {bookingData?.passengers?.length || 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                        <Typography color="textSecondary">Toplam Tutar</Typography>
                        <Typography variant="h6" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                            {formatPrice(bookingData?.totalPrice)}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default PaymentSummary;