package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.dto.admindto.SellerAdminViewDto;
import com.ecobazaarX.EcoBazaarX.model.Seller;
import com.ecobazaarX.EcoBazaarX.model.UserStatus;
import com.ecobazaarX.EcoBazaarX.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminSellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public List<SellerAdminViewDto> getAllSellers() {
        return sellerRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateSellerStatus(Long sellerId, UserStatus newStatus) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found with id: " + sellerId));

        seller.setStatus(newStatus);
        sellerRepository.save(seller);
    }

    @Transactional
    public void deleteSeller(Long sellerId) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found with id: " + sellerId));

        // For safety, you might only allow deletion of PENDING sellers
        if (seller.getStatus() != UserStatus.PENDING_APPROVAL) {
            throw new IllegalStateException("Only sellers with PENDING_APPROVAL status can be deleted.");
        }
        sellerRepository.delete(seller);
    }

    private SellerAdminViewDto convertToDto(Seller seller) {
        SellerAdminViewDto dto = new SellerAdminViewDto();
        dto.setSellerId(seller.getSellerId());
        dto.setEmail(seller.getEmail());
        dto.setBusinessName(seller.getBusinessName());
        dto.setRegistrationDate(seller.getRegistrationDate());
        dto.setStatus(seller.getStatus());
        return dto;
    }
}

