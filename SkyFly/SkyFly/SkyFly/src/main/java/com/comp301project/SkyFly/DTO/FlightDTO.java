package com.comp301project.SkyFly.DTO;

import lombok.Data;

@Data
public class FlightDTO {
    private String flightNumber;
    private String origin;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private double price;

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
}

    public String getOrigin() {
    return origin;
}

    public void setOrigin(String origin) {
    this.origin = origin;
}

    public String getDestination() {
    return destination;
}

    public void setDestination(String destination) {
    this.destination = destination;
}

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}