package com.ecobazaarX.EcoBazaarX.dto.admindto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerLeaderboardDTO {
    private String sellerName;
    private Double averageFootprint;
    private Double totalInventoryFootprint;
    private Long productCount;
}
