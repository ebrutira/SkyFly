package com.comp301project.SkyFly.Service;

import com.comp301project.SkyFly.DTO.BookingDTO;
import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO getBooking(Long id);
    List<BookingDTO> getUserBookings(String email);
    BookingDTO updateBookingStatus(Long id, String status);
    void cancelBooking(Long id);
}