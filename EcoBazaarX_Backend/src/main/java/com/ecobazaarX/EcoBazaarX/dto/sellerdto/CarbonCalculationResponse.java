package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import lombok.Data;

// DTO for the outgoing response to the frontend
@Data
public class CarbonCalculationResponse {
    private double carbonEmission;

    public CarbonCalculationResponse(double carbonEmission) {
        this.carbonEmission = carbonEmission;
    }
}
