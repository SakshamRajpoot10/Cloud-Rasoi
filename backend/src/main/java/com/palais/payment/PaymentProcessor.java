package com.palais.payment;

import java.util.Map;

public interface PaymentProcessor {
    PaymentResult process(double amount, Map<String, Object> details);
}
