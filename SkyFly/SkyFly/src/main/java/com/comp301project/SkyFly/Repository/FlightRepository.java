package com.comp301project.SkyFly.Repository;

import com.comp301project.SkyFly.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    // Şehirler arası uçuş arama
    List<Flight> findByOriginAndDestination(String origin, String destination);

    // Tarih aralığında uçuş arama
    List<Flight> findByDepartureTimeBetween(LocalDateTime start, LocalDateTime end);

    // Fiyat aralığında uçuş arama
    List<Flight> findByPriceBetween(Double minPrice, Double maxPrice);

    // Tüm benzersiz şehirleri getir
    @Query("SELECT DISTINCT f.origin FROM Flight f ORDER BY f.origin")
    List<String> findAllOrigins();

    @Query("SELECT DISTINCT f.destination FROM Flight f ORDER BY f.destination")
    List<String> findAllDestinations();

    // Detaylı uçuş arama
    @Query("SELECT f FROM Flight f WHERE " +
            "(:origin is null or f.origin = :origin) and " +
            "(:destination is null or f.destination = :destination) and " +
            "(:departureTime is null or DATE(f.departureTime) = DATE(:departureTime)) and " +
            "(:maxPrice is null or f.price <= :maxPrice)")
    List<Flight> searchFlights(
            @Param("origin") String origin,
            @Param("destination") String destination,
            @Param("departureTime") LocalDateTime departureTime,
            @Param("maxPrice") Double maxPrice
    );
}