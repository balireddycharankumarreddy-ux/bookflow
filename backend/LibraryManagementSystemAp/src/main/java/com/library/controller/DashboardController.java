package com.library.controller;

import java.util.HashMap;
import java.util.Map;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.repository.BookRepository;
import com.library.repository.StudentRepository;
import com.library.repository.IssueBookRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final BookRepository bookRepository;
    private final StudentRepository studentRepository;
    private final IssueBookRepository issueBookRepository;

    public DashboardController(
            BookRepository bookRepository,
            StudentRepository studentRepository,
            IssueBookRepository issueBookRepository) {

        this.bookRepository = bookRepository;
        this.studentRepository = studentRepository;
        this.issueBookRepository = issueBookRepository;
    }

    @GetMapping("/stats")
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        // Total books
        long totalBooks = bookRepository.count();

        // Total students
        long totalStudents = studentRepository.count();

        // Total issued books
        long issuedBooks = issueBookRepository.count();
        long dueBooks =
                issueBookRepository.countByReturnDateBeforeAndStatus(
                        LocalDate.now(),
                        "ISSUED"
                );

        stats.put("totalBooks", totalBooks);
        stats.put("totalStudents", totalStudents);
        stats.put("issuedBooks", issuedBooks);
        stats.put("dueBooks", dueBooks);
        return stats;
    }
}
