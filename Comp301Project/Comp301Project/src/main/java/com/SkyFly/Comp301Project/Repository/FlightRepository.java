package com.SkyFly.Comp301Project.Repository;

import com.SkyFly.Comp301Project.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {

}