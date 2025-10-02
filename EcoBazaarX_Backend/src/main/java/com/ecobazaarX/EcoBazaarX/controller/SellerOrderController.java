package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.dto.sellerdto.OrderStatusUpdateRequest;
import com.ecobazaarX.EcoBazaarX.dto.sellerdto.SellerOrderDTO;
import com.ecobazaarX.EcoBazaarX.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller/orders")
@PreAuthorize("hasRole('SELLER')")
public class SellerOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<SellerOrderDTO>> getAllOrders() {
        List<SellerOrderDTO> orders = orderService.getAllOrdersForSeller();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/history")
    public ResponseEntity<List<SellerOrderDTO>> getOrderHistory() {
        List<SellerOrderDTO> orderHistory = orderService.getOrderHistoryForSeller();
        return ResponseEntity.ok(orderHistory);
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<SellerOrderDTO> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequest request
    ) {
        SellerOrderDTO updatedOrder = orderService.updateOrderStatus(orderId, request.getNewStatus());
        return ResponseEntity.ok(updatedOrder);
    }
}

