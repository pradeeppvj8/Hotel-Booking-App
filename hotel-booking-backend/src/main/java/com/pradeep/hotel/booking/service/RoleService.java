package com.pradeep.hotel.booking.service;

import com.pradeep.hotel.booking.model.Role;
import com.pradeep.hotel.booking.model.User;

import java.util.List;

public interface RoleService {
    List<Role> getRoles();

    Role createRole(Role role);

    void deleteRole(Long id);

    Role findByName(String roleName);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);

    Role removeAllUsersFromRole(Long roleId);
}
