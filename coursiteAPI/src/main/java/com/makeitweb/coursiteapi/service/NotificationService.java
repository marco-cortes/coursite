package com.makeitweb.coursiteapi.service;


import com.makeitweb.coursiteapi.entity.Notification;

import java.util.List;

public interface NotificationService {
    Notification sendNotification(Notification notification);
    List<Notification> getNotifications(Long idUser);
}
