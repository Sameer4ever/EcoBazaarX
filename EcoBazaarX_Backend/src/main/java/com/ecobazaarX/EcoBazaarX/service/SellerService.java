package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.model.Seller;
import com.ecobazaarX.EcoBazaarX.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public SellerService(SellerRepository sellerRepository, PasswordEncoder passwordEncoder) {
        this.sellerRepository = sellerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Seller register(Seller seller) {
        if (sellerRepository.existsByEmail(seller.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        seller.setPassword(passwordEncoder.encode(seller.getPassword()));
        // seller.setRole("SELLER");
        return sellerRepository.save(seller);
    }

    public Seller findByEmail(String email) {
        return sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
    }
}
