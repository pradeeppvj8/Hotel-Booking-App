package com.pradeep.hotel.booking.service;

import java.util.List;

import com.pradeep.hotel.booking.model.Booking;

public interface BookingService {

	List<Booking> getBookingsByRoomId(Long roomId);

	void deleteBooking(Long bookingId);

	String saveBooking(Long roomId, Booking booking);

	Booking findBookingByConfirmationCode(String confirmationCode);

	List<Booking> getAllBookings();

	List<Booking> getBookingsByUserEmail(String email);
}
