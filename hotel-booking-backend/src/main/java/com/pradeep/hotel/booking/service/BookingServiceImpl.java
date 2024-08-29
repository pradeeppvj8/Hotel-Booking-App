package com.pradeep.hotel.booking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pradeep.hotel.booking.exception.InvalidBookingRequestException;
import com.pradeep.hotel.booking.exception.ResourceNotFoundException;
import com.pradeep.hotel.booking.model.Booking;
import com.pradeep.hotel.booking.model.Room;
import com.pradeep.hotel.booking.repository.BookingRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
	private final BookingRespository bookingRespository;
	private final RoomService roomService;

	@Override
	public List<Booking> getAllBookings() {
		return bookingRespository.findAll();
	}

	@Override
	public void deleteBooking(Long bookingId) {
		bookingRespository.deleteById(bookingId);
	}

	@Override
	public List<Booking> getBookingsByRoomId(Long roomId) {
		return bookingRespository.findByRoomId(roomId);
	}

	@Override
	public String saveBooking(Long roomId, Booking booking) {

		if (booking.getCheckOutDate().isBefore(booking.getCheckInDate())) {
			throw new InvalidBookingRequestException("Check-In Date cannot be after Check-Out Date");
		}

		Room room = roomService.getRoomById(roomId).get();
		List<Booking> existingBookings = room.getBookings();
		boolean isRoomAvailable = isRoomAvailable(booking, existingBookings);

		if (isRoomAvailable) {
			room.addBooking(booking);
			bookingRespository.save(booking);
		} else {
			throw new InvalidBookingRequestException("This room is not available for booking on the selected dates");
		}
		return booking.getBookingConfirmationCode();
	}

	@Override
	public Booking findBookingByConfirmationCode(String confirmationCode) {
		return bookingRespository.findByBookingConfirmationCode(confirmationCode).orElseThrow(
				() -> new ResourceNotFoundException("Booking not found for confirmation code : " + confirmationCode));
	}

	@Override
	public List<Booking> getBookingsByUserEmail(String email) {
		return bookingRespository.findByGuestEmail(email);
	}

	private boolean isRoomAvailable(Booking bookingRequest, List<Booking> existingBookings) {
		return existingBookings.stream()
				.noneMatch(existingBooking -> bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
						|| bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
						|| (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
								&& bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
						|| (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
								&& bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
						|| (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
								&& bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
						|| (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
								&& bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
						|| (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
								&& bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate())));
	}
}
