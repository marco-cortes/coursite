package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "DELETE FROM user_roles WHERE user_id=?1", nativeQuery = true)
    void deleteRoleUser(Long id);

}
