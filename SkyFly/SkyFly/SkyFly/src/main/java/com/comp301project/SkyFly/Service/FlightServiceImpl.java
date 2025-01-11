package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.FlightDTO;
import com.comp301project.SkyFly.Exception.FlightNotFoundException;
import com.comp301project.SkyFly.Model.Flight;
import com.comp301project.SkyFly.Repository.FlightRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;
    private final ModelMapper modelMapper;

    public FlightServiceImpl(FlightRepository flightRepository, ModelMapper modelMapper) {
        this.flightRepository = flightRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll()
                .stream()
                .map(flight -> modelMapper.map(flight, FlightDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public FlightDTO getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found"));
        return modelMapper.map(flight, FlightDTO.class);
    }

    @Override
    public FlightDTO createFlight(FlightDTO flightDTO) {
        Flight flight = modelMapper.map(flightDTO, Flight.class);
        flight = flightRepository.save(flight);
        return modelMapper.map(flight, FlightDTO.class);
    }

    @Override
    public FlightDTO updateFlight(Long id, FlightDTO flightDTO) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found"));

        modelMapper.map(flightDTO, flight);
        flight.setId(id);
        flight = flightRepository.save(flight);

        return modelMapper.map(flight, FlightDTO.class);
    }

    @Override
    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new FlightNotFoundException("Flight not found");
        }
        flightRepository.deleteById(id);
    }
}
