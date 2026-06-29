package com.palais.controller;

import com.palais.entity.ContactMessage;
import com.palais.exception.BadRequestException;
import com.palais.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage msg) {
        if (msg.getName() == null || msg.getName().trim().isEmpty()) {
            throw new BadRequestException("Name is required.");
        }
        if (msg.getEmail() == null || msg.getEmail().trim().isEmpty() || !msg.getEmail().contains("@")) {
            throw new BadRequestException("Valid email is required.");
        }
        if (msg.getMessage() == null || msg.getMessage().trim().isEmpty()) {
            throw new BadRequestException("Message cannot be empty.");
        }

        contactRepository.save(msg);

        return ResponseEntity.ok(Map.of(
                "message", "Thank you! Your message has been received. Our team will get back to you shortly."
        ));
    }
}
