import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Alert,
    Snackbar
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada form verilerini backend'e gönderebilirsiniz
        setSnackbar({
            open: true,
            message: 'Mesajınız başarıyla gönderildi!',
            severity: 'success'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '90vh',
            py: 6
        }}>
            <Container>
                <Grid container spacing={4}>
                    {/* İletişim Bilgileri */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{
                            p: 4,
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #C5D5EA'
                        }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    color: '#7392B7',
                                    mb: 4,
                                    fontWeight: 'bold'
                                }}
                            >
                                İletişim Bilgileri
                            </Typography>

                            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon sx={{ color: '#7392B7', mr: 2 }} />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        Adres
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Havaalanı Cad. No:12<br />
                                        Bakırköy, İstanbul
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon sx={{ color: '#7392B7', mr: 2 }} />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        Telefon
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        +90 (212) 555 0000
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ color: '#7392B7', mr: 2 }} />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        E-posta
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        info@skyfly.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* İletişim Formu */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                p: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #C5D5EA'
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    color: '#7392B7',
                                    mb: 4,
                                    fontWeight: 'bold'
                                }}
                            >
                                Bize Ulaşın
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Adınız"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="E-posta"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Konu"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mesajınız"
                                        name="message"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            bgcolor: '#7392B7',
                                            '&:hover': {
                                                bgcolor: '#759EB8'
                                            }
                                        }}
                                    >
                                        Mesaj Gönder
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Contact;