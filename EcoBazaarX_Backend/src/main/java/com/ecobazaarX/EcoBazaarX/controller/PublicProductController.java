package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.service.PublicProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for public-facing product routes.
 * This controller does not require authentication, allowing any user
 * to view the product catalog.
 */
@RestController
@RequestMapping("/api/products")
public class PublicProductController {

    @Autowired
    private PublicProductService publicProductService;

    /**
     * Handles GET requests to /api/products.
     * Fetches and returns a list of all products available in the store.
     * @return A ResponseEntity containing the list of all products.
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = publicProductService.getAllProducts();
        return ResponseEntity.ok(products);
    }
}

