package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String label; // "Home", "Work", "Other"
    
    @Column(name = "address_line", nullable = false, length = 500)
    private String addressLine;
    
    private double latitude;
    private double longitude;
}
