package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.Model.Flight;
import com.comp301project.SkyFly.Repository.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightServiceImpl implements FlightService {
    private static final Logger log = LoggerFactory.getLogger(FlightServiceImpl.class);

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Flight> getAllFlights() {
        log.info("Fetching all flights");
        return flightRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Flight getFlightById(Long id) {
        log.info("Fetching flight with id: {}", id);
        return flightRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public Flight createFlight(Flight flight) {
        log.info("Creating new flight: {}", flight);
        return flightRepository.save(flight);
    }

    @Override
    public Flight updateFlight(Long id, Flight flight) {
        log.info("Updating flight with id: {}", id);
        if (flightRepository.existsById(id)) {
            flight.setId(id);
            return flightRepository.save(flight);
        }
        return null;
    }

    @Override
    public void deleteFlight(Long id) {
        log.info("Deleting flight with id: {}", id);
        flightRepository.deleteById(id);
    }

    @Override
    public List<Flight> searchFlights(
            String origin,
            String destination,
            String departureDate,
            String companyName,
            Double minPrice,
            Double maxPrice
    ) {
        log.info("Searching flights with params: origin={}, destination={}, departureDate={}, companyName={}, minPrice={}, maxPrice={}",
                origin, destination, departureDate, companyName, minPrice, maxPrice);

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Flight> query = cb.createQuery(Flight.class);
        Root<Flight> flight = query.from(Flight.class);
        List<Predicate> predicates = new ArrayList<>();

        if (origin != null && !origin.isEmpty()) {
            predicates.add(cb.equal(flight.get("origin"), origin));
        }

        if (destination != null && !destination.isEmpty()) {
            predicates.add(cb.equal(flight.get("destination"), destination));
        }

        if (departureDate != null && !departureDate.trim().isEmpty()) {
            LocalDate date = LocalDate.parse(departureDate);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
            predicates.add(cb.between(flight.get("departureTime"), startOfDay, endOfDay));
        }

        if (companyName != null && !companyName.trim().isEmpty()) {
            predicates.add(cb.equal(flight.get("companyName"), companyName));
        }

        if (minPrice != null) {
            predicates.add(cb.greaterThanOrEqualTo(flight.get("price"), minPrice));
        }

        if (maxPrice != null) {
            predicates.add(cb.lessThanOrEqualTo(flight.get("price"), maxPrice));
        }

        if (!predicates.isEmpty()) {
            query.where(predicates.toArray(new Predicate[0]));
        }

        query.orderBy(cb.asc(flight.get("departureTime")));

        List<Flight> results = entityManager.createQuery(query)
                .getResultList();

        log.info("Found {} flights matching search criteria", results.size());

        return results.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllCities() {
        log.info("Fetching all cities");
        List<String> cities = new ArrayList<>();
        cities.addAll(flightRepository.findAllOrigins());
        cities.addAll(flightRepository.findAllDestinations());
        List<String> distinctSortedCities = cities.stream()
                .distinct()
                .sorted()
                .collect(Collectors.toList());
        log.info("Found {} unique cities", distinctSortedCities.size());
        return distinctSortedCities;
    }

    private Flight convertToDTO(Flight flight) {
        Flight dto = new Flight();
        dto.setId(flight.getId());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setCompanyName(flight.getCompanyName());
        dto.setOrigin(flight.getOrigin());
        dto.setDestination(flight.getDestination());
        dto.setDepartureTime(flight.getDepartureTime());
        dto.setArrivalTime(flight.getArrivalTime());
        dto.setPrice(flight.getPrice());
        // Booking bilgilerini dahil etmiyoruz
        return dto;
    }
}