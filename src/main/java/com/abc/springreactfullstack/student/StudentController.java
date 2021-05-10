package com.abc.springreactfullstack.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getStudents() {
        List<Student> customers = Arrays.asList(
                new Student(1L, "Yam", "yam@gmail.com", Gender.MALE),
                new Student(2L, "Alex", "alex@gmail.com", Gender.MALE),
                new Student(3L, "James", "jms@gmail.com", Gender.MALE),
                new Student(4L, "Afrita", "afrt@gmail.com", Gender.FEMALE)
        );

        return customers;
    }

    @GetMapping("{id}")
    public Student getStudent(@PathVariable("id") Long id) {
        return getStudents().stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Student was not found with id " + id));
    }
}
