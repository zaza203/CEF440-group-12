package com.itend.itendserver.model.attendance;

import com.itend.itendserver.model.course.Course;
import com.itend.itendserver.model.session.Session;
import com.itend.itendserver.model.session.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private SessionRepository sessionRepository;

    public Attendance markAttendance(String courseId, List<String> studentIds) {
        Session session = sessionRepository.findByCourseId(courseId);

        Attendance attendance = new Attendance();
        attendance.setSession(session);
        attendance.setStudentIds(studentIds);
        attendance.setStatus("P");

        return attendanceRepository.save(attendance);
    }

    public Attendance getAttendanceBySessionDetails(String courseId, LocalDate date, LocalTime startTime) {
        Session session = sessionRepository.findByCourseIdAndDateAndStartTime(courseId, date, startTime)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        return attendanceRepository.findById(session.getId())
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
}
