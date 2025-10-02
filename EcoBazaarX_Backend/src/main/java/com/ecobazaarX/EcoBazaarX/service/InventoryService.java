package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.dto.sellerdto.InventoryProduct;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    @Autowired
    private ProductRepository productRepository;

    public List<InventoryProduct> getInventoryForSeller(String sellerEmail) {
        return productRepository.findBySeller_Email(sellerEmail).stream()
                .map(product -> new InventoryProduct(
                        product.getProductId(),
                        product.getName(),
                        product.getStock()
                ))
                .collect(Collectors.toList());
    }
}


