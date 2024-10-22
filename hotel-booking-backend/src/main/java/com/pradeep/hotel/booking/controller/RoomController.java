package com.pradeep.hotel.booking.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pradeep.hotel.booking.exception.PhotoRetrievalException;
import com.pradeep.hotel.booking.exception.ResourceNotFoundException;
import com.pradeep.hotel.booking.model.Booking;
import com.pradeep.hotel.booking.model.Room;
import com.pradeep.hotel.booking.response.RoomResponse;
import com.pradeep.hotel.booking.service.BookingService;
import com.pradeep.hotel.booking.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

	private final RoomService roomService;
	private final BookingService bookingService;

	@PostMapping("/add/new-room")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,
			@RequestParam("roomType") String roomType, @RequestParam("roomPrice") BigDecimal roomPrice)
			throws SerialException, SQLException, IOException {
		Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
		RoomResponse roomResponse = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
				savedRoom.getRoomPrice());
		return ResponseEntity.ok(roomResponse);
	}

	@GetMapping("/room-types")
	public List<String> getRoomTypes() {
		return roomService.getRoomTypes();
	}

	@GetMapping("/all-rooms")
	public ResponseEntity<List<RoomResponse>> getRooms() throws SQLException {
		List<Room> rooms = roomService.getRooms();
		List<RoomResponse> roomResponses = new ArrayList<RoomResponse>();

		for (Room room : rooms) {
			byte[] photoBytes = roomService.getPhotoByRoomId(room.getId());

			if (photoBytes != null && photoBytes.length > 0) {
				String base64Photo = Base64.encodeBase64String(photoBytes);
				RoomResponse roomResponse = getRoomResponse(room);
				roomResponse.setPhoto(base64Photo);
				roomResponses.add(roomResponse);
			}
		}
		return ResponseEntity.ok(roomResponses);
	}

	@DeleteMapping("/delete-room/{roomId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
		roomService.deleteRoom(roomId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PutMapping("/update-room/{roomId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
			@RequestParam(required = false) String roomType, @RequestParam(required = false) BigDecimal roomPrice,
			@RequestParam(required = false) MultipartFile photo) throws IOException, SQLException {
		byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes() : roomService.getPhotoByRoomId(roomId);
		Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
		Room room = roomService.updateRoom(roomId, roomType, roomPrice, photoBlob);
		room.setPhoto(photoBlob);
		RoomResponse roomResponse = getRoomResponse(room);
		return ResponseEntity.ok(roomResponse);
	}

	@GetMapping("/get-room/{roomId}")
	public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId) {
		Optional<Room> existingRoom = roomService.getRoomById(roomId);

		return existingRoom.map(room -> {
			RoomResponse roomResponse = getRoomResponse(room);
			return ResponseEntity.ok(Optional.of(roomResponse));
		}).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
	}

	@GetMapping("/available-rooms")
	public ResponseEntity<List<RoomResponse>> getAvailableRooms(@RequestParam("checkInDate") String checkInDate,
			@RequestParam("checkOutDate") String checkOutDate, @RequestParam("roomType") String roomType)
			throws SQLException {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		formatter = formatter.withLocale(Locale.US);
		LocalDate checkInLocalDate = LocalDate.parse(checkInDate.trim(), formatter);
		LocalDate checkOutLocalDate = LocalDate.parse(checkOutDate.trim(), formatter);
		List<Room> availableRooms = roomService.getAvailableRooms(checkInLocalDate, checkOutLocalDate, roomType);
		List<RoomResponse> roomResponses = new ArrayList<>();
		for (Room room : availableRooms) {
			byte[] photoBytes = roomService.getPhotoByRoomId(room.getId());

			if (photoBytes != null && photoBytes.length > 0) {
				String photo = Base64.encodeBase64String(photoBytes);
				RoomResponse roomResponse = getRoomResponse(room);
				roomResponse.setPhoto(photo);
				roomResponses.add(roomResponse);
			}
		}

		if (roomResponses.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(roomResponses);
		}
	}

	private RoomResponse getRoomResponse(Room room) {
		/*
		 * List<Booking> bookings = getBookingsByRoomId(room.getId());
		 * 
		 * if (bookings == null) { bookings = new ArrayList<Booking>(); }
		 * 
		 * List<BookingResponse> bookingResponses = bookings.stream() .map(booking ->
		 * new BookingResponse(booking.getBookingId(), booking.getCheckInDate(),
		 * booking.getCheckOutDate(), booking.getBookingConfirmationCode())) .toList();
		 * 
		 * if (bookingResponses == null) { bookingResponses = new
		 * ArrayList<BookingResponse>(); }
		 */

		byte[] photoBytes = null;

		try {
			photoBytes = room.getPhoto().getBytes(1, (int) room.getPhoto().length());
		} catch (Exception e) {
			throw new PhotoRetrievalException("Error while retrieving photo");
		}
		return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked(), photoBytes);
	}

	private List<Booking> getBookingsByRoomId(Long roomId) {
		return bookingService.getBookingsByRoomId(roomId);
	}
}
