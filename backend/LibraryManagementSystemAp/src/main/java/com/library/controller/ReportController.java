package com.library.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.repository.BookRepository;
import com.library.repository.StudentRepository;
import com.library.repository.IssueBookRepository;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final BookRepository bookRepository;
    private final StudentRepository studentRepository;
    private final IssueBookRepository issueBookRepository;

    public ReportController(
            BookRepository bookRepository,
            StudentRepository studentRepository,
            IssueBookRepository issueBookRepository) {

        this.bookRepository = bookRepository;
        this.studentRepository = studentRepository;
        this.issueBookRepository = issueBookRepository;
    }

    @GetMapping("/summary")
    public Map<String, Long> getReportSummary() {

        Map<String, Long> report = new HashMap<>();

        long totalBooks = bookRepository.count();

        long totalStudents = studentRepository.count();

        long issuedBooks = issueBookRepository.count();

        long dueBooks =
                issueBookRepository.countByReturnDateBeforeAndStatus(
                        LocalDate.now(),
                        "ISSUED"
                );

        report.put("totalBooks", totalBooks);
        report.put("totalStudents", totalStudents);
        report.put("issuedBooks", issuedBooks);
        report.put("dueBooks", dueBooks);

        return report;
    }
}