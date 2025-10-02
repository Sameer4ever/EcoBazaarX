package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicProductService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Returns all active products (excluding soft-deleted ones)
     */
    public List<Product> getAllProducts() {
        return productRepository.findByIsActiveTrue();
    }
}
