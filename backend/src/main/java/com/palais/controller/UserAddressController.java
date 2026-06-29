package com.palais.controller;

import com.palais.entity.UserAddress;
import com.palais.exception.ResourceNotFoundException;
import com.palais.repository.UserAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users/{userId}/addresses")
public class UserAddressController {

    @Autowired
    private UserAddressRepository userAddressRepository;

    @GetMapping
    public List<UserAddress> getUserAddresses(@PathVariable Long userId) {
        return userAddressRepository.findByUserId(userId);
    }

    @PostMapping
    public UserAddress addAddress(@PathVariable Long userId, @RequestBody UserAddress address) {
        address.setUserId(userId);
        // Simulate random lat/lng if not provided
        if (address.getLatitude() == 0.0 && address.getLongitude() == 0.0) {
            address.setLatitude(28.61 + (Math.random() - 0.5) * 0.2);
            address.setLongitude(77.23 + (Math.random() - 0.5) * 0.2);
        }
        return userAddressRepository.save(address);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        UserAddress address = userAddressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found."));
        
        if (!address.getUserId().equals(userId)) {
            return ResponseEntity.status(403).body(Map.of("message", "Unauthorized."));
        }
        
        userAddressRepository.delete(address);
        return ResponseEntity.ok(Map.of("message", "Address deleted successfully."));
    }
}
