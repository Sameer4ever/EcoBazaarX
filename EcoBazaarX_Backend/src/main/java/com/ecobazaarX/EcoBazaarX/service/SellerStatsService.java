package com.ecobazaarX.EcoBazaarX.service;


import com.ecobazaarX.EcoBazaarX.dto.sellerdto.DashboardStatsDTO;
import com.ecobazaarX.EcoBazaarX.repository.OrderItemRepository;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerStatsService {

    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public DashboardStatsDTO getSellerDashboardStats(String sellerEmail) {
        LocalDateTime last30Days = LocalDateTime.now().minusDays(30);

        // --- Fetch Sales Data ---
        BigDecimal totalRevenue = orderItemRepository.findTotalRevenueBySellerAndDate(sellerEmail, last30Days);
        totalRevenue = (totalRevenue == null) ? BigDecimal.ZERO : totalRevenue;

        Long totalOrders = orderItemRepository.countTotalOrdersBySellerAndDate(sellerEmail, last30Days);
        totalOrders = (totalOrders == null) ? 0L : totalOrders;

        Double totalCarbonSaved = orderItemRepository.findTotalCarbonSavedBySellerAndDate(sellerEmail, last30Days);
        totalCarbonSaved = (totalCarbonSaved == null) ? 0.0 : totalCarbonSaved;

        // --- Fetch Product Data ---
        long totalProducts = productRepository.countBySellerEmailAndIsActiveTrue(sellerEmail);
        long ecoFriendlyProducts = productRepository.countBySellerEmailAndIsZeroWasteProductIsTrueAndIsActiveTrue(sellerEmail);

        List<Map<String, Object>> categoryCountsList = productRepository.countProductsByCategory(sellerEmail);
        Map<String, Long> productsByCategory = categoryCountsList.stream()
                .collect(Collectors.toMap(
                        map -> (String) map.get("category"),
                        map -> (Long) map.get("count")
                ));

        // --- Calculate Derived Stats ---
        BigDecimal averageOrderValue = (totalOrders > 0)
                ? totalRevenue.divide(BigDecimal.valueOf(totalOrders), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        double ecoFriendlyPercentage = (totalProducts > 0)
                ? ((double) ecoFriendlyProducts / totalProducts) * 100
                : 0.0;


        // --- Build and Return DTO ---
        return DashboardStatsDTO.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .averageOrderValue(averageOrderValue)
                .totalCarbonSaved(totalCarbonSaved)
                .productsByCategory(productsByCategory)
                .totalProducts(totalProducts)
                .ecoFriendlyProductPercentage(ecoFriendlyPercentage)
                .build();
    }
}
