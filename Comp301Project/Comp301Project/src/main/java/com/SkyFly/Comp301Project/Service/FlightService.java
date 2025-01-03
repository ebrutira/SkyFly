package com.SkyFly.Comp301Project.Service;

import com.SkyFly.Comp301Project.DTO.FlightDTO;
import java.util.List;

public interface FlightService {
    List<FlightDTO> getAllFlights();
    FlightDTO getFlightById(Long id);
    FlightDTO createFlight(FlightDTO flightDTO);
    FlightDTO updateFlight(Long id, FlightDTO flightDTO);
    void deleteFlight(Long id);
}