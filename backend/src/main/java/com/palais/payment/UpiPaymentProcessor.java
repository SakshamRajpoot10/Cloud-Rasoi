package com.palais.payment;

import java.util.Map;
import java.util.UUID;

public class UpiPaymentProcessor implements PaymentProcessor {
    @Override
    public PaymentResult process(double amount, Map<String, Object> details) {
        String upiId = (String) details.get("upiId");

        if (upiId == null || !upiId.contains("@")) {
            return PaymentResult.builder()
                    .success(false)
                    .message("Invalid UPI ID. Must contain '@'.")
                    .build();
        }

        return PaymentResult.builder()
                .success(true)
                .transactionId("TXN-UPI-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .message("UPI payment of ₹" + amount + " processed successfully.")
                .build();
    }
}
