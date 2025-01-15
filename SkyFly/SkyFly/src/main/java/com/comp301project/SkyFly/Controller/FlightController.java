package com.comp301project.SkyFly.Controller;

import com.comp301project.SkyFly.DTO.FlightDTO;
import com.comp301project.SkyFly.Exception.InvalidRequestException;
import com.comp301project.SkyFly.Model.Flight;
import com.comp301project.SkyFly.Service.FlightService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Validated
public class FlightController {
    private static final Logger logger = LoggerFactory.getLogger(FlightController.class);

    private final FlightService flightService;

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        logger.info("Fetching all flights");
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        logger.info("Fetching flight with id: {}", id);
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Flight> createFlight(@RequestBody @Validated Flight flight) {
        logger.info("Creating new flight: {}", flight);
        validateFlight(flight);
        return ResponseEntity.ok(flightService.createFlight(flight));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody @Validated Flight flight) {
        logger.info("Updating flight with id: {}", id);
        validateFlight(flight);
        return ResponseEntity.ok(flightService.updateFlight(id, flight));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        logger.info("Deleting flight with id: {}", id);
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Flight>> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        logger.info("Searching flights with params: origin={}, destination={}, departureDate={}, companyName={}, minPrice={}, maxPrice={}",
                origin, destination, departureDate, companyName, minPrice, maxPrice);

        validateSearchParameters(origin, destination, minPrice, maxPrice);

        List<Flight> flights = flightService.searchFlights(
                origin,
                destination,
                departureDate != null ? departureDate.toString() : null,
                companyName,
                minPrice,
                maxPrice
        );

        return ResponseEntity.ok(flights);
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        logger.info("Fetching all cities");
        return ResponseEntity.ok(flightService.getAllCities());
    }

    private void validateFlight(Flight flight) {
        if (flight.getDepartureTime().isAfter(flight.getArrivalTime())) {
            throw new InvalidRequestException("Kalkış zamanı varış zamanından sonra olamaz");
        }
        if (flight.getPrice() <= 0) {
            throw new InvalidRequestException("Fiyat 0'dan büyük olmalıdır");
        }
    }

    private void validateSearchParameters(String origin, String destination, Double minPrice, Double maxPrice) {
        if (origin.equals(destination)) {
            throw new InvalidRequestException("Kalkış ve varış noktaları aynı olamaz");
        }
        if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
            throw new InvalidRequestException("Minimum fiyat maksimum fiyattan büyük olamaz");
        }
    }
}