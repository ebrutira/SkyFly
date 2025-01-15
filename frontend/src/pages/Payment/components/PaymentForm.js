import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    InputAdornment,
    Alert
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import EventIcon from '@mui/icons-material/Event';
import { formatCardNumber, formatExpiryDate, validatePaymentForm } from '../utils/formatters';

const PaymentForm = ({ onSubmit }) => {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const validation = validatePaymentForm(cardData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            setLoading(false);
            return;
        }

        try {
            await onSubmit(cardData);
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {errors.submit && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.submit}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Kart Numarası"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleChange}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        disabled={loading}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CreditCardIcon sx={{ color: '#7392B7' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Son Kullanma Tarihi"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleChange}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate}
                        disabled={loading}
                        placeholder="AA/YY"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventIcon sx={{ color: '#7392B7' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="CVV"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleChange}
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                        disabled={loading}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: '#7392B7' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            bgcolor: '#7392B7',
                            '&:hover': { bgcolor: '#759EB8' }
                        }}
                    >
                        {loading ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PaymentForm;