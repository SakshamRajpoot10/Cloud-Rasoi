package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String subtitle;
    
    @Column(length = 1000)
    private String description;
    
    private String category;
    private String imageName;
    
    @Column(length = 1000)
    private String ingredients;
    
    // Nutrition per 100g
    private String nutritionEnergy;
    private String nutritionFat;
    private String nutritionCarbs;
    private String nutritionProtein;
    private String nutritionSalt;
}
