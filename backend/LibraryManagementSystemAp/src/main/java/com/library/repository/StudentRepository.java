package com.library.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByRollNo(String rollNo);

    boolean existsByRollNo(String rollNo);
}
