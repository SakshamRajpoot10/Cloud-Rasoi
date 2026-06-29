package com.palais.payment;

import java.util.Map;
import java.util.UUID;

public class CardPaymentProcessor implements PaymentProcessor {
    @Override
    public PaymentResult process(double amount, Map<String, Object> details) {
        String cardNumber = (String) details.get("cardNumber");
        String cvv = (String) details.get("cvv");

        if (cardNumber == null || cardNumber.replaceAll("\\s", "").length() != 16) {
            return PaymentResult.builder()
                    .success(false)
                    .message("Invalid card number. Must be 16 digits.")
                    .build();
        }
        if (cvv == null || cvv.trim().length() != 3) {
            return PaymentResult.builder()
                    .success(false)
                    .message("Invalid CVV. Must be 3 digits.")
                    .build();
        }

        // Simulate successful payment
        return PaymentResult.builder()
                .success(true)
                .transactionId("TXN-CARD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .message("Card payment of ₹" + amount + " processed successfully.")
                .build();
    }
}
