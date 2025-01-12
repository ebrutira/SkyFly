package com.comp301project.SkyFly.Controller;

import com.comp301project.SkyFly.DTO.FlightDTO;
import com.comp301project.SkyFly.Model.Flight;
import com.comp301project.SkyFly.Service.FlightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {
    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public ResponseEntity<List<FlightDTO>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @PostMapping
    public ResponseEntity<FlightDTO> createFlight(@RequestBody FlightDTO flightDTO) {
        return ResponseEntity.ok(flightService.createFlight(flightDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlightDTO> updateFlight(@PathVariable Long id, @RequestBody FlightDTO flightDTO) {
        return ResponseEntity.ok(flightService.updateFlight(id, flightDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Flight> searchFlightsByParams(
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String arrivalTime,
            @RequestParam(required = false) String companyName, // by filter
            @RequestParam(required = false) Double minPrice,   // by filter
            @RequestParam(required = false) Double maxPrice    // by filter
    ) {
        List<Flight> flights = flightService.searchFlightsByParams(origin, destination, arrivalTime);

        // by companyName
        if (companyName != null && !companyName.isEmpty()) {
            flights = flights.stream()
                    .filter(flight -> flight.getCompanyName().equalsIgnoreCase(companyName))
                    .toList();
        }

        // by price
        if (minPrice != null || maxPrice != null) {
            double min = (minPrice != null) ? minPrice : Double.MIN_VALUE;
            double max = (maxPrice != null) ? maxPrice : Double.MAX_VALUE;
            flights = flights.stream()
                    .filter(flight -> flight.getPrice() >= min && flight.getPrice() <= max)
                    .toList();
        }

        return flights;
    }

}
