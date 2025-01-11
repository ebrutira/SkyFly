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
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        timeRange: [0, 24],
        airlines: []
    });

    // Örnek veri
    const sampleFlights = [
        {
            id: 1,
            flightNumber: "TK1234",
            airline: "THY",
            origin: "İstanbul",
            destination: "Ankara",
            departureTime: "10:00",
            arrivalTime: "11:00",
            price: 799.99
        },
        {
            id: 2,
            flightNumber: "PC2345",
            airline: "Pegasus",
            origin: "İstanbul",
            destination: "İzmir",
            departureTime: "14:30",
            arrivalTime: "15:30",
            price: 699.99
        },
        {
            id: 3,
            flightNumber: "TK5678",
            airline: "THY",
            origin: "İstanbul",
            destination: "Antalya",
            departureTime: "16:45",
            arrivalTime: "18:00",
            price: 999.99
        },
        {
            id: 4,
            flightNumber: "XQ1111",
            airline: "SunExpress",
            origin: "İstanbul",
            destination: "Bodrum",
            departureTime: "08:15",
            arrivalTime: "09:30",
            price: 849.99
        }
    ];

    const handleSearch = async (searchParams) => {
        setLoading(true);
        setError(null);

        try {
            // Backend bağlantısı yapıldığında burada API çağrısı yapılacak
            // Şimdilik örnek veriyi kullanıyoruz
            setTimeout(() => {
                setFlights(sampleFlights);
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError('Uçuşları getirirken bir hata oluştu. Lütfen tekrar deneyin.');
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Filtreleme fonksiyonu
    const getFilteredFlights = () => {
        return flights.filter(flight => {
            const price = flight.price;
            const time = parseInt(flight.departureTime.split(':')[0]);

            const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
            const matchesTime = time >= filters.timeRange[0] && time <= filters.timeRange[1];
            const matchesAirline = filters.airlines.length === 0 || filters.airlines.includes(flight.airline);

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
                    component="h1"
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
                ) : flights.length > 0 ? (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {/* Filtreler */}
                        <Grid item xs={12} md={3}>
                            <FlightFilters
                                filters={filters}
                                onChange={handleFilterChange}
                            />
                        </Grid>

                        {/* Uçuş Listesi */}
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
                ) : null}
            </Container>
        </Box>
    );
};

export default FlightList;