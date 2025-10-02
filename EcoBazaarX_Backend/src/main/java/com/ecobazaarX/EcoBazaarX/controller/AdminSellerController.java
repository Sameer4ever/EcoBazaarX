package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.dto.admindto.ProductAdminViewDto;
import com.ecobazaarX.EcoBazaarX.dto.admindto.SellerAdminViewDto;
import com.ecobazaarX.EcoBazaarX.dto.admindto.UpdateSellerStatusDto;
import com.ecobazaarX.EcoBazaarX.service.AdminProductService;
import com.ecobazaarX.EcoBazaarX.service.AdminSellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/admin/sellers")
public class AdminSellerController {

    @Autowired
    private AdminSellerService adminSellerService;

    @Autowired
    private AdminProductService adminProductService;


    // --- Seller Management Endpoints ---

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<SellerAdminViewDto>> getAllSellers() {
        return ResponseEntity.ok(adminSellerService.getAllSellers());
    }

    @PutMapping("/{sellerId}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> updateSellerStatus(@PathVariable Long sellerId, @RequestBody UpdateSellerStatusDto statusDto) {
        try {
            adminSellerService.updateSellerStatus(sellerId, statusDto.getNewStatus());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{sellerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long sellerId) {
        try {
            adminSellerService.deleteSeller(sellerId);
            return ResponseEntity.noContent().build(); // 204 No Content is standard for successful delete
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // --- Product Management Endpoints ---

    @GetMapping("/products")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ProductAdminViewDto>> getAllProducts() {
        return ResponseEntity.ok(adminProductService.getAllProducts());
    }

    @DeleteMapping("/products/{productId}")
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