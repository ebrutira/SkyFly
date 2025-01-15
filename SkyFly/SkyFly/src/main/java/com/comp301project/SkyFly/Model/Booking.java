package com.comp301project.SkyFly.Model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Passenger> passengers = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime bookingDate;

    @Column(nullable = false, unique = true)
    private String bookingNumber;

    @Column(nullable = false)
    private Double totalPrice;

    @Column(nullable = false)
    private String status; // PENDING, CONFIRMED, CANCELLED

    @PrePersist
    protected void onCreate() {
        bookingDate = LocalDateTime.now();
    }
}