package com.library.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.entity.IssueBook;

public interface IssueBookRepository
        extends JpaRepository<IssueBook, Long> {

    long countByReturnDateBeforeAndStatus(
            LocalDate date,
            String status
    );
}