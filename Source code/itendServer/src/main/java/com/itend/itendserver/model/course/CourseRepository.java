package com.itend.itendserver.model.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    boolean existsByCourseId(String courseId);
    Optional<Course> findByCourseId(String courseId);
    List<Course> findByLecturer(String lecturer);
}

