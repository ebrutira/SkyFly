package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.Model.Flight;
import com.comp301project.SkyFly.Repository.FlightRepository;
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

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlightById(Long id) {
        return flightRepository.findById(id).orElse(null);
    }

    @Override
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public Flight updateFlight(Long id, Flight flight) {
        if (flightRepository.existsById(id)) {
            flight.setId(id);
            return flightRepository.save(flight);
        }
        return null;
    }

    @Override
    public void deleteFlight(Long id) {
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
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Flight> query = cb.createQuery(Flight.class);
        Root<Flight> flight = query.from(Flight.class);
        List<Predicate> predicates = new ArrayList<>();

        // Kalkış ve varış filtreleri
        predicates.add(cb.equal(flight.get("origin"), origin));
        predicates.add(cb.equal(flight.get("destination"), destination));

        // Tarih filtresi
        if (departureDate != null && !departureDate.trim().isEmpty()) {
            LocalDate date = LocalDate.parse(departureDate);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
            predicates.add(cb.between(flight.get("departureTime"), startOfDay, endOfDay));
        }

        // Havayolu filtresi
        if (companyName != null && !companyName.trim().isEmpty()) {
            predicates.add(cb.equal(flight.get("companyName"), companyName));
        }

        // Fiyat filtreleri
        if (minPrice != null) {
            predicates.add(cb.greaterThanOrEqualTo(flight.get("price"), minPrice));
        }
        if (maxPrice != null) {
            predicates.add(cb.lessThanOrEqualTo(flight.get("price"), maxPrice));
        }

        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(flight.get("departureTime")));

        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<String> getAllCities() {
        List<String> cities = new ArrayList<>();
        cities.addAll(flightRepository.findAllOrigins());
        cities.addAll(flightRepository.findAllDestinations());
        return cities.stream().distinct().sorted().toList();
    }
}