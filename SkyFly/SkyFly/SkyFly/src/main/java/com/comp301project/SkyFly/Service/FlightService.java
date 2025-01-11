package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.FlightDTO;
import java.util.List;

public interface FlightService {
    List<FlightDTO> getAllFlights();
    FlightDTO getFlightById(Long id);
    FlightDTO createFlight(FlightDTO flightDTO);
    FlightDTO updateFlight(Long id, FlightDTO flightDTO);
    void deleteFlight(Long id);
}