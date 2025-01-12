import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Alert,
    Grid
} from '@mui/material';
import FlightSearchForm from './FlightSearchForm';
import FlightCard from './FlightCard';
import FlightFilters from './FlightFilters';

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        timeRange: [0, 24],
        airlines: []
    });

    const handleSearch = async (searchResults) => {
        setLoading(true);
        setError(null);
        try {
            setFlights(searchResults);
            setHasSearched(true);

            // Filtreleri güncelle
            const uniqueAirlines = [...new Set(searchResults.map(flight => flight.companyName))];
            const maxPrice = Math.max(...searchResults.map(flight => flight.price));

            setFilters(prev => ({
                ...prev,
                airlines: [], // Reset airlines filter
                priceRange: [0, maxPrice] // Update price range based on results
            }));

        } catch (err) {
            console.error('Search error:', err);
            setError('Arama sırasında bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const getFilteredFlights = () => {
        return flights.filter(flight => {
            const price = parseFloat(flight.price);
            const departureTime = new Date(flight.departureTime);
            const hour = departureTime.getHours();

            const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
            const matchesTime = hour >= filters.timeRange[0] && hour <= filters.timeRange[1];
            const matchesAirline = filters.airlines.length === 0 ||
                filters.airlines.includes(flight.companyName);

            return matchesPrice && matchesTime && matchesAirline;
        });
    };

    const filteredFlights = getFilteredFlights();

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '90vh',
            py: 4
        }}>
            <Container>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        color: '#7392B7',
                        mb: 4,
                        fontWeight: 'bold'
                    }}
                >
                    Uçuş Ara
                </Typography>

                <FlightSearchForm onSearch={handleSearch} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: '#7392B7' }} />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                ) : hasSearched ? (
                    flights.length > 0 ? (
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={3}>
                                <FlightFilters
                                    filters={filters}
                                    onChange={handleFilterChange}
                                    airlines={[...new Set(flights.map(flight => flight.companyName))]}
                                />
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        color: '#7392B7'
                                    }}
                                >
                                    Bulunan Uçuşlar ({filteredFlights.length})
                                </Typography>

                                {filteredFlights.length > 0 ? (
                                    filteredFlights.map((flight) => (
                                        <FlightCard key={flight.id} flight={flight} />
                                    ))
                                ) : (
                                    <Alert severity="info">
                                        Seçilen filtrelere uygun uçuş bulunamadı.
                                    </Alert>
                                )}
                            </Grid>
                        </Grid>
                    ) : (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            Aramanıza uygun uçuş bulunamadı.
                        </Alert>
                    )
                ) : (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        py: 4,
                        color: '#7392B7'
                    }}>
                        <Typography variant="h6">
                            Lütfen uçuş aramak için yukarıdaki formu kullanın
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default FlightList;