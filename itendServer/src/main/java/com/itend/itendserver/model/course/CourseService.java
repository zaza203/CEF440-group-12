package com.itend.itendserver.model.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course addCourse(Course course) {
        Optional<Course> existingCourse = courseRepository.findByCourseId(course.getCourseId());
        if (existingCourse.isPresent()) {
            throw new IllegalStateException("Course already exists");
        }
        return courseRepository.save(course);
    }

    public void deleteCourse(String courseId) {
        Optional<Course> courseOptional = courseRepository.findByCourseId(courseId);
        courseOptional.ifPresent(courseRepository::delete);
    }

    public void deleteAllCourses() {
        courseRepository.deleteAll();
    }

    public Course editCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public List<Course> getCoursesByLecturer(String lecturer) {
        return courseRepository.findByLecturer(lecturer);
    }
}

