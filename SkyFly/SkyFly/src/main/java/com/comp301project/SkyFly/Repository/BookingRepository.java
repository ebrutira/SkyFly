package com.comp301project.SkyFly.Repository;

import com.comp301project.SkyFly.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Kullanıcının tüm rezervasyonlarını getir
    List<Booking> findByUserId(Long userId);

    // Uçuşa ait tüm rezervasyonları getir
    List<Booking> findByFlightId(Long flightId);

    // Rezervasyon numarasına göre arama
    Optional<Booking> findByBookingNumber(String bookingNumber);

    // Kullanıcının aktif rezervasyonları (iptal edilmemiş)
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId AND b.status != 'CANCELLED'")
    List<Booking> findActiveBookingsByUserId(@Param("userId") Long userId);

    // Bir uçuşun onaylanmış rezervasyon sayısı
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.flight.id = :flightId AND b.status = 'CONFIRMED'")
    Long countConfirmedBookingsByFlightId(@Param("flightId") Long flightId);
}