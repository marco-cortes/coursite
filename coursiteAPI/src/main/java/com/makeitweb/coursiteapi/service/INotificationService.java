package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.Notification;
import com.makeitweb.coursiteapi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class INotificationService implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public Notification sendNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotifications(Long idUser) {
        return notificationRepository.findAllByUser_Id(idUser);
    }
}
