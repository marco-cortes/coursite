package com.makeitweb.coursiteapi.helpers;

import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import com.makeitweb.coursiteapi.entity.users.User;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validation {

    public static Boolean text(String string) {
        if(string == null)
            return Boolean.FALSE;
        if(string.trim().equals(""))
            return Boolean.FALSE;
        if(string.trim().length() <= 0)
            return Boolean.FALSE;
        return Boolean.TRUE;
    }

    public static Boolean email(String string) {
        if(!text(string))
            return Boolean.FALSE;
        Pattern pattern = Pattern.compile("([a-z0-9]+(\\.?[a-z0-9])*)+@(([a-z]+)\\.([a-z]+))+");
        Matcher mather = pattern.matcher(string);
        if (!mather.find())
            return Boolean.FALSE;
        return Boolean.TRUE;
    }

    public static Boolean password(String string) {
        if(text(string) && string.length() >= 6)
            return Boolean.TRUE;
        return Boolean.FALSE;
    }

    public static Boolean phone(String string) {
        if(text(string) && string.trim().length() <= 10)
            return Boolean.TRUE;
        return Boolean.FALSE;
    }

    public static Boolean status(Integer status) {
        if(status != null && status >= 0 && status <= 1)
            return Boolean.TRUE;
        return Boolean.FALSE;
    }

    public static Boolean floatValue(Float value) {
        if(value != null && value >= 0)
            return Boolean.TRUE;
        return Boolean.FALSE;
    }

    public static void validateUser(User u, String name, String lastName, String email, String password, String phone) {
        if(text(name))
            u.setName(name);

        if(text(lastName))
            u.setLastName(lastName);

        if(email(email))
            u.setEmail(email);

        if(password(password))
            u.setPassword(password);
        if(phone(phone))
            u.setPhone(phone);
    }
/*
    public static void validateTeacher(Teacher t, String phone, Integer status) {
        if(phone(phone))
            t.setPhone(phone);
        if(status(status))
            t.setStatus(status);
    }*/

    public static void validateCourse(Course c, String title, String description, String image, Float price, Integer status, Integer score) {
        if(text(title))
            c.setTitle(title);
        if(text(description))
            c.setDescription(description);
        if(text(image))
            c.setImage(image);
        if(floatValue(price))
            c.setPrice(price);
        if(status(status))
            c.setStatus(status);
        if(score != null && floatValue((float)score))
            c.setScore(score);
    }

    public static void validateUnit(Unit u, String title, String description) {
        if(text(title))
            u.setTitle(title);
        if(text(description))
            u.setDescription(description);
    }

    public static void validateLesson(Lesson l, String title, String description, String linkDoc, String linkVideo) {
        if(text(title))
            l.setTitle(title);
        if(text(description))
            l.setDescription(description);
        if(text(linkDoc))
            l.setLinkDoc(linkDoc);
        if(text(linkVideo))
            l.setLinkVideo(linkVideo);
    }

    public static void validateDocument(Document d, String name, String url) {
        if(text(name))
            d.setName(name);
        if(text(url))
            d.setUrl(url);
    }

}
