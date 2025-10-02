package com.ecobazaarX.EcoBazaarX.dto.admindto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AdminOverviewStatsDTO {
    // User KPIs
    private long totalUsers;
    private double userGrowthPercentage;

    // Order KPIs
    private long totalOrdersLast30Days;
    private double orderGrowthPercentage;

    // Carbon KPIs
    private double totalFootprintLast30Days;
    private double footprintGrowthPercentage;

    // Product KPIs
    private long totalProducts;
    private Map<String, Long> productsByCategory;
    private double ecoFriendlyProductPercentage;
}

