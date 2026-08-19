package com.library.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.entity.Book;
import com.library.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Add a new book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {

        Optional<Book> book = bookService.getBookById(id);

        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        }

        return ResponseEntity.notFound().build();
    }

    // Update book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(
            @PathVariable Long id,
            @RequestBody Book book) {

        try {
            Book updatedBook = bookService.updateBook(id, book);
            return ResponseEntity.ok(updatedBook);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete book
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {

        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok("Book deleted successfully");

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
