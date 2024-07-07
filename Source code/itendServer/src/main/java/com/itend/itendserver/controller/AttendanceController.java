package com.itend.itendserver.controller;

import com.itend.itendserver.model.attendance.Attendance;
import com.itend.itendserver.model.attendance.AttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public Attendance markAttendance(@RequestParam String courseId, @RequestBody List<String> studentIds) {
        return attendanceService.markAttendance(courseId, studentIds);
    }

    @GetMapping
    public Attendance getAttendanceBySessionDetails(
            @RequestParam String courseId,
            @RequestParam String date,
            @RequestParam String startTime) {
        LocalDate sessionDate = LocalDate.parse(date);
        LocalTime sessionStartTime = LocalTime.parse(startTime);
        return attendanceService.getAttendanceBySessionDetails(courseId, sessionDate, sessionStartTime);
    }

    @GetMapping("/all")
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
}
