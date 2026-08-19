package com.library.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.entity.User;
import com.library.security.JwtService;
import com.library.service.UserService;

import lombok.Data;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

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

            User loggedInUser =
                    userService.loginUser(
                            user.getEmail(),
                            user.getPassword()
                    );

            // Generate JWT
            String token =
                    jwtService.generateToken(
                            loggedInUser.getEmail()
                    );
            loggedInUser.setPassword(null);

            // Response
            Map<String, Object> response = new HashMap<>();

            response.put("token", token);
            response.put("user", loggedInUser);
            
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

        	return ResponseEntity
        	        .badRequest()
        	        .body(Map.of("message", e.getMessage()));
        }
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user) {

        try {

            User registeredUser =
                    userService.registerUser(user);

            return ResponseEntity.ok(registeredUser);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
 // GET PROFILE
    @GetMapping("/profile/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email) {

        try {

            User user = userService.getUserByEmail(email);

            // Don't send password to frontend
            user.setPassword(null);

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestBody User updatedUser) {

        try {

            User user = userService.updateProfile(email, updatedUser);

            // Don't return password
            user.setPassword(null);

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // SEND VERIFICATION CODE
    @PostMapping("/send-verification")
    public ResponseEntity<?> sendVerificationCode(
            @RequestBody Map<String, String> request) {

        try {

            String email = request.get("email");

            userService.sendVerificationCode(email);

            return ResponseEntity.ok(
                    Map.of("message", "Verification code sent to your email")
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // VERIFY CODE
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(
            @RequestBody VerifyCodeRequest request) {

        try {

            userService.verifyCode(
                    request.getEmail(),
                    request.getCode()
            );

            return ResponseEntity.ok(
                    Map.of("message", "Email verified successfully")
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        try {

            userService.resetPassword(
                    request.getEmail(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(
                    Map.of("message", "Password reset successful")
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // CHANGE PASSWORD
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request) {

        try {

            userService.changePassword(
                    request.getEmail(),
                    request.getCurrentPassword(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(
                    Map.of("message", "Password changed successful")
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @Data
    static class VerifyCodeRequest {
        private String email;
        private String code;
    }

    @Data
    static class ResetPasswordRequest {
        private String email;
        private String newPassword;
    }

    @Data
    static class ChangePasswordRequest {
        private String email;
        private String currentPassword;
        private String newPassword;
    }
}