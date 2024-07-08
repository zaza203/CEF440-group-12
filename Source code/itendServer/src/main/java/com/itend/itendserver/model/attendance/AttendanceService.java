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

    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public Attendance getAttendanceBySessionDetails(String courseId, String date, String startTime) {
        return attendanceRepository.findByCourseIdAndDateAndStartTime(courseId, date, startTime);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }
}