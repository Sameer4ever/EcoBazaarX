package com.ecobazaarX.EcoBazaarX.repository;

import com.ecobazaarX.EcoBazaarX.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT SUM(oi.price * oi.quantity) FROM OrderItem oi WHERE oi.product.seller.email = :sellerEmail AND oi.order.createdAt >= :startDate")
    BigDecimal findTotalRevenueBySellerAndDate(@Param("sellerEmail") String sellerEmail, @Param("startDate") LocalDateTime startDate);

    @Query("SELECT COUNT(DISTINCT oi.order.orderId) FROM OrderItem oi WHERE oi.product.seller.email = :sellerEmail AND oi.order.createdAt >= :startDate")
    Long countTotalOrdersBySellerAndDate(@Param("sellerEmail") String sellerEmail, @Param("startDate") LocalDateTime startDate);

    @Query("SELECT SUM(oi.quantity * oi.product.carbonEmission) FROM OrderItem oi " +
            "WHERE (:sellerEmail IS NULL OR oi.product.seller.email = :sellerEmail) " +
            "AND oi.order.createdAt >= :startDate")
    Double findTotalCarbonSavedBySellerAndDate(@Param("sellerEmail") String sellerEmail, @Param("startDate") LocalDateTime startDate);
}
