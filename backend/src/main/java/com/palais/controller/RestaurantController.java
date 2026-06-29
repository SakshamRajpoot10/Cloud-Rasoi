package com.palais.controller;

import com.palais.entity.MenuItem;
import com.palais.entity.Restaurant;
import com.palais.repository.MenuItemRepository;
import com.palais.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }

    @GetMapping("/{id}/menu")
    public List<MenuItem> getMenuByRestaurantId(@PathVariable Long id) {
        return menuItemRepository.findByRestaurantId(id);
    }

    @GetMapping("/search")
    public List<Restaurant> searchRestaurants(@RequestParam String query) {
        if (query == null || query.trim().isEmpty()) {
            return restaurantRepository.findAll();
        }
        
        String cleanQuery = query.trim();
        
        // 1. Find restaurants matching by name or cuisines
        List<Restaurant> matchedByInfo = restaurantRepository
                .findByNameContainingIgnoreCaseOrCuisinesContainingIgnoreCase(cleanQuery, cleanQuery);
        
        // 2. Find menu items matching the query
        List<MenuItem> matchedDishes = menuItemRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(cleanQuery, cleanQuery);
        
        // 3. Extract restaurant IDs from matched dishes
        Set<Long> matchedRestaurantIds = matchedDishes.stream()
                .map(MenuItem::getRestaurantId)
                .collect(Collectors.toSet());
        
        List<Restaurant> matchedByDishes = restaurantRepository.findAllById(matchedRestaurantIds);
        
        // 4. Combine results and preserve order (using LinkedHashSet to remove duplicates)
        Set<Restaurant> combinedResults = new LinkedHashSet<>(matchedByInfo);
        combinedResults.addAll(matchedByDishes);
        
        return new ArrayList<>(combinedResults);
    }

    @GetMapping("/search/dishes")
    public List<MenuItem> searchDishes(@RequestParam String query) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return menuItemRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query.trim(), query.trim());
    }
}
