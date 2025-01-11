import React, { useState } from 'react';
import {
    Paper,
    Grid,
    TextField,
    Button,
    Box,
    IconButton,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const FlightSearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        tripType: 'roundtrip',
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengers: {
            adult: 1,
            child: 0,
            infant: 0
        }
    });

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleTripTypeChange = (e, newTripType) => {
        if (newTripType !== null) {
            setSearchParams({
                ...searchParams,
                tripType: newTripType,
                returnDate: newTripType === 'oneway' ? '' : searchParams.returnDate
            });
        }
    };

    const handlePassengerChange = (type) => (e) => {
        setSearchParams({
            ...searchParams,
            passengers: {
                ...searchParams.passengers,
                [type]: e.target.value
            }
        });
    };

    const handleSwapLocations = () => {
        setSearchParams(prev => ({
            ...prev,
            origin: prev.destination,
            destination: prev.origin
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    const getTotalPassengers = () => {
        const { adult, child, infant } = searchParams.passengers;
        return adult + child + infant;
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
            {/* Uçuş Tipi Seçimi */}
            <Box sx={{ mb: 3 }}>
                <ToggleButtonGroup
                    value={searchParams.tripType}
                    exclusive
                    onChange={handleTripTypeChange}
                    sx={{
                        '& .MuiToggleButton-root.Mui-selected': {
                            backgroundColor: '#7392B7',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#759EB8'
                            }
                        }
                    }}
                >
                    <ToggleButton value="roundtrip">
                        Gidiş-Dönüş
                    </ToggleButton>
                    <ToggleButton value="oneway">
                        Tek Yön
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Grid container spacing={3}>
                {/* Kalkış ve Varış */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            fullWidth
                            name="origin"
                            label="Nereden"
                            value={searchParams.origin}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightTakeoffIcon sx={{ color: '#7392B7' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton
                            onClick={handleSwapLocations}
                            sx={{
                                color: '#7392B7',
                                '&:hover': { bgcolor: '#FFECD6' }
                            }}
                        >
                            <SwapHorizIcon />
                        </IconButton>
                        <TextField
                            fullWidth
                            name="destination"
                            label="Nereye"
                            value={searchParams.destination}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightLandIcon sx={{ color: '#7392B7' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>

                {/* Tarihler */}
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            fullWidth
                            name="departureDate"
                            label="Gidiş Tarihi"
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
                        {searchParams.tripType === 'roundtrip' && (
                            <TextField
                                fullWidth
                                name="returnDate"
                                label="Dönüş Tarihi"
                                type="date"
                                value={searchParams.returnDate}
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
                        )}
                    </Box>
                </Grid>

                {/* Yolcu Sayısı */}
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Yetişkin</InputLabel>
                            <Select
                                value={searchParams.passengers.adult}
                                onChange={handlePassengerChange('adult')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#7392B7' }} />
                                    </InputAdornment>
                                }
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <MenuItem key={num} value={num}>{num}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Çocuk</InputLabel>
                            <Select
                                value={searchParams.passengers.child}
                                onChange={handlePassengerChange('child')}
                            >
                                {[0, 1, 2, 3].map(num => (
                                    <MenuItem key={num} value={num}>{num}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Bebek</InputLabel>
                            <Select
                                value={searchParams.passengers.infant}
                                onChange={handlePassengerChange('infant')}
                            >
                                {[0, 1, 2].map(num => (
                                    <MenuItem key={num} value={num}>{num}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                {/* Arama Butonu */}
                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
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
                        Uçuş Ara ({getTotalPassengers()} Yolcu)
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FlightSearchForm;