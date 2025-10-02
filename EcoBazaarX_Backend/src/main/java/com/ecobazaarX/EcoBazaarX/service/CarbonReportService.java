package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.dto.sellerdto.SellerCarbonReport;
import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CarbonReportService {

    @Autowired
    private ProductRepository productRepository;

    public SellerCarbonReport generateReport(String sellerEmail, LocalDate startDate, LocalDate endDate) {
        List<Product> products;

        // If dates are provided, use the new filtered query
        if (startDate != null && endDate != null) {
            products = productRepository.findBySellerEmailAndCreatedAtBetween(
                    sellerEmail,
                    startDate.atStartOfDay(), // From start of the day
                    endDate.atTime(LocalTime.MAX) // To end of the day
            );
        } else {
            // Otherwise, get all products as before
            products = productRepository.findBySeller_Email(sellerEmail);
        }

        SellerCarbonReport report = new SellerCarbonReport();
        report.setSellerEmail(sellerEmail);
        report.setTotalProducts(products.size());

        double totalCarbon = products.stream()
                .mapToDouble(Product::getCarbonEmission)
                .sum();

        report.setTotalCarbonEmission(totalCarbon);
        report.setAvgCarbonEmission(products.isEmpty() ? 0 : totalCarbon / products.size());

        // Highest & Lowest emission product
        products.stream().max(Comparator.comparing(Product::getCarbonEmission))
                .ifPresent(p -> report.setHighestEmissionProduct(p.getName()));

        products.stream().min(Comparator.comparing(Product::getCarbonEmission))
                .ifPresent(p -> report.setLowestEmissionProduct(p.getName()));

        // Category-wise emission
        Map<String, Double> categoryWise = products.stream()
                .collect(Collectors.groupingBy(Product::getCategory,
                        Collectors.summingDouble(Product::getCarbonEmission)));
        report.setCategoryWiseCarbon(categoryWise);

        // Stock-adjusted total
        double stockAdjusted = products.stream()
                .mapToDouble(p -> p.getCarbonEmission() * (p.getStock() != null ? p.getStock() : 0))
                .sum();
        report.setStockAdjustedCarbon(stockAdjusted);

        return report;
    }
}
