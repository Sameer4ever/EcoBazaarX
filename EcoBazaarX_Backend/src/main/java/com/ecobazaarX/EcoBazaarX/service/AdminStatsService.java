package com.ecobazaarX.EcoBazaarX.service;


import com.ecobazaarX.EcoBazaarX.dto.admindto.AdminDashboardStatsDTO;
import com.ecobazaarX.EcoBazaarX.dto.admindto.SellerLeaderboardDTO;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import com.ecobazaarX.EcoBazaarX.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminStatsService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private static final double LOW_IMPACT_THRESHOLD = 1.0; // e.g., products under 1.0 kg CO₂

    public AdminDashboardStatsDTO getAdminCarbonReport() {

        Double totalFootprint = productRepository.getTotalMarketplaceFootprint();
        Double avgFootprint = productRepository.getPlatformAverageFootprint();
        Long lowImpactCount = productRepository.countByIsActiveTrueAndCarbonEmissionLessThan(LOW_IMPACT_THRESHOLD);

        List<SellerLeaderboardDTO> leaderboard = sellerRepository.getSellerLeaderboard();

        List<Map<String, Object>> footprintByCategoryList = productRepository.getFootprintByCategory();
        Map<String, Double> footprintByCategory = footprintByCategoryList.stream()
                .collect(Collectors.toMap(
                        map -> (String) map.get("category"),
                        map -> (Double) map.get("footprint")
                ));

        return AdminDashboardStatsDTO.builder()
                .totalMarketplaceFootprint(totalFootprint)
                .platformAverageFootprint(avgFootprint)
                .lowImpactProductCount(lowImpactCount)
                .sellerLeaderboard(leaderboard)
                .footprintByCategory(footprintByCategory)
                .build();
    }
}
