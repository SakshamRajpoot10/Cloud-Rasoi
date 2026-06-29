package com.palais.controller;

import com.palais.entity.User;
import com.palais.exception.BadRequestException;
import com.palais.exception.ResourceNotFoundException;
import com.palais.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new BadRequestException("Username cannot be empty.");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new BadRequestException("Password cannot be empty.");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new BadRequestException("Username is already taken.");
        }

        // Simulating plain-text password storage for demonstration/mock simplicity
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully!",
                "user", savedUser
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || username.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            throw new BadRequestException("Username and password are required.");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        if (!user.getPassword().equals(password)) {
            throw new BadRequestException("Invalid credentials. Please try again.");
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login successful!",
                "user", user
        ));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody User updatedData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        user.setEmail(updatedData.getEmail());
        user.setPhone(updatedData.getPhone());
        user.setAddress(updatedData.getAddress());

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "message", "Profile updated successfully!",
                "user", savedUser
        ));
    }
}
