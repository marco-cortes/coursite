package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
