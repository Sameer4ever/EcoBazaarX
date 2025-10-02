package com.ecobazaarX.EcoBazaarX.controller;


import com.ecobazaarX.EcoBazaarX.dto.sellerdto.DashboardStatsDTO;
import com.ecobazaarX.EcoBazaarX.service.SellerStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// ✅ FIX: Changed path to match the security configuration ("/api/seller/**")
@RequestMapping("/api/seller/stats")
@RequiredArgsConstructor
public class SellerStatsController {

    private final SellerStatsService statsService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats(@AuthenticationPrincipal User seller) {
        DashboardStatsDTO stats = statsService.getSellerDashboardStats(seller.getUsername());
        return ResponseEntity.ok(stats);
    }
}

