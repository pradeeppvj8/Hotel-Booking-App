package com.pradeep.hotel.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pradeep.hotel.booking.model.Booking;

public interface BookingRespository extends JpaRepository<Booking, Long> {

	List<Booking> findByRoomId(Long roomId);

	Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    List<Booking> findByGuestEmail(String email);
}
