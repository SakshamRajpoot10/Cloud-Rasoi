package com.palais.payment;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResult {
    private boolean success;
    private String transactionId;
    private String message;
}
