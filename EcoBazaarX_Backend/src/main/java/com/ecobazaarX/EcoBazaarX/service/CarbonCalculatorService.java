package com.ecobazaarX.EcoBazaarX.service;


import com.ecobazaarX.EcoBazaarX.dto.sellerdto.CarbonCalculationRequest;
import com.ecobazaarX.EcoBazaarX.repository.EmissionFactorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarbonCalculatorService {

    @Autowired
    private EmissionFactorRepository emissionFactorRepository;

    public double calculateFootprint(CarbonCalculationRequest request) {
        // Fetch material emission factor from DB
        double materialEmission = emissionFactorRepository
                .findByFactorTypeAndNameAndRegion("MATERIAL", request.getMaterial(), request.getOrigin())
                .orElseGet(() -> emissionFactorRepository
                        .findByFactorTypeAndNameAndRegion("MATERIAL", request.getMaterial(), "Global")
                        .orElseThrow(() -> new RuntimeException("Emission factor not found for material: " + request.getMaterial()))
                )
                .getValue();

        // Fetch packaging emission factor from DB
        double packagingEmission = emissionFactorRepository
                .findByFactorTypeAndNameAndRegion("PACKAGING", request.getPackaging(), "Global")
                .orElseThrow(() -> new RuntimeException("Emission factor not found for packaging: " + request.getPackaging()))
                .getValue();

        // Calculate total emission based on product weight (in kg)
        double totalEmission = (materialEmission + packagingEmission) * (request.getWeight() / 1000);

        // Round to 2 decimal places
        return Math.round(totalEmission * 100.0) / 100.0;
    }
}
