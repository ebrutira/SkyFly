package com.comp301project.SkyFly.Repository;

import com.comp301project.SkyFly.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    @Query("SELECT DISTINCT f.origin FROM Flight f ORDER BY f.origin")
    List<String> findAllOrigins();

    @Query("SELECT DISTINCT f.destination FROM Flight f ORDER BY f.destination")
    List<String> findAllDestinations();
}