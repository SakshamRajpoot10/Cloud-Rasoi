package com.palais.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "newsletter_subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsletterSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @CreationTimestamp
    private LocalDateTime subscribedAt;
}
