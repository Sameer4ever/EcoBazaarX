package com.ecobazaarX.EcoBazaarX.controller;


import com.ecobazaarX.EcoBazaarX.dto.sellerdto.CarbonCalculationRequest;
import com.ecobazaarX.EcoBazaarX.dto.sellerdto.CarbonCalculationResponse;
import com.ecobazaarX.EcoBazaarX.service.CarbonCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carbon")
@CrossOrigin(origins = "http://localhost:3000") // Adjust for your frontend URL
public class CarbonApiController {

    @Autowired
    private CarbonCalculatorService carbonCalculatorService;

    @PostMapping("/calculate")
    public ResponseEntity<CarbonCalculationResponse> calculateCarbonFootprint(
            @RequestBody CarbonCalculationRequest request
    ) {
        double footprint = carbonCalculatorService.calculateFootprint(request);
        return ResponseEntity.ok(new CarbonCalculationResponse(footprint));
    }
}