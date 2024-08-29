package com.pradeep.hotel.booking.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pradeep.hotel.booking.exception.InvalidBookingRequestException;
import com.pradeep.hotel.booking.exception.ResourceNotFoundException;
import com.pradeep.hotel.booking.model.Booking;
import com.pradeep.hotel.booking.model.Room;
import com.pradeep.hotel.booking.response.BookingResponse;
import com.pradeep.hotel.booking.response.RoomResponse;
import com.pradeep.hotel.booking.service.BookingService;
import com.pradeep.hotel.booking.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
	private final BookingService bookingService;
	private final RoomService roomService;

	@GetMapping("/all-bookings")
	public ResponseEntity<List<BookingResponse>> getAllBookings() {
		List<Booking> bookings = bookingService.getAllBookings();
		List<BookingResponse> bookingResponses = new ArrayList<>();

		for (Booking booking : bookings) {
			BookingResponse bookingResponse = getBookingResponse(booking);
			bookingResponses.add(bookingResponse);
		}
		return ResponseEntity.ok(bookingResponses);
	}

	@GetMapping("/confirmation/{confirmationCode}")
	public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
		try {
			Booking booking = bookingService.findBookingByConfirmationCode(confirmationCode);
			BookingResponse bookingResponse = getBookingResponse(booking);
			return ResponseEntity.ok(bookingResponse);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@PostMapping("/save-booking/{roomId}")
	public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody Booking booking) {
		try {
			String confirmationCode = bookingService.saveBooking(roomId, booking);
			return ResponseEntity.ok("Booking saved successfully. Your confirmation code is : " + confirmationCode);
		} catch (InvalidBookingRequestException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("/delete-booking/{bookingId}")
	public void deleteBooking(@PathVariable Long bookingId) {
		bookingService.deleteBooking(bookingId);
	}

	@GetMapping("/user-bookings/{email}")
	public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
		List<Booking> bookings = bookingService.getBookingsByUserEmail(email);
		List<BookingResponse> bookingResponses = new ArrayList<>();
		for (Booking booking : bookings) {
			BookingResponse bookingResponse = getBookingResponse(booking);
			bookingResponses.add(bookingResponse);
		}
		return ResponseEntity.ok(bookingResponses);
	}

	private BookingResponse getBookingResponse(Booking booking) {
		Room room = roomService.getRoomById(booking.getRoom().getId()).get();
		RoomResponse roomResponse = new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice());
		BookingResponse bookingResponse = new BookingResponse(booking.getBookingId(), booking.getCheckInDate(),
				booking.getCheckOutDate(), booking.getGuestFullName(), booking.getGuestEmail(),
				booking.getNumOfAdults(), booking.getNumOfChildren(), booking.getTotalNumOfGuests(),
				booking.getBookingConfirmationCode(), roomResponse);
		return bookingResponse;
	}
}
