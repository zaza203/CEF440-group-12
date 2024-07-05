package com.itend.itendserver.model.attendance;

import com.itend.itendserver.model.session.Session;
import com.itend.itendserver.model.session.SessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    SessionRepository sessionRepository;

    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public Attendance getAttendanceBySessionDetails(String courseId, LocalDate date, LocalTime startTime) {
        Session session = sessionRepository.findByCourseIdAndDateAndStartTime(courseId, date, startTime)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        return attendanceRepository.findById(session.getId())
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
    }
}

