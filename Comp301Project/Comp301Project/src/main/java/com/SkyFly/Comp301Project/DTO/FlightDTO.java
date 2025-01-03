package com.SkyFly.Comp301Project.DTO;

import lombok.Data;

@Data
public class FlightDTO {
    private String flightNumber;
    private String origin;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private double price;
}