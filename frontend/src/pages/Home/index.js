import React from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '90vh',
            pt: 8,
            pb: 12
        }}>
            <Container>
                {/* Hero Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 3,
                        border: '1px solid #C5D5EA'
                    }}
                >
                    <FlightTakeoffIcon sx={{ fontSize: 60, color: '#7392B7', mb: 2 }} />
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            color: '#7392B7',
                            fontWeight: 'bold',
                            mb: 3
                        }}
                    >
                        Welcome to SkyFly
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Discover amazing flight deals and travel the world with ease
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<SearchIcon />}
                            onClick={() => navigate('/flights')}
                            sx={{
                                bgcolor: '#7392B7',
                                '&:hover': { bgcolor: '#759EB8' }
                            }}
                        >
                            Search Flights
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<ExploreIcon />}
                            onClick={() => navigate('/about')}
                            sx={{
                                color: '#7392B7',
                                borderColor: '#7392B7',
                                '&:hover': {
                                    borderColor: '#759EB8',
                                    bgcolor: 'rgba(115, 146, 183, 0.1)'
                                }
                            }}
                        >
                            Learn More
                        </Button>
                    </Box>
                </Paper>

                {/* Features Section */}
                <Grid container spacing={4} sx={{ mt: 6 }}>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: 3,
                                border: '1px solid #C5D5EA',
                                height: '100%'
                            }}
                        >
                            <Typography variant="h5" sx={{ color: '#7392B7', mb: 2 }}>
                                Best Prices
                            </Typography>
                            <Typography color="text.secondary">
                                Find the most competitive prices for your flights
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: 3,
                                border: '1px solid #C5D5EA',
                                height: '100%'
                            }}
                        >
                            <Typography variant="h5" sx={{ color: '#7392B7', mb: 2 }}>
                                Easy Booking
                            </Typography>
                            <Typography color="text.secondary">
                                Simple and secure booking process
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: 3,
                                border: '1px solid #C5D5EA',
                                height: '100%'
                            }}
                        >
                            <Typography variant="h5" sx={{ color: '#7392B7', mb: 2 }}>
                                24/7 Support
                            </Typography>
                            <Typography color="text.secondary">
                                Round-the-clock customer service
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;