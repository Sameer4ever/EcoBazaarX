package com.ecobazaarX.EcoBazaarX.controller;

import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderDTO;
import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderRequest;
import com.ecobazaarX.EcoBazaarX.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @RequestBody OrderRequest orderRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        OrderDTO createdOrder = orderService.createOrder(orderRequest, userDetails.getUsername());
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDTO>> getMyOrders(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        List<OrderDTO> orders = orderService.getOrdersForUser(userDetails.getUsername());
        return ResponseEntity.ok(orders);
    }

    // ✅ ADD THIS NEW ENDPOINT FOR CANCELLING AN ORDER
    @PatchMapping("/{orderId}/cancel")
    public ResponseEntity<OrderDTO> cancelOrder(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        OrderDTO cancelledOrder = orderService.cancelOrder(orderId, userDetails.getUsername());
        return ResponseEntity.ok(cancelledOrder);
    }
}
