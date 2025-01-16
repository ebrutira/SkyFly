import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Paper,
    Typography,
    Button,
    Alert,
    Grid,
    CircularProgress,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentSummary from './components/PaymentSummary';
import PaymentForm from './components/PaymentForm';
import { useAuth } from '../../contexts/AuthContext';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const bookingData = location.state;
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cardData, setCardData] = useState(null);

    const steps = ['Kart Bilgileri', 'Ödeme Onayı'];

    const handleCardSubmit = (data) => {
        setCardData(data);
        setActiveStep(1);
    };

    // Basitleştirilmiş ödeme işlemi
    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            // Booking'i onaylayan API çağrısı
            const response = await fetch(`http://localhost:8080/api/bookings/${bookingData.bookingId}/confirm`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Ödeme işlemi sırasında bir hata oluştu');
            }

            // Profil sayfasına yönlendir
            navigate('/profile', {
                state: {
                    paymentSuccess: true,
                    message: 'Ödemeniz başarıyla tamamlandı!'
                }
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    // Booking verisi kontrolü
    if (!bookingData) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    Rezervasyon bilgisi bulunamadı.
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => navigate('/flights')}
                    sx={{ mt: 2 }}
                >
                    Uçuşlara Dön
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: '#D8E1E9', minHeight: '90vh', py: 4 }}>
            <Container maxWidth="md">
                <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #C5D5EA' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <CreditCardIcon sx={{ fontSize: 40, color: '#7392B7', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                            Ödeme
                        </Typography>
                    </Box>

                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <PaymentSummary bookingData={bookingData} />

                    {activeStep === 0 ? (
                        <PaymentForm onSubmit={handleCardSubmit} />
                    ) : (
                        <>
                            <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Kart Bilgileri:
                                </Typography>
                                <Typography>
                                    Kart No: **** **** **** {cardData.cardNumber.slice(-4)}
                                </Typography>
                                <Typography>
                                    Son Kullanma: {cardData.expiryDate}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={handleBack}
                                        disabled={loading}
                                        sx={{
                                            color: '#7392B7',
                                            borderColor: '#7392B7'
                                        }}
                                    >
                                        Geri Dön
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handlePayment}
                                        disabled={loading}
                                        sx={{
                                            bgcolor: '#7392B7',
                                            '&:hover': { bgcolor: '#759EB8' }
                                        }}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: 'white' }} />
                                        ) : (
                                            'Ödemeyi Onayla'
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default Payment;