package com.palais.controller;

import com.palais.entity.Order;
import com.palais.entity.OrderItem;
import com.palais.exception.BadRequestException;
import com.palais.exception.ResourceNotFoundException;
import com.palais.payment.*;
import com.palais.repository.OrderItemRepository;
import com.palais.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // Multi-threading: Thread pool for running asynchronous order tracking simulation
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(4);

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = payload.get("userId") != null ? Long.valueOf(payload.get("userId").toString()) : null;
            String customerName = (String) payload.get("customerName");
            String address = (String) payload.get("address");
            String paymentMethod = (String) payload.get("paymentMethod"); // "COD", "CARD", "UPI"
            Map<String, Object> paymentDetails = (Map<String, Object>) payload.get("paymentDetails");
            List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");

            if (customerName == null || customerName.trim().isEmpty()) {
                throw new BadRequestException("Customer name is required.");
            }
            if (address == null || address.trim().isEmpty()) {
                throw new BadRequestException("Delivery address is required.");
            }
            if (items == null || items.isEmpty()) {
                throw new BadRequestException("Cart cannot be empty.");
            }
            if (paymentMethod == null) {
                throw new BadRequestException("Payment method is required.");
            }

            // 1. Calculate totals
            double subtotal = 0;
            List<OrderItem> orderItemsToSave = new ArrayList<>();
            for (Map<String, Object> itemMap : items) {
                Long menuItemId = Long.valueOf(itemMap.get("menuItemId").toString());
                String name = (String) itemMap.get("name");
                int quantity = Integer.parseInt(itemMap.get("quantity").toString());
                double price = Double.parseDouble(itemMap.get("price").toString());

                subtotal += price * quantity;

                orderItemsToSave.add(OrderItem.builder()
                        .menuItemId(menuItemId)
                        .name(name)
                        .quantity(quantity)
                        .price(price)
                        .build());
            }

            double totalAmount = subtotal + 60; // Subtotal + ₹40 delivery fee + ₹20 taxes

            // 2. OOPS Polymorphism: Process payment depending on the chosen method
            String transactionId = null;
            String paymentStatus = "PENDING";

            if ("CARD".equalsIgnoreCase(paymentMethod)) {
                PaymentProcessor processor = new CardPaymentProcessor();
                PaymentResult result = processor.process(totalAmount, paymentDetails != null ? paymentDetails : Map.of());
                if (!result.isSuccess()) {
                    throw new BadRequestException(result.getMessage());
                }
                transactionId = result.getTransactionId();
                paymentStatus = "PAID";
            } else if ("UPI".equalsIgnoreCase(paymentMethod)) {
                PaymentProcessor processor = new UpiPaymentProcessor();
                PaymentResult result = processor.process(totalAmount, paymentDetails != null ? paymentDetails : Map.of());
                if (!result.isSuccess()) {
                    throw new BadRequestException(result.getMessage());
                }
                transactionId = result.getTransactionId();
                paymentStatus = "PAID";
            } else if ("COD".equalsIgnoreCase(paymentMethod)) {
                paymentStatus = "PENDING"; // Paid on delivery
                transactionId = "COD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            } else {
                throw new BadRequestException("Unsupported payment method: " + paymentMethod);
            }

            // 3. Save Order Entity
            Order order = Order.builder()
                    .userId(userId)
                    .customerName(customerName)
                    .address(address)
                    .totalAmount(totalAmount)
                    .status("PENDING")
                    .paymentMethod(paymentMethod.toUpperCase())
                    .paymentStatus(paymentStatus)
                    .transactionId(transactionId)
                    .build();

            Order savedOrder = orderRepository.save(order);

            // 4. Save Order Items
            for (OrderItem orderItem : orderItemsToSave) {
                orderItem.setOrderId(savedOrder.getId());
                orderItemRepository.save(orderItem);
            }

            // 5. Multi-threading: Trigger background thread to update order stages asynchronously
            startOrderTrackingSimulation(savedOrder.getId());

            return ResponseEntity.ok(Map.of(
                    "order", savedOrder,
                    "items", orderItemsToSave,
                    "message", "Order placed successfully!"
            ));
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error processing order: " + e.getMessage(), e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        List<OrderItem> items = orderItemRepository.findByOrderId(id);
        return ResponseEntity.ok(Map.of(
                "order", order,
                "items", items
        ));
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        order.setStatus(status.toUpperCase());
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(Map.of(
                "order", savedOrder,
                "message", "Order status updated to " + status
        ));
    }

    // Multi-threading: Simulation of order stages on background threads
    private void startOrderTrackingSimulation(Long orderId) {
        // Step 1: Transition to PREPARING after 8 seconds
        scheduler.schedule(() -> {
            updateStatusInDb(orderId, "PREPARING");

            // Step 2: Transition to OUT_FOR_DELIVERY after another 8 seconds
            scheduler.schedule(() -> {
                updateStatusInDb(orderId, "OUT_FOR_DELIVERY");

                // Step 3: Transition to DELIVERED after another 8 seconds
                scheduler.schedule(() -> {
                    updateStatusInDb(orderId, "DELIVERED");
                }, 8, TimeUnit.SECONDS);

            }, 8, TimeUnit.SECONDS);

        }, 8, TimeUnit.SECONDS);
    }

    private void updateStatusInDb(Long orderId, String status) {
        orderRepository.findById(orderId).ifPresent(order -> {
            order.setStatus(status);
            if ("DELIVERED".equals(status) && "COD".equals(order.getPaymentMethod())) {
                order.setPaymentStatus("PAID"); // COD is paid on delivery
            }
            orderRepository.save(order);
            System.out.println("[THREAD: " + Thread.currentThread().getName() + "] Order ID " + orderId + " updated to " + status);
        });
    }
}
