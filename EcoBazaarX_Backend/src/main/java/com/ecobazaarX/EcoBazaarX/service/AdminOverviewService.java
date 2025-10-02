package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.dto.admindto.AdminOverviewStatsDTO;
import com.ecobazaarX.EcoBazaarX.repository.OrderItemRepository;
import com.ecobazaarX.EcoBazaarX.repository.OrderRepository;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import com.ecobazaarX.EcoBazaarX.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOverviewService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public AdminOverviewStatsDTO getAdminOverviewStats() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime last30Days = now.minusDays(30);
        LocalDateTime previous30Days = now.minusDays(60);

        // User stats
        long totalUsers = userRepository.count();
        long newUsersLast30Days = userRepository.countByCreatedAtBetween(last30Days, now);
        long newUsersPrevious30Days = userRepository.countByCreatedAtBetween(previous30Days, last30Days);
        double userGrowth = calculateGrowth(newUsersLast30Days, newUsersPrevious30Days);

        // Order stats
        long ordersLast30Days = orderRepository.countByCreatedAtBetween(last30Days, now);
        long ordersPrevious30Days = orderRepository.countByCreatedAtBetween(previous30Days, last30Days);
        double orderGrowth = calculateGrowth(ordersLast30Days, ordersPrevious30Days);

        // Carbon stats (using footprint logic)
        Double footprintLast30Days = orderItemRepository.findTotalCarbonSavedBySellerAndDate(null, last30Days); // Pass null for platform-wide
        Double footprintPrevious30Days = orderItemRepository.findTotalCarbonSavedBySellerAndDate(null, previous30Days);
        double footprintGrowth = calculateGrowth(footprintLast30Days, footprintPrevious30Days);

        // Product stats
        long totalProducts = productRepository.count();
        long ecoFriendlyProducts = productRepository.countByIsZeroWasteProductIsTrue();
        double ecoFriendlyPercentage = (totalProducts > 0) ? ((double) ecoFriendlyProducts / totalProducts) * 100 : 0;

        Map<String, Long> productsByCategory = productRepository.countProductsByCategory(null) // Pass null for platform-wide
                .stream()
                .collect(Collectors.toMap(
                        map -> (String) map.get("category"),
                        map -> (Long) map.get("count")
                ));

        return AdminOverviewStatsDTO.builder()
                .totalUsers(totalUsers)
                .userGrowthPercentage(userGrowth)
                .totalOrdersLast30Days(ordersLast30Days)
                .orderGrowthPercentage(orderGrowth)
                .totalFootprintLast30Days(footprintLast30Days != null ? footprintLast30Days : 0.0)
                .footprintGrowthPercentage(footprintGrowth)
                .totalProducts(totalProducts)
                .productsByCategory(productsByCategory)
                .ecoFriendlyProductPercentage(ecoFriendlyPercentage)
                .build();
    }

    private double calculateGrowth(Number current, Number previous) {
        if (previous == null || previous.doubleValue() == 0) {
            return (current != null && current.doubleValue() > 0) ? 100.0 : 0.0;
        }
        if (current == null) {
            return -100.0;
        }
        return ((current.doubleValue() - previous.doubleValue()) / previous.doubleValue()) * 100;
    }
}
