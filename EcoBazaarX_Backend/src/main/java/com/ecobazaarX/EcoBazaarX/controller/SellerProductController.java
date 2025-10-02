package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.service.SellerProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/seller/product")
public class SellerProductController {

    private final SellerProductService productService;

    public SellerProductController(SellerProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<Product>> getMyProducts(@AuthenticationPrincipal User seller) {
        return ResponseEntity.ok(productService.getAllProductsBySellerEmail(seller.getUsername()));
    }

    /**
     * New endpoint to get the top-selling products for the authenticated seller.
     * It accepts an optional 'limit' parameter to control the number of products returned.
     *
     * @param seller The authenticated seller principal.
     * @param limit  The number of top products to return (defaults to 5).
     * @return A list of top-selling products.
     */
    @GetMapping("/top-selling")
    public ResponseEntity<List<Product>> getTopSellingProducts(
            @AuthenticationPrincipal User seller,
            @RequestParam(defaultValue = "5", required = false) int limit) {
        // This will call a new method in your service layer to fetch the top products
        List<Product> topProducts = productService.getTopSellingProducts(seller.getUsername(), limit);
        return ResponseEntity.ok(topProducts);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam Integer stock,
            @RequestParam Double carbonEmission,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam MultipartFile image,
            @RequestParam(required = false, defaultValue = "false") Boolean isZeroWasteProduct,
            @AuthenticationPrincipal User seller
    ) throws IOException {
        Product created = productService.addProduct(
                name,
                BigDecimal.valueOf(price),
                stock,
                carbonEmission,
                description,
                category,
                image,
                seller.getUsername(),
                isZeroWasteProduct
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) Integer stock,
            @RequestParam(required = false) Double carbonEmission,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) Boolean isZeroWasteProduct,
            @AuthenticationPrincipal User seller
    ) throws IOException {
        Product updated = productService.updateProduct(id, name,
                        price != null ? BigDecimal.valueOf(price) : null,
                        stock, carbonEmission, description, category, image, seller.getUsername(), isZeroWasteProduct)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/toggle-active/{id}")
    public ResponseEntity<Product> toggleProductActive(@PathVariable Long id,
                                                       @AuthenticationPrincipal User seller) {
        Product updated = productService.toggleProductActive(id, seller.getUsername());
        return ResponseEntity.ok(updated);
    }
}
