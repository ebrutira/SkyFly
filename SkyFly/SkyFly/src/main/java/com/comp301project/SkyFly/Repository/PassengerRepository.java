package com.comp301project.SkyFly.Repository;

import com.comp301project.SkyFly.Model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    // Rezervasyona ait tüm yolcuları getir
    List<Passenger> findByBookingId(Long bookingId);

    // TC kimlik numarasına göre yolcu ara
    List<Passenger> findByIdentityNumber(String identityNumber);

    // Belirli bir uçuştaki tüm yolcular
    @Query("SELECT p FROM Passenger p WHERE p.booking.flight.id = :flightId")
    List<Passenger> findPassengersByFlightId(@Param("flightId") Long flightId);
}