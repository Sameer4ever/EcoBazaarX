package com.ecobazaarX.EcoBazaarX.repository;

import com.ecobazaarX.EcoBazaarX.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // --- For Buyers ---
    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.user " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.product " +
            "WHERE o.user.email = :email ORDER BY o.createdAt DESC")
    List<Order> findDetailedOrdersByUserEmail(@Param("email") String email);

    // --- For Sellers (Incoming Orders) ---
    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.user " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.product " +
            "WHERE o.status NOT IN ('DELIVERED', 'CANCELLED') " +
            "ORDER BY o.createdAt ASC")
    List<Order> findAllActiveDetailedOrders();

    // --- For Sellers (Order History) ---
    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.user " +
            "JOIN FETCH o.orderItems oi " +
            "JOIN FETCH oi.product " +
            "ORDER BY o.createdAt DESC")
    List<Order> findAllOrdersForHistory();

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}

