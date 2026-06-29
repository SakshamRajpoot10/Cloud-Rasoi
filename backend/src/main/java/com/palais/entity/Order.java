package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId; // Linked to the registered user (optional for guest checkout)
    private String customerName;
    private String address;
    private double totalAmount;
    private String status; // "PENDING", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"
    
    private String paymentMethod; // "COD", "CARD", "UPI"
    private String paymentStatus; // "PENDING", "PAID", "FAILED"
    private String transactionId; // From Payment Gateway
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
