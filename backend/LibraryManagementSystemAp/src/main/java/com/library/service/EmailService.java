package com.library.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationCode(String to, String code) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Verification Code");
            message.setText("Your verification code is: " + code + "\n\nThis code will expire in 10 minutes.\n\nIf you did not request a password reset, please ignore this email.");
            message.setFrom("no-reply@librarymanagement.com");

            mailSender.send(message);
            logger.info("Verification code sent to: {}", to);
        } catch (Exception e) {
            // Log the error but don't throw - allow the flow to continue
            logger.error("Failed to send email to {}: {}", to, e.getMessage());
            logger.info("Verification code for {}: {}", to, code);
        }
    }
}
