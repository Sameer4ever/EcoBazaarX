package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder // Using builder pattern for easy object creation in the service
public class DashboardStatsDTO {
    private BigDecimal totalRevenue;
    private long totalOrders;
    private BigDecimal averageOrderValue;
    private double totalCarbonSaved;
    private Map<String, Long> productsByCategory;
    private long totalProducts;
    private double ecoFriendlyProductPercentage;
}

