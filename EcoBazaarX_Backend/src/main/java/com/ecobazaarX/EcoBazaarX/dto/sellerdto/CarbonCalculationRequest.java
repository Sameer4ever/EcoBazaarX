package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import lombok.Data;

// DTO for the incoming request from the frontend
@Data
public class CarbonCalculationRequest {
    private String material;
    private double weight; // in grams
    private String origin;
    private String packaging;
}

