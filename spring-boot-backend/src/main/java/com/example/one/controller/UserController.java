package com.example.one.controller;

import com.example.one.model.User;
import com.example.one.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Encrypt password before saving
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        
        // Remove the role assignment
        // user.setRole("user"); // No longer needed

        // Optionally set lastLogin to null or current time
        user.setLastLogin(null); // Or user.setLastLogin(new Date()) if you want to set the current time

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
