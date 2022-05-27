package com.makeitweb.coursiteapi.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public class Keys {
    @Value("${security.jwt.secret}")
    private String secret;
    @Value("${security.jwt.start}")
    private String start;
    @Value("${security.jwt.jwtDuration}")
    private int jwtDuration;
    @Value("${send.grid.api.key}")
    private String sendgridApiKey;
    @Value("${send.grid.email}")
    private String sendgridEmail;
    @Value("${app.url}")
    private String appUrl;

    public String getSecret() {
        return secret;
    }
    public String getStart() {
        return start;
    }
    public int getJwtDuration() {
        return jwtDuration;
    }
    public String getSendgridApiKey() {
        return sendgridApiKey;
    }
    public String getSendgridEmail() {
        return sendgridEmail;
    }
    public String getAppUrl() {
        return appUrl;
    }
}
