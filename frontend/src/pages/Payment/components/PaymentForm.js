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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validatePaymentForm(cardData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSubmit(cardData);
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
                        placeholder="1234 5678 9012 3456"
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
                        type="password"
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
                        sx={{
                            mt: 2,
                            bgcolor: '#7392B7',
                            '&:hover': { bgcolor: '#759EB8' }
                        }}
                    >
                        Devam Et
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PaymentForm;