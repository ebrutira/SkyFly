package com.comp301project.SkyFly.Repository;

import com.comp301project.SkyFly.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {

}