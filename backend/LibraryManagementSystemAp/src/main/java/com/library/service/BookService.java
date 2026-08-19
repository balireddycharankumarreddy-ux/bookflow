package com.library.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.library.entity.Book;
import com.library.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Add a new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get book by ID
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // Update book
    public Book updateBook(Long id, Book bookDetails) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Book not found with id: " + id)
                );

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setIsbn(bookDetails.getIsbn());
        book.setCategory(bookDetails.getCategory());
        book.setQuantity(bookDetails.getQuantity());
        book.setAvailableQuantity(bookDetails.getAvailableQuantity());

        return bookRepository.save(book);
    }

    // Delete book
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}