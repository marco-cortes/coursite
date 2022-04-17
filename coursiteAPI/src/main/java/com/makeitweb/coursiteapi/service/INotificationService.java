package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.NotificationDTO;
import com.makeitweb.coursiteapi.entity.Notification;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.NotificationRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class INotificationService implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public NotificationDTO sendNotification(NotificationDTO notification) {
        Notification notif = new Notification();
        User user;

        if(notification.getId() != null && notification.getId() > 0) {
            notif = notificationRepository.findById(notification.getId()).orElse(null);
            if(notif == null)
                return null;
        }

        if(notification.getUser() == null || notification.getUser() <= 0)
            return null;
        user = userRepository.findById(notification.getUser()).orElse(null);
        if(user == null)
            return null;

        if(Validation.text(notification.getTitle()))
            notif.setTitle(notification.getTitle());
        if(Validation.text(notification.getBody()))
            notif.setBody(notification.getBody());

        notif.setDate(new Date(new java.util.Date().getTime()));
        notif.setUser(user);


        return notification;
    }

    @Override
    public List<NotificationDTO> getNotifications(Long idUser) {
        List<Notification> notificationList = notificationRepository.findAllByUser_Id(idUser);
        List<NotificationDTO> notifications = new ArrayList<>();
        NotificationDTO notificationDTO = new NotificationDTO();
        for(Notification n: notificationList) {
            notificationDTO.setId(n.getId());
            notificationDTO.setTitle(n.getTitle());
            notificationDTO.setBody(n.getBody());
            notificationDTO.setDate(n.getDate());
            notificationDTO.setUser(n.getUser().getId());
            notificationDTO = new NotificationDTO();
        }
        return notifications;
    }
}
