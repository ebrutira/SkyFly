package com.comp301project.SkyFly.Repository;

import org.springframework.data.repository.query.Param;
import com.comp301project.SkyFly.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query("""
        SELECT f FROM Flight f
        WHERE (:origin IS NULL OR f.origin = :origin)
        AND (:destination IS NULL OR f.destination = :destination)
        AND (:arrivalTime IS NULL OR f.arrivalTime = :arrivalTime)
       """)
    List<Flight> findFlightsByParams(
            @Param("origin") String origin,
            @Param("destination") String destination,
            @Param("arrivalTime") String arrivalTime
    );


}