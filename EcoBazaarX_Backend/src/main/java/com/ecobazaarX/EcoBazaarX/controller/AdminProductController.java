package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.dto.admindto.ProductAdminViewDto;
import com.ecobazaarX.EcoBazaarX.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/products") // Correct base path for products
public class AdminProductController {

    @Autowired
    private AdminProductService adminProductService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ProductAdminViewDto>> getAllProducts() {
        return ResponseEntity.ok(adminProductService.getAllProducts());
    }

    @DeleteMapping("/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        try {
            adminProductService.deleteProduct(productId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}