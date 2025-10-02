package com.ecobazaarX.EcoBazaarX.repository;

import com.ecobazaarX.EcoBazaarX.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findBySeller_Email(String sellerEmail);

    List<Product> findBySellerEmailAndCreatedAtBetween(String sellerEmail, LocalDateTime start, LocalDateTime end);

    // Fetch only active products
    List<Product> findBySeller_EmailAndIsActiveTrue(String sellerEmail);

    List<Product> findByIsActiveTrue();

    /**
     * Finds the top-selling products for a specific seller.
     * This query now correctly assumes you will add an 'orderItems' field
     * to your Product entity.
     *
     * @param sellerEmail The email of the seller.
     * @param pageable    A Pageable object to limit the number of results.
     * @return A list of the top-selling products.
     */
    @Query("SELECT p FROM Product p JOIN p.orderItems oi WHERE p.seller.email = :sellerEmail GROUP BY p.id ORDER BY SUM(oi.quantity) DESC")
    List<Product> findTopSellingProductsBySellerEmail(@Param("sellerEmail") String sellerEmail, Pageable pageable);

    // Methods for AdminOverviewService and SellerStatsService
    long countByIsZeroWasteProductIsTrue();

    @Query("SELECT p.category as category, COUNT(p) as count FROM Product p WHERE (:sellerEmail IS NULL OR p.seller.email = :sellerEmail) GROUP BY p.category")
    List<Map<String, Object>> countProductsByCategory(@Param("sellerEmail") String sellerEmail);

    long countBySellerEmailAndIsActiveTrue(String sellerEmail);

    long countBySellerEmailAndIsZeroWasteProductIsTrueAndIsActiveTrue(String sellerEmail);


    // Methods for AdminStatsService
    @Query("SELECT SUM(p.carbonEmission) FROM Product p WHERE p.isActive = true")
    Double getTotalMarketplaceFootprint();

    @Query("SELECT AVG(p.carbonEmission) FROM Product p WHERE p.isActive = true")
    Double getPlatformAverageFootprint();

    Long countByIsActiveTrueAndCarbonEmissionLessThan(Double threshold);

    @Query("SELECT p.category as category, SUM(p.carbonEmission) as footprint FROM Product p WHERE p.isActive = true GROUP BY p.category")
    List<Map<String, Object>> getFootprintByCategory();
}
