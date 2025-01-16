package com.comp301project.SkyFly.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Long id;
    private Long flightId;
    private String userEmail;
    private List<PassengerDTO> passengers;
    private LocalDateTime bookingDate;
    private String bookingNumber;
    private Double totalPrice;
    private String status;
    private String flightNumber;
    private String origin;
    private String destination;
    private String departureTime;
    private String arrivalTime;

    // Manuel getter/setter
    public Long getId() {
        return id;
    }

    public Long getFlightId() {
        return flightId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public List<PassengerDTO> getPassengers() {
        return passengers;
    }

    // Diğer getter/setter metodları
}