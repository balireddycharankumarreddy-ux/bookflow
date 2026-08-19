package com.library.service;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import com.library.entity.User;
import com.library.entity.VerificationCode;
import com.library.repository.UserRepository;
import com.library.repository.VerificationCodeRepository;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(
            UserRepository userRepository,
            VerificationCodeRepository verificationCodeRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.verificationCodeRepository = verificationCodeRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        return userRepository.save(user);
    }
    public User loginUser(String email, String password) {
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    public User updateProfile(String email, User updatedUser) {

        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        existingUser.setName(updatedUser.getName());
        existingUser.setPhone(updatedUser.getPhone());

        return userRepository.save(existingUser);
    }

    public User resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("No account found with this email"));

        user.setPassword(
            passwordEncoder.encode(newPassword)
        );

        return userRepository.save(user);
    }

    public void changePassword(String email, String currentPassword, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Check if new password is different from current
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new RuntimeException("New password must be different from current password");
        }

        // Set new password
        user.setPassword(
            passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);
    }

    public void sendVerificationCode(String email) {

        // Check if user exists
        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("No account found with this email");
        }

        // Delete any existing codes for this email
        verificationCodeRepository.deleteByEmail(email);

        // Generate 6-digit code
        String code = String.format("%06d", new Random().nextInt(999999));

        // Create verification code with 10-minute expiration
        VerificationCode verificationCode = new VerificationCode(
                email,
                code,
                LocalDateTime.now().plusMinutes(10)
        );

        verificationCodeRepository.save(verificationCode);

        // Send email
        emailService.sendVerificationCode(email, code);
    }

    public boolean verifyCode(String email, String code) {

        VerificationCode verificationCode = verificationCodeRepository
                .findByEmailAndCodeAndVerifiedFalse(email, code)
                .orElseThrow(() ->
                        new RuntimeException("Invalid verification code"));

        // Check if code has expired
        if (verificationCode.getExpiresAt().isBefore(LocalDateTime.now())) {
            verificationCodeRepository.deleteByEmail(email);
            throw new RuntimeException("Verification code has expired");
        }

        // Mark as verified
        verificationCode.setVerified(true);
        verificationCodeRepository.save(verificationCode);

        return true;
    }