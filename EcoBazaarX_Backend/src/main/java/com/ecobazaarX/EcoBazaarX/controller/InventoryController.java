package com.ecobazaarX.EcoBazaarX.controller;


import com.ecobazaarX.EcoBazaarX.dto.sellerdto.InventoryProduct;
import com.ecobazaarX.EcoBazaarX.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seller/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    /**
     * GET /seller/inventory
     * Fetches a list of all products for the authenticated seller for inventory purposes.
     * @return A list of SimpleInventoryProductDto objects.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<List<InventoryProduct>> getInventory() {
        String sellerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        List<InventoryProduct> inventory = inventoryService.getInventoryForSeller(sellerEmail);
        return ResponseEntity.ok(inventory);
    }
}


