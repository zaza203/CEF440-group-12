package com.itend.itendserver.model.attendance;

import com.itend.itendserver.model.session.Session;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Attendance findByCourseIdAndDateAndStartTime(String courseId, String date, String startTime);
}
