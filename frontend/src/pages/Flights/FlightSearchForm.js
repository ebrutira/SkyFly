import React, { useState } from 'react';
import {
    Paper,
    Grid,
    Button,
    Box,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const FlightSearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        departureDate: '',
    });

    const cities = [
        'Amsterdam',
        'Athens',
        'Beijing',
        'Berlin',
        'Chicago',
        'Dallas',
        'Doha',
        'Dubai',
        'Frankfurt',
        'Hong Kong',
        'Istanbul',
        'Johannesburg',
        'London',
        'Los Angeles',
        'Miami',
        'Moscow',
        'Mumbai',
        'New York',
        'Paris',
        'Rome',
        'Singapore',
        'Sydney',
        'Tokyo'
    ].sort();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchParams.origin || !searchParams.destination) {
            return; // Sadece kalkış ve varış zorunlu
        }

        try {
            const queryParams = new URLSearchParams({
                origin: searchParams.origin,
                destination: searchParams.destination
            });

            // Eğer tarih seçilmişse ekle
            if (searchParams.departureDate) {
                queryParams.append('departureDate', searchParams.departureDate);
            }

            const response = await fetch(`http://localhost:8080/api/flights/search?${queryParams}`);

            if (!response.ok) {
                throw new Error('Arama sırasında bir hata oluştu');
            }

            const data = await response.json();
            onSearch(data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleSwapLocations = () => {
        setSearchParams(prev => ({
            ...prev,
            origin: prev.destination,
            destination: prev.origin
        }));
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #C5D5EA'
            }}
        >
            <Grid container spacing={3} alignItems="center">
                {/* Kalkış ve Varış */}
                <Grid item xs={12} md={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Nereden</InputLabel>
                            <Select
                                name="origin"
                                value={searchParams.origin}
                                onChange={handleChange}
                                required
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                                    </InputAdornment>
                                }
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <IconButton
                            onClick={handleSwapLocations}
                            sx={{
                                color: '#7392B7',
                                '&:hover': { bgcolor: '#FFECD6' }
                            }}
                        >
                            <SwapHorizIcon />
                        </IconButton>

                        <FormControl fullWidth>
                            <InputLabel>Nereye</InputLabel>
                            <Select
                                name="destination"
                                value={searchParams.destination}
                                onChange={handleChange}
                                required
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FlightLandIcon sx={{ color: '#7392B7' }} />
                                    </InputAdornment>
                                }
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                {/* Tarih (Opsiyonel) */}
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        name="departureDate"
                        label="Gidiş Tarihi (Opsiyonel)"
                        type="date"
                        value={searchParams.departureDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon sx={{ color: '#7392B7' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Arama Butonu */}
                <Grid item xs={12} md={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        startIcon={<SearchIcon />}
                        sx={{
                            height: '56px',
                            bgcolor: '#7392B7',
                            '&:hover': {
                                bgcolor: '#759EB8'
                            }
                        }}
                    >
                        Uçuş Ara
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FlightSearchForm;