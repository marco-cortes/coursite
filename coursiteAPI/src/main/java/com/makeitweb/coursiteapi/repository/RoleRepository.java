package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.users.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
