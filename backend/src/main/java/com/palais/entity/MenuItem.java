package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long restaurantId;
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private double price;
    private String category; // "Biryani", "Dosa", "Paneer", etc.
    private boolean isVeg;
    private double rating;
    private String imageName;
}
