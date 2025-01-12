import React from 'react';
import {
    Paper,
    Typography,
    Slider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box,
    Divider
} from '@mui/material';

const FlightFilters = ({ filters, onChange, airlines = [] }) => {
    const handlePriceChange = (event, newValue) => {
        onChange({
            ...filters,
            priceRange: newValue
        });
    };

    const handleTimeChange = (event, newValue) => {
        onChange({
            ...filters,
            timeRange: newValue
        });
    };

    const handleAirlineChange = (event) => {
        const newAirlines = event.target.checked
            ? [...filters.airlines, event.target.name]
            : filters.airlines.filter(airline => airline !== event.target.name);

        onChange({
            ...filters,
            airlines: newAirlines
        });
    };

    const formatPrice = (price) => `${price.toLocaleString()} ₺`;
    const formatTime = (hour) => `${hour}:00`;

    return (
        <Paper
            sx={{
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #C5D5EA'
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: '#7392B7',
                    mb: 2,
                    fontWeight: 'bold'
                }}
            >
                Filtreler
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: '#7392B7',
                        mb: 1
                    }}
                >
                    Fiyat Aralığı
                </Typography>
                <Slider
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={Math.max(...filters.priceRange)}
                    step={100}
                    valueLabelFormat={formatPrice}
                    sx={{
                        color: '#7392B7',
                        '& .MuiSlider-thumb': {
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: '0 0 0 8px rgba(115, 146, 183, 0.16)',
                            },
                        },
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                        {formatPrice(filters.priceRange[0])}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatPrice(filters.priceRange[1])}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: '#7392B7',
                        mb: 1
                    }}
                >
                    Kalkış Saati
                </Typography>
                <Slider
                    value={filters.timeRange}
                    onChange={handleTimeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={24}
                    valueLabelFormat={formatTime}
                    sx={{ color: '#7392B7' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                        {formatTime(filters.timeRange[0])}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatTime(filters.timeRange[1])}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: '#7392B7',
                        mb: 1
                    }}
                >
                    Havayolları
                </Typography>
                <FormGroup>
                    {airlines.map((airline) => (
                        <FormControlLabel
                            key={airline}
                            control={
                                <Checkbox
                                    checked={filters.airlines.includes(airline)}
                                    onChange={handleAirlineChange}
                                    name={airline}
                                    sx={{
                                        color: '#7392B7',
                                        '&.Mui-checked': {
                                            color: '#7392B7',
                                        },
                                    }}
                                />
                            }
                            label={airline}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Paper>
    );
};

export default FlightFilters;