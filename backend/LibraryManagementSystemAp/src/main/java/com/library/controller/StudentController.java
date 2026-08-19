package com.library.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.entity.Student;
import com.library.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Add student
    @PostMapping
    public ResponseEntity<?> addStudent(
            @RequestBody Student student) {

        try {

            Student savedStudent =
                    studentService.addStudent(student);

            return ResponseEntity.ok(savedStudent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }

    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable Long id) {

        Optional<Student> student =
                studentService.getStudentById(id);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.notFound().build();
    }

    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        try {

            Student updatedStudent =
                    studentService.updateStudent(id, student);

            return ResponseEntity.ok(updatedStudent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(
            @PathVariable Long id) {

        try {

            studentService.deleteStudent(id);

            return ResponseEntity.ok(
                    "Student deleted successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
