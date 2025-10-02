package com.ecobazaarX.EcoBazaarX.controller;


import com.ecobazaarX.EcoBazaarX.dto.admindto.AdminDashboardStatsDTO;
import com.ecobazaarX.EcoBazaarX.service.AdminStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/stats")
@RequiredArgsConstructor
public class AdminStatsController {

    private final AdminStatsService adminStatsService;

    @GetMapping("/carbon-report")
    public ResponseEntity<AdminDashboardStatsDTO> getCarbonReport() {
        AdminDashboardStatsDTO report = adminStatsService.getAdminCarbonReport();
        return ResponseEntity.ok(report);
    }
}
