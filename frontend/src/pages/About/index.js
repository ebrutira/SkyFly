import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    Avatar
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentsIcon from '@mui/icons-material/Payments';

const About = () => {
    const features = [
        {
            title: 'Güvenli Uçuşlar',
            description: 'En güvenilir havayolları ile güvenli seyahat deneyimi.',
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#7392B7' }} />
        },
        {
            title: '7/24 Destek',
            description: 'Seyahatinizin her anında yanınızdayız.',
            icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#7392B7' }} />
        },
        {
            title: 'Uygun Fiyatlar',
            description: 'En iyi fiyat garantisi ile ekonomik uçuş seçenekleri.',
            icon: <PaymentsIcon sx={{ fontSize: 40, color: '#7392B7' }} />
        }
    ];

    const team = [
        {
            name: 'Alperen Kurt',
            position: 'Backend',
            avatar: '/api/placeholder/100/100'
        },
        {
            name: 'Sinem Kuru',
            position: 'Backend',
            avatar: '/api/placeholder/100/100'
        },
        {
            name: 'Ebru Tıraş',
            position: 'Frontend',
            avatar: '/api/placeholder/100/100'
        }
    ];

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '90vh',
            py: 6
        }}>
            <Container>
                {/* Hero Section */}
                <Paper sx={{
                    p: 6,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #C5D5EA',
                    mb: 6
                }}>
                    <FlightTakeoffIcon sx={{ fontSize: 60, color: '#7392B7', mb: 2 }} />
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            color: '#7392B7',
                            fontWeight: 'bold'
                        }}
                    >
                        Hakkımızda
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        SkyFly olarak, 2024'ten bu yana yolcularımıza en iyi uçuş deneyimini sunmak için çalışıyoruz.
                    </Typography>
                </Paper>

                {/* Özellikler */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper sx={{
                                p: 4,
                                height: '100%',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #C5D5EA'
                            }}>
                                {feature.icon}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#7392B7',
                                        my: 2,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Misyon & Vizyon */}
                <Paper sx={{
                    p: 4,
                    mb: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #C5D5EA'
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#7392B7',
                                    mb: 2,
                                    fontWeight: 'bold'
                                }}
                            >
                                Misyonumuz
                            </Typography>
                            <Typography paragraph>
                                Yolcularımıza güvenli, konforlu ve uygun fiyatlı uçuş deneyimi sunarak,
                                seyahat etmeyi herkes için erişilebilir kılmak.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#7392B7',
                                    mb: 2,
                                    fontWeight: 'bold'
                                }}
                            >
                                Vizyonumuz
                            </Typography>
                            <Typography paragraph>
                                Türkiye'nin en güvenilir ve tercih edilen online uçak bileti platformu
                                olarak, seyahat sektörüne yön veren bir marka olmak.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Ekibimiz */}
                <Typography
                    variant="h4"
                    sx={{
                        color: '#7392B7',
                        mb: 4,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Ekibimiz
                </Typography>
                <Grid container spacing={4}>
                    {team.map((member, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: '1px solid #C5D5EA'
                            }}>
                                <CardContent>
                                    <Avatar
                                        src={member.avatar}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            margin: '0 auto',
                                            mb: 2
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: '#7392B7',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {member.position}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default About;