package com.itend.itendserver.controller;

import com.itend.itendserver.model.course.Course;
import com.itend.itendserver.model.course.CourseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public Course addcourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable String courseId) {
        courseService.deleteCourse(courseId);
    }

    @DeleteMapping
    public void deleteAllCourses() {
        courseService.deleteAllCourses();
    }

    @PutMapping
    public Course editCourse(@RequestBody Course course) {
        return courseService.editCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }
    @GetMapping("/{lecturer}")
    public List<Course> getCoursesByLecturer(@PathVariable String lecturer) {
        return courseService.getCoursesByLecturer(lecturer);
    }
}
