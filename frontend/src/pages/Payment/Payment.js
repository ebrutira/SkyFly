import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useAuth } from '../../contexts/AuthContext';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const bookingData = location.state;

    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [error, setError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Kart numarası formatı için yardımcı fonksiyon
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Form girdilerini işle
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            const formatted = formatCardNumber(value);
            if (formatted.replace(/\s/g, '').length <= 16) {
                setCardData({ ...cardData, [name]: formatted });
            }
        } else if (name === 'cvv') {
            if (value.length <= 3) {
                setCardData({ ...cardData, [name]: value });
            }
        } else {
            setCardData({ ...cardData, [name]: value });
        }
    };

    // Form gönderimi
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basit validasyon
        if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
            setError('Geçerli bir kart numarası giriniz');
            return;
        }

        if (!cardData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            setError('Geçerli bir son kullanma tarihi giriniz (AA/YY)');
            return;
        }

        if (cardData.cvv.length !== 3) {
            setError('Geçerli bir CVV giriniz');
            return;
        }

        // Ödeme onayı için dialog göster
        setShowConfirmation(true);
    };

    // Ödeme onayı
    const handleConfirmPayment = async () => {
        try {
            // Backende ödeme onayı gönder
            const response = await fetch('http://localhost:8080/api/bookings/${bookingData.bookingId}/confirm', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Ödeme işlemi başarısız oldu');
            }

            // Başarılı ödeme sonrası profil sayfasına yönlendir
            navigate('/profile', { state: { paymentSuccess: true } });
        } catch (err) {
            setError(err.message);
            setShowConfirmation(false);
        }
    };

    return (
        <Box sx={{ bgcolor: '#D8E1E9', minHeight: '90vh', py: 4 }}>
            <Container maxWidth="sm">
                <Paper sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #C5D5EA' }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <CreditCardIcon sx={{ fontSize: 40, color: '#7392B7', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                            Ödeme
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Kart Numarası"
                                    name="cardNumber"
                                    value={cardData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="1234 5678 9012 3456"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Son Kullanma Tarihi"
                                    name="expiryDate"
                                    value={cardData.expiryDate}
                                    onChange={handleChange}
                                    placeholder="AA/YY"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="CVV"
                                    name="cvv"
                                    value={cardData.cvv}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ color: '#7392B7', mt: 2 }}>
                                    Toplam Tutar: {bookingData?.totalPrice} TL
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#7392B7',
                                        '&:hover': { bgcolor: '#759EB8' }
                                    }}
                                >
                                    Ödemeyi Tamamla
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {/* Onay Dialog */}
                <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)}>
                    <DialogTitle>Ödeme Onayı</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {bookingData?.totalPrice} TL tutarındaki ödemeyi onaylıyor musunuz?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowConfirmation(false)}>
                            İptal
                        </Button>
                        <Button onClick={handleConfirmPayment} autoFocus>
                            Onayla
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default Payment;