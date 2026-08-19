package com.library.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.entity.IssueBook;
import com.library.service.IssueBookService;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueBookController {

    private final IssueBookService issueBookService;

    public IssueBookController(IssueBookService issueBookService) {
        this.issueBookService = issueBookService;
    }

    // Issue a book
    @PostMapping
    public ResponseEntity<?> issueBook(
            @RequestBody IssueBook issueBook) {

        try {

            IssueBook issuedBook =
                    issueBookService.issueBook(issueBook);

            return ResponseEntity.ok(issuedBook);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // Get all issued books
    @GetMapping
    public List<IssueBook> getAllIssuedBooks() {

        return issueBookService.getAllIssuedBooks();
    }
 // Return a book
    @PutMapping("/return/{issueId}")
    public ResponseEntity<?> returnBook(
            @PathVariable Long issueId) {

        try {

            IssueBook returnedBook =
                    issueBookService.returnBook(issueId);

            return ResponseEntity.ok(returnedBook);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
