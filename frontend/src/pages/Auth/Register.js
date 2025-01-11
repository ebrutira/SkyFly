import React, { useState } from 'react';
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Form validasyonu
        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor');
            setLoading(false);
            return;
        }

        // API'ye gönderilecek data
        const registerData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber
        };

        console.log('Sending register request with data:', registerData);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            console.log('Register response status:', response.status);
            const data = await response.json();
            console.log('Register response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Kayıt işlemi başarısız oldu');
            }

            // Başarılı kayıt sonrası login sayfasına yönlendir
            navigate('/login');

        } catch (err) {
            console.error('Register error:', err);
            setError(err.message || 'Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: 4
        }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #C5D5EA'
                }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <FlightTakeoffIcon sx={{ fontSize: 40, color: '#7392B7', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                            Kayıt Ol
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Ad"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Soyad"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="E-posta"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Şifre"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Şifre (Tekrar)"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Telefon"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
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
                                        '&:hover': {
                                            bgcolor: '#759EB8'
                                        }
                                    }}
                                >
                                    {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{ color: '#7392B7' }}
                        >
                            Zaten hesabınız var mı? Giriş yapın
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;