package com.itend.itendserver.model.session;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByLecturer(String lecturer);

    @Query("SELECT s FROM Session s WHERE s.courseId = :courseId AND s.date = :date AND s.startTime = :startTime AND s.endTime = :endTime")
    List<Session> findExistingSession(String courseId, LocalDate date, LocalTime startTime, LocalTime endTime);

    @Query("SELECT s FROM Session s WHERE s.courseId = :courseId AND s.date = :date AND s.startTime = :startTime")
    Optional<Session> findByCourseIdAndDateAndStartTime(String courseId, LocalDate date, LocalTime startTime);
}

