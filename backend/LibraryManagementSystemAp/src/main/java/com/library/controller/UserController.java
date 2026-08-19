package com.library.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.entity.User;
import com.library.security.JwtService;
import com.library.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    // In-memory verification codes (production would use a DB or cache)
    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();

    public UserController(
            UserService userService,
            JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(
                    user.getEmail(), user.getPassword());
            String token = jwtService.generateToken(loggedInUser.getEmail());
            loggedInUser.setPassword(null);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", loggedInUser);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET PROFILE
    @GetMapping("/profile/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE PROFILE
    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestBody User updatedUser) {
        try {
            User user = userService.updateProfile(email, updatedUser);
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // SEND VERIFICATION CODE
    @PostMapping("/send-verification")
    public ResponseEntity<?> sendVerification(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        // Check if user exists
        try {
            userService.getUserByEmail(email);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email not found"));
        }

        // Generate 6-digit code
        String code = String.format("%06d", new Random().nextInt(999999));
        verificationCodes.put(email, code);

        // In production, send email here. For now, log it.
        System.out.println("=== VERIFICATION CODE for " + email + ": " + code + " ===");

        return ResponseEntity.ok(Map.of(
                "message", "Verification code sent to " + email,
                "code", code  // Remove this in production
        ));
    }

    // VERIFY CODE
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String code = body.get("code");

        if (email == null || code == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and code are required"));
        }

        String storedCode = verificationCodes.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            verificationCodes.remove(email);
            return ResponseEntity.ok(Map.of("message", "Code verified successfully"));
        }

        return ResponseEntity.badRequest()
                .body(Map.of("message", "Invalid verification code"));
    }

    // RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("newPassword");

        if (email == null || newPassword == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and new password are required"));
        }

        try {
            userService.resetPassword(email, newPassword);
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
