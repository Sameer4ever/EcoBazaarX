package com.ecobazaarX.EcoBazaarX.mapper;

import com.ecobazaarX.EcoBazaarX.dto.sellerdto.SellerOrderDTO;
import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderItemDTO;
import com.ecobazaarX.EcoBazaarX.model.Order;
import com.ecobazaarX.EcoBazaarX.model.OrderItem;
import com.ecobazaarX.EcoBazaarX.model.Product;
import com.ecobazaarX.EcoBazaarX.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class SellerOrderMapper {

    public static SellerOrderDTO toSellerDTO(Order order) {
        List<OrderItemDTO> items = order.getOrderItems().stream()
                .map(SellerOrderMapper::toItemDTO)
                .collect(Collectors.toList());

        User buyer = order.getUser();

        return SellerOrderDTO.builder()
                .orderId(order.getOrderId())
                .buyerName(buyer != null ? buyer.getUsername() : "N/A") // Assuming User has getFullName()
                .buyerEmail(buyer != null ? buyer.getEmail() : "N/A")
                .shippingAddress(order.getShippingAddress())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .orderItems(items)
                .build();
    }

    private static OrderItemDTO toItemDTO(OrderItem item) {
        Product product = item.getProduct();
        return OrderItemDTO.builder()
                .productId(product.getProductId())
                .productName(product.getName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .build();
    }
}
