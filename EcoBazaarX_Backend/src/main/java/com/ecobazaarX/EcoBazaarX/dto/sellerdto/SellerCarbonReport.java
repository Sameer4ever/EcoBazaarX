package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import lombok.Data;

import java.util.Map;

@Data
public class SellerCarbonReport {
    private String sellerEmail;
    private int totalProducts;
    private double totalCarbonEmission;
    private double avgCarbonEmission;
    private String highestEmissionProduct;
    private String lowestEmissionProduct;
    private Map<String, Double> categoryWiseCarbon; // category -> total carbon
    private double stockAdjustedCarbon; // emission * stock
}
