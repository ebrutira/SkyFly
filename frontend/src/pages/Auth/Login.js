import React, { useState } from 'react';
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Divider,
    Alert,
    IconButton,
    InputAdornment,
    Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Her değişiklikte hata mesajını temizle
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const loginData = {
            email: formData.email.trim(),
            password: formData.password
        };

        console.log('Sending login request with data:', loginData);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'E-posta veya şifre hatalı');
            }

            // Token'ı kaydet
            localStorage.setItem('token', data.token);

            // Ana sayfaya yönlendir
            navigate('/');

        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Giriş yapılırken bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: 8
        }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #C5D5EA'
                }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <FlightTakeoffIcon sx={{ fontSize: 40, color: '#7392B7', mb: 1 }} />
                        <Typography variant="h4" component="h1" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                            SkyFly'a Hoşgeldiniz
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
                            Hesabınıza giriş yapın
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="E-posta"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Şifre"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                bgcolor: '#7392B7',
                                '&:hover': {
                                    bgcolor: '#759EB8'
                                }
                            }}
                        >
                            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </form>

                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            sx={{
                                color: '#7392B7',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Şifremi Unuttum
                        </Link>
                    </Box>

                    <Divider sx={{ my: 3 }}>veya</Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        component={RouterLink}
                        to="/register"
                        sx={{
                            color: '#7392B7',
                            borderColor: '#7392B7',
                            '&:hover': {
                                borderColor: '#759EB8',
                                bgcolor: 'rgba(115, 146, 183, 0.1)'
                            }
                        }}
                    >
                        Yeni Hesap Oluştur
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;