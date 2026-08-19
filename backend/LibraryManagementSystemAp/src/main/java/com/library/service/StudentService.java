package com.library.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.library.entity.Student;
import com.library.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Add student
    public Student addStudent(Student student) {

        if (studentRepository.existsByRollNo(student.getRollNo())) {
            throw new RuntimeException("Roll number already exists");
        }

        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    // Get student by ID
    public Optional<Student> getStudentById(Long id) {

        return studentRepository.findById(id);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        existingStudent.setName(student.getName());
        existingStudent.setRollNo(student.getRollNo());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setYear(student.getYear());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());

        return studentRepository.save(existingStudent);
    }

    // Delete student
    public void deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found");
        }

        studentRepository.deleteById(id);
    }
}
