package com.itend.itendserver.model.session;

import com.itend.itendserver.model.course.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Session addSession(Session session) {
        if (!courseRepository.existsByCourseId(session.getCourseId())) {
            throw new RuntimeException("Course doesn't exist");
        }

        List<Session> existingSessions = sessionRepository.findExistingSession(
                session.getCourseId(), session.getDate(), session.getStartTime(), session.getEndTime()
        );
        if (!existingSessions.isEmpty()) {
            throw new RuntimeException("Session already exits");
        }
        return sessionRepository.save(session);
    }

    public List<Session> getAllSessionsByLecturer(String lecturer) {
        return sessionRepository.findByLecturer(lecturer);
    }

    public Session getSessionById(Long id) {
        return sessionRepository.findById(id).orElseThrow(() -> new RuntimeException("Session not found"));
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }

    public Session editSession(Session session) {
        return sessionRepository.save(session);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Optional<Session> getSessionByDetails(String courseId, LocalDate date, LocalTime startTime) {
        return sessionRepository.findByCourseIdAndDateAndStartTime(courseId, date, startTime);
    }
}

