package com.pradeep.hotel.booking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pradeep.hotel.booking.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

	@Query("SELECT DISTINCT r.roomType from Room r")
	List<String> getDistinctRoomTypes();

	@Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND "
			+ "r.id NOT IN (SELECT br.room.id FROM Booking br WHERE (br.checkInDate <= :checkInDate) "
			+ "AND (br.checkOutDate >= :checkOutDate))")
	List<Room> findAvailableRoomsByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

}
