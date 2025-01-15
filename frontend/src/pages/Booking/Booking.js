import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Paper,
    Typography,
    Button,
    Alert,
    Card,
    CardContent
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import BookingSteps from './components/BookingSteps';
import FlightDetails from './components/FlightDetails';
import PassengerForm from './components/PassengerForm';
import { formatPrice } from './utils/formatters';
import bookingService from '../../services/bookingService';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const flight = location.state?.flight;

    // State tanımlamaları
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState('');
    const [passengers, setPassengers] = useState([{
        firstName: '',
        lastName: '',
        birthDate: '',
        identityNumber: ''
    }]);

    // Uçuş bilgisi kontrolü
    if (!flight) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">
                    Uçuş bilgisi bulunamadı. Lütfen uçuş seçim sayfasına dönün.
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => navigate('/flights')}
                    sx={{ mt: 2, bgcolor: '#7392B7', '&:hover': { bgcolor: '#759EB8' } }}
                >
                    Uçuşlara Dön
                </Button>
            </Container>
        );
    }

    // Form validasyonu
    const validatePassengerInfo = () => {
        return passengers.every(passenger =>
            passenger.firstName &&
            passenger.lastName &&
            passenger.birthDate &&
            passenger.identityNumber
        );
    };

    const handleNext = async () => {
        if (activeStep === 1 && !validatePassengerInfo()) {
            setError('Lütfen tüm yolcu bilgilerini doldurun');
            return;
        }

        if (activeStep === 2) {
            try {
                // Rezervasyon verilerini hazırla
                const bookingData = {
                    flightId: flight.id,
                    userEmail: user.email,
                    passengers: passengers,
                    totalPrice: flight.price * passengers.length,
                    status: 'PENDING'
                };

                // Rezervasyonu oluştur
                const response = await bookingService.createBooking(bookingData);

                // Ödeme sayfasına yönlendir
                navigate('/payment', {
                    state: {
                        bookingId: response.id,
                        flight,
                        passengers,
                        totalPrice: flight.price * passengers.length
                    }
                });
            } catch (err) {
                setError('Rezervasyon oluşturulurken bir hata oluştu: ' + err.message);
                return;
            }
        }

        setError('');
        setActiveStep((prev) => prev + 1);
    };

    // Geri butonu işlemi
    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        setError('');
    };

    // Yolcu ekleme işlemi
    const handleAddPassenger = () => {
        if (passengers.length < 5) { // Maksimum 5 yolcu
            setPassengers([...passengers, {
                firstName: '',
                lastName: '',
                birthDate: '',
                identityNumber: ''
            }]);
        }
    };

    return (
        <Box sx={{ bgcolor: '#D8E1E9', minHeight: '90vh', py: 4 }}>
            <Container>
                <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
                    {/* Başlık */}
                    <Typography
                        variant="h4"
                        sx={{ color: '#7392B7', mb: 4, fontWeight: 'bold' }}
                    >
                        Uçuş Rezervasyonu
                    </Typography>

                    {/* Adımlar */}
                    <BookingSteps activeStep={activeStep} />

                    {/* Hata Mesajı */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Ana İçerik */}
                    <Box sx={{ mb: 4 }}>
                        {activeStep === 0 && <FlightDetails flight={flight} />}
                        {activeStep === 1 && (
                            <>
                                <PassengerForm
                                    passengers={passengers}
                                    setPassengers={setPassengers}
                                />
                                {passengers.length < 5 && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleAddPassenger}
                                        sx={{
                                            mt: 2,
                                            color: '#7392B7',
                                            borderColor: '#7392B7',
                                            '&:hover': {
                                                borderColor: '#759EB8',
                                                bgcolor: 'rgba(115, 146, 183, 0.1)'
                                            }
                                        }}
                                    >
                                        Yolcu Ekle
                                    </Button>
                                )}
                            </>
                        )}
                        {activeStep === 2 && (
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#7392B7', mb: 2 }}>
                                        Rezervasyon Özeti
                                    </Typography>
                                    <Typography>
                                        Toplam Yolcu: {passengers.length}
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: '#7392B7', mt: 2 }}>
                                        Toplam Tutar: {formatPrice(flight.price * passengers.length)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </Box>

                    {/* Navigasyon Butonları */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ color: '#7392B7' }}
                        >
                            Geri
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                                bgcolor: '#7392B7',
                                '&:hover': { bgcolor: '#759EB8' }
                            }}
                        >
                            {activeStep === 2 ? 'Ödemeye Geç' : 'İleri'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Booking;