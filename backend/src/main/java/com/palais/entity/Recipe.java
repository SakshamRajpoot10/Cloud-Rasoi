package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private String imageName;
    private String timeBadge;
    private int difficulty; // 1 to 5
    private String badges; // Comma-separated
    
    @Column(length = 2000)
    private String ingredients; // Semicolon-separated
    
    @Column(length = 2000)
    private String instructions; // Semicolon-separated
}
