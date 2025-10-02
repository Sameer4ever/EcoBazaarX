package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.dto.admindto.ProductAdminViewDto;
import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductAdminViewDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found with id: " + productId);
        }
        productRepository.deleteById(productId);
    }

    private ProductAdminViewDto convertToDto(Product product) {
        ProductAdminViewDto dto = new ProductAdminViewDto();
        dto.setId(product.getProductId());
        dto.setName(product.getName());
        dto.setCategory(product.getCategory());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setCarbonEmission(product.getCarbonEmission());
        if (product.getSeller() != null) {
            dto.setSellerBusinessName(product.getSeller().getBusinessName());
        }
        return dto;
    }
}
