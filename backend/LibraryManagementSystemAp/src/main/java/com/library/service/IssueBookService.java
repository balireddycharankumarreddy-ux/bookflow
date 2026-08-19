package com.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.library.entity.Book;
import com.library.entity.IssueBook;
import com.library.repository.BookRepository;
import com.library.repository.IssueBookRepository;

@Service
public class IssueBookService {

    private final IssueBookRepository issueBookRepository;
    private final BookRepository bookRepository;

    public IssueBookService(
            IssueBookRepository issueBookRepository,
            BookRepository bookRepository) {

        this.issueBookRepository = issueBookRepository;
        this.bookRepository = bookRepository;
    }

    // Issue a book
    public IssueBook issueBook(IssueBook issueBook) {

        // Find the book
        Book book = bookRepository.findById(issueBook.getBookId())
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));

        // Check availability
        if (book.getAvailableQuantity() <= 0) {
            throw new RuntimeException("Book is not available");
        }

        // Decrease available quantity
        book.setAvailableQuantity(
                book.getAvailableQuantity() - 1
        );

        // Save updated book
        bookRepository.save(book);

        // Set status
        issueBook.setStatus("ISSUED");

        // Save issue record
        return issueBookRepository.save(issueBook);
    }

    // Get all issued books
    public List<IssueBook> getAllIssuedBooks() {

        return issueBookRepository.findAll();
    }
 // Return a book
    public IssueBook returnBook(Long issueId) {

        // Find the issue record
        IssueBook issueBook = issueBookRepository.findById(issueId)
                .orElseThrow(() ->
                        new RuntimeException("Issue record not found"));

        // Check whether already returned
        if ("RETURNED".equals(issueBook.getStatus())) {
            throw new RuntimeException("Book is already returned");
        }

        // Find the book
        Book book = bookRepository.findById(issueBook.getBookId())
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));

        // Increase available quantity
        book.setAvailableQuantity(
                book.getAvailableQuantity() + 1
        );

        // Save updated book
        bookRepository.save(book);

        // Update issue status
        issueBook.setStatus("RETURNED");

        // Save issue record
        return issueBookRepository.save(issueBook);
    }
}