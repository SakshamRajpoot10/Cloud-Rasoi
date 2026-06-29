package com.palais.controller;

import com.palais.entity.NewsletterSubscription;
import com.palais.exception.BadRequestException;
import com.palais.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    private NewsletterRepository newsletterRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.trim().isEmpty() || !email.contains("@")) {
            throw new BadRequestException("Please enter a valid email address.");
        }

        if (newsletterRepository.existsByEmail(email)) {
            return ResponseEntity.ok(Map.of("message", "You are already subscribed to our newsletter!"));
        }

        NewsletterSubscription sub = NewsletterSubscription.builder().email(email).build();
        newsletterRepository.save(sub);

        return ResponseEntity.ok(Map.of("message", "Thank you for subscribing to Cloud Rasoi newsletter!"));
    }
}
