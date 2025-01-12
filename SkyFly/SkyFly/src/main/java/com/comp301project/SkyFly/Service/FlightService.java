package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.Model.Flight;
import java.util.List;

public interface FlightService {
    List<Flight> getAllFlights();
    Flight getFlightById(Long id);
    Flight createFlight(Flight flight);
    Flight updateFlight(Long id, Flight flight);
    void deleteFlight(Long id);
    List<Flight> searchFlights(
            String origin,
            String destination,
            String departureDate,
            String companyName,
            Double minPrice,
            Double maxPrice
    );
    List<String> getAllCities();
}