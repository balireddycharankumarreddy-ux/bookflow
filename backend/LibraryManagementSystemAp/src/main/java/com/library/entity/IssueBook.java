package com.library.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "issue_books")
public class IssueBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private Long bookId;

    private LocalDate issueDate;

    private LocalDate returnDate;

    private String status;

    public IssueBook() {
    }

    public IssueBook(
            Long studentId,
            Long bookId,
            LocalDate issueDate,
            LocalDate returnDate,
            String status) {

        this.studentId = studentId;
        this.bookId = bookId;
        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
