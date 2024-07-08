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


    public Attendance editAttendance(String courseId, String date, String startTime, String studentId) {
        Attendance attendance = attendanceRepository.findByCourseIdAndDateAndStartTime(courseId, date, startTime);
        if (attendance != null) {
            List<String> studentIds = attendance.getStudentIds();
            if (!studentIds.contains(studentId)) {
                studentIds.add(studentId);
                attendance.setStudentIds(studentIds);
                return attendanceRepository.save(attendance);
            } else {
                throw new RuntimeException("Student ID already present in the attendance list");
            }
        } else {
            throw new RuntimeException("Attendance not found for the given session details");
        }
    }
}
