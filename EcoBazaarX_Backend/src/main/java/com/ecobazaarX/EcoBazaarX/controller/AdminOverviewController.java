package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.dto.admindto.AdminOverviewStatsDTO;
import com.ecobazaarX.EcoBazaarX.service.AdminOverviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/overview")
@RequiredArgsConstructor
public class AdminOverviewController {

    private final AdminOverviewService adminOverviewService;

    @GetMapping
    public ResponseEntity<AdminOverviewStatsDTO> getOverviewStats() {
        AdminOverviewStatsDTO stats = adminOverviewService.getAdminOverviewStats();
        return ResponseEntity.ok(stats);
    }
}
