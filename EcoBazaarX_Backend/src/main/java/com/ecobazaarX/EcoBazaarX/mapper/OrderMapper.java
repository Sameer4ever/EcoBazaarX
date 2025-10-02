package com.ecobazaarX.EcoBazaarX.mapper;

import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderDTO;
import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderItemDTO;
import com.ecobazaarX.EcoBazaarX.model.Order;
import com.ecobazaarX.EcoBazaarX.model.OrderItem;
import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        List<OrderItemDTO> items = order.getOrderItems().stream()
                .map(OrderMapper::toItemDTO)
                .collect(Collectors.toList());

        // --- FIX ---
        // The error "Cannot resolve method 'getFirstName'" happened here.
        // This is changed to use a single .getName() method.
        // Please ensure your User.java file has a public String getName() method.
        // If it's called something else (e.g., getFullName()), change it here.
        String buyerName = order.getUser() != null ?
                order.getUser().getUsername() :
                "Unknown Buyer";

        return OrderDTO.builder()
                .orderId(order.getOrderId())
                .buyerName(buyerName) // Populate the new buyerName field
                .shippingAddress(order.getShippingAddress())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .orderItems(items)
                .build();
    }

    private static OrderItemDTO toItemDTO(OrderItem item) {
        Product product = item.getProduct();

        // This mapping now works correctly because the product data is fetched eagerly.
        return OrderItemDTO.builder()
                .productId(product.getProductId())
                .productName(product.getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .build();
    }
}

