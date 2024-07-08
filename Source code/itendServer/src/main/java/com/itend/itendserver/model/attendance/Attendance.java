package com.itend.itendserver.model.attendance;

import com.itend.itendserver.model.session.Session;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String courseId;
    private String date;
    private String startTime;
    @ElementCollection
    private List<String> studentIds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public List<String> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(List<String> studentIds) {
        this.studentIds = studentIds;
    }

    @Override
    public String toString() {
        return "Attendance{" +
                "id=" + id +
                ", courseId='" + courseId + '\'' +
                ", date=" + date +
                ", startTime=" + startTime +
                ", studentIds=" + studentIds +
                '}';
    }
}
