package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.dto.sellerdto.SellerCarbonReport;
import com.ecobazaarX.EcoBazaarX.service.CarbonReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/seller/report")
public class CarbonReportController {

    @Autowired
    private CarbonReportService carbonReportService;

    @PreAuthorize("hasAuthority('SELLER')")
    @GetMapping("/carbon-insight")
    public SellerCarbonReport getCarbonInsight(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        String sellerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return carbonReportService.generateReport(sellerEmail, startDate, endDate);
    }
}