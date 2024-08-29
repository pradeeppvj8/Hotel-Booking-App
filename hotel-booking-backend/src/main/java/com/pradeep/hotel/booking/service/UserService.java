package com.pradeep.hotel.booking.service;

import java.util.List;

import com.pradeep.hotel.booking.model.User;

public interface UserService {
	User registerUser(User user);

	List<User> getUsers();

	void deleteUser(String email);

	User getUser(String email);
}