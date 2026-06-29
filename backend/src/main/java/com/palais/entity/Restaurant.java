package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String cuisines; // Comma-separated: "North Indian, Chinese"
    private double rating;
    private int deliveryTimeMinutes;
    private int costForTwo;
    private String imageName;
    private String location;
}
