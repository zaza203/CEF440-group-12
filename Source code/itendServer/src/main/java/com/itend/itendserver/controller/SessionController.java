package com.itend.itendserver.controller;

import com.itend.itendserver.model.session.Session;
import com.itend.itendserver.model.session.SessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public Session addSession(@RequestBody Session session) {
        return sessionService.addSession(session);
    }

    @GetMapping
    public List<Session> getSessionsByLecturer(@PathVariable String lecturer) {
        return sessionService.getAllSessionsByLecturer(lecturer);
    }

    @GetMapping("/{id}")
    public Session getSessionById(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }

    @PutMapping
    public Session editSession(@RequestBody Session session) {
        return sessionService.editSession(session);
    }

    @GetMapping("/all")
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/details")
    public Session getSessionByDetails(
            @RequestParam String courseId,
            @RequestParam String date,
            @RequestParam String startTime) {
        LocalDate sessionDate = LocalDate.parse(date);
        LocalTime sessionStartTime = LocalTime.parse(startTime);
        return sessionService.getSessionByDetails(courseId, sessionDate, sessionStartTime);
    }
}
