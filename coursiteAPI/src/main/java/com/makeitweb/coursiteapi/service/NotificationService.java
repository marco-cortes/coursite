package com.makeitweb.coursiteapi.service;


import com.makeitweb.coursiteapi.dto.NotificationDTO;

import java.util.List;

public interface NotificationService {
    NotificationDTO sendNotification(NotificationDTO notification);
    List<NotificationDTO> getNotifications(Long idUser);
}
