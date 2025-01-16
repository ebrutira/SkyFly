package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.BookingDTO;
import com.comp301project.SkyFly.DTO.PassengerDTO;
import com.comp301project.SkyFly.Exception.BookingNotFoundException;
import com.comp301project.SkyFly.Model.Booking;
import com.comp301project.SkyFly.Model.Flight;
import com.comp301project.SkyFly.Model.Passenger;
import com.comp301project.SkyFly.Model.User;
import com.comp301project.SkyFly.Repository.BookingRepository;
import com.comp301project.SkyFly.Repository.FlightRepository;
import com.comp301project.SkyFly.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private static final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        log.info("Creating booking for flight ID: {} and user email: {}",
                bookingDTO.getFlightId(), bookingDTO.getUserEmail());

        Flight flight = flightRepository.findById(bookingDTO.getFlightId())
                .orElseThrow(() -> new RuntimeException("Uçuş bulunamadı"));

        User user = userRepository.findByEmail(bookingDTO.getUserEmail())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        final Booking newBooking = Booking.builder()
                .user(user)
                .flight(flight)
                .bookingDate(LocalDateTime.now())
                .bookingNumber(generateBookingNumber())
                .totalPrice(bookingDTO.getTotalPrice())
                .status("PENDING")
                .passengers(new ArrayList<>())
                .build();

        final Booking savedBooking = bookingRepository.save(newBooking);
        log.info("Created booking with number: {}", savedBooking.getBookingNumber());

        if (bookingDTO.getPassengers() != null && !bookingDTO.getPassengers().isEmpty()) {
            List<Passenger> passengers = bookingDTO.getPassengers().stream()
                    .map(passengerDTO -> Passenger.builder()
                            .booking(savedBooking)
                            .firstName(passengerDTO.getFirstName())
                            .lastName(passengerDTO.getLastName())
                            .birthDate(passengerDTO.getBirthDate())
                            .identityNumber(passengerDTO.getIdentityNumber())
                            .seatNumber(passengerDTO.getSeatNumber())
                            .build())
                    .collect(Collectors.toList());

            savedBooking.setPassengers(passengers);
            final Booking finalBooking = bookingRepository.save(savedBooking);
            log.info("Added {} passengers to booking {}", passengers.size(), finalBooking.getBookingNumber());

            return modelMapper.map(finalBooking, BookingDTO.class);
        }

        return modelMapper.map(savedBooking, BookingDTO.class);
    }

    @Override
    public BookingDTO getBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Rezervasyon bulunamadı"));
        return modelMapper.map(booking, BookingDTO.class);
    }

    @Override
    public List<BookingDTO> getUserBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        List<Booking> bookings = bookingRepository.findByUserId(user.getId());
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingDTO updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Rezervasyon bulunamadı"));

        booking.setStatus(status);
        booking = bookingRepository.save(booking);
        return modelMapper.map(booking, BookingDTO.class);
    }

    @Override
    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Rezervasyon bulunamadı"));

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    private String generateBookingNumber() {
        return "BK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}