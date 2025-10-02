package com.ecobazaarX.EcoBazaarX.dto.admindto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class AdminDashboardStatsDTO {
    private Double totalMarketplaceFootprint;
    private Double platformAverageFootprint;
    private Long lowImpactProductCount;
    private List<SellerLeaderboardDTO> sellerLeaderboard;
    private Map<String, Double> footprintByCategory;
}

