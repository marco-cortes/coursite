package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
