package com.pradeep.hotel.booking.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pradeep.hotel.booking.exception.InternalServerErrorException;
import com.pradeep.hotel.booking.exception.ResourceNotFoundException;
import com.pradeep.hotel.booking.model.Room;
import com.pradeep.hotel.booking.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

	private final RoomRepository roomRepository;

	@Override
	public Room addNewRoom(MultipartFile photoFile, String roomType, BigDecimal roomPrice)
			throws SerialException, SQLException, IOException {
		Room room = new Room();
		room.setRoomType(roomType);
		room.setRoomPrice(roomPrice);

		if (photoFile != null && !photoFile.isEmpty()) {
			byte[] photoBytes = photoFile.getBytes();
			Blob photoBlob = new SerialBlob(photoBytes);
			room.setPhoto(photoBlob);
		}
		return roomRepository.save(room);
	}

	@Override
	public List<String> getRoomTypes() {
		return roomRepository.getDistinctRoomTypes();
	}

	@Override
	public List<Room> getRooms() {
		return roomRepository.findAll();
	}

	@Override
	public byte[] getPhotoByRoomId(Long roomId) throws SQLException {
		Optional<Room> room = roomRepository.findById(roomId);

		if (!room.isPresent()) {
			throw new ResourceNotFoundException("Room Not Found");
		}

		Blob photoBlob = room.get().getPhoto();

		if (photoBlob != null) {
			return photoBlob.getBytes(1, (int) photoBlob.length());
		}
		return null;
	}

	@Override
	public void deleteRoom(Long roomId) {
		Optional<Room> room = roomRepository.findById(roomId);

		if (room.isPresent()) {
			roomRepository.deleteById(roomId);
		}
	}

	@Override
	public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, Blob photoBlob) {
		Room existingRoom = roomRepository.findById(roomId)
				.orElseThrow(() -> new InternalServerErrorException("Room with ID - " + roomId + " not found"));

		if (roomType != null)
			existingRoom.setRoomType(roomType);
		if (roomPrice != null)
			existingRoom.setRoomPrice(roomPrice);
		if (photoBlob != null)
			existingRoom.setPhoto(photoBlob);

		return roomRepository.save(existingRoom);
	}

	@Override
	public Optional<Room> getRoomById(Long roomId) {
		return roomRepository.findById(roomId);
	}

	@Override
	public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
		return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
	}
}
