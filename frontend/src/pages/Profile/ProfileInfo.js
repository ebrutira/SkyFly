import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Button,
    Alert,
    Box,
    Snackbar
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ProfileInfo = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthDate: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                birthDate: user.birthDate || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSnackbar({
                    open: true,
                    message: 'Profil bilgileriniz başarıyla güncellendi!',
                    severity: 'success'
                });
            } else {
                throw new Error('Profil güncellenirken bir hata oluştu');
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Profil güncellenirken bir hata oluştu.',
                severity: 'error'
            });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Ad"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Soyad"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="E-posta"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Telefon"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Adres"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Doğum Tarihi"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            bgcolor: '#7392B7',
                            '&:hover': {
                                bgcolor: '#759EB8'
                            }
                        }}
                    >
                        Bilgileri Güncelle
                    </Button>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfileInfo;