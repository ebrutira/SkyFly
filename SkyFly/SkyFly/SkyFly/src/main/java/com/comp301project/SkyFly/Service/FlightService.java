package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.FlightDTO;
import com.comp301project.SkyFly.Model.Flight;

import java.util.List;

public interface FlightService {
    List<FlightDTO> getAllFlights();
    FlightDTO getFlightById(Long id);
    FlightDTO createFlight(FlightDTO flightDTO);
    FlightDTO updateFlight(Long id, FlightDTO flightDTO);
    void deleteFlight(Long id);

//    List<Flight> searchFlightsByParams(String companyName, String origin, String destination, String arrivalTime, Double price);

    List<Flight> searchFlightsByParams(String origin, String destination, String arrivalTime);
}