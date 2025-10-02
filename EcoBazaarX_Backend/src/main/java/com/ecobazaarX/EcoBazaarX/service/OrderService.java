package com.ecobazaarX.EcoBazaarX.service;

import com.ecobazaarX.EcoBazaarX.dto.sellerdto.SellerOrderDTO;
import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderDTO;
import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderRequest;
import com.ecobazaarX.EcoBazaarX.mapper.OrderMapper;
import com.ecobazaarX.EcoBazaarX.mapper.SellerOrderMapper;
import com.ecobazaarX.EcoBazaarX.model.*;
import com.ecobazaarX.EcoBazaarX.repository.OrderRepository;
import com.ecobazaarX.EcoBazaarX.repository.ProductRepository;
import com.ecobazaarX.EcoBazaarX.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // --- Buyer Methods ---

    @Transactional
    public OrderDTO createOrder(OrderRequest orderRequest, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + userEmail));

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setStatus(Order.OrderStatus.PENDING_APPROVAL);

        List<OrderItem> orderItems = orderRequest.getOrderItems().stream().map(itemDto -> {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + itemDto.getProductId()));
            if (product.getStock() < itemDto.getQuantity()) {
                throw new IllegalStateException("Not enough stock for product: " + product.getName());
            }
            product.setStock(product.getStock() - itemDto.getQuantity());
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        BigDecimal totalPrice = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setOrderItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toDTO(savedOrder);
    }

    public List<OrderDTO> getOrdersForUser(String userEmail) {
        return orderRepository.findDetailedOrdersByUserEmail(userEmail)
                .stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO cancelOrder(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderId));
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new SecurityException("User does not have permission to cancel this order.");
        }
        Order.OrderStatus currentStatus = order.getStatus();
        if (currentStatus != Order.OrderStatus.PENDING_APPROVAL && currentStatus != Order.OrderStatus.APPROVED) {
            throw new IllegalStateException("Order cannot be cancelled. Status: " + currentStatus);
        }
        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
        }
        order.setStatus(Order.OrderStatus.CANCELLED);
        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toDTO(savedOrder);
    }

    // --- Seller Methods ---

    /**
     * Fetches all active (not delivered or cancelled) orders for the seller dashboard.
     */
    public List<SellerOrderDTO> getAllOrdersForSeller() {
        // ✅ UPDATED: Calls the new repository method for active orders.
        return orderRepository.findAllActiveDetailedOrders().stream()
                .map(SellerOrderMapper::toSellerDTO)
                .collect(Collectors.toList());
    }
    public List<SellerOrderDTO> getOrderHistoryForSeller() {
        return orderRepository.findAllOrdersForHistory().stream()
                .map(SellerOrderMapper::toSellerDTO)
                .collect(Collectors.toList());
    }
    /**
     * Updates the status of an order according to strict business logic.
     */

    @Transactional
    public SellerOrderDTO updateOrderStatus(Long orderId, String newStatusStr) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderId));

        Order.OrderStatus currentStatus = order.getStatus();
        Order.OrderStatus newStatus;

        try {
            newStatus = Order.OrderStatus.valueOf(newStatusStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + newStatusStr);
        }

        // ✅ CRITICAL FIX: State machine for order status transitions
        switch (currentStatus) {
            case PENDING_APPROVAL:
                if (newStatus != Order.OrderStatus.APPROVED && newStatus != Order.OrderStatus.CANCELLED) {
                    throw new IllegalStateException("Order can only be APPROVED or CANCELLED.");
                }
                break;
            case APPROVED:
                if (newStatus != Order.OrderStatus.SHIPPED && newStatus != Order.OrderStatus.CANCELLED) {
                    throw new IllegalStateException("Approved order can only be SHIPPED or CANCELLED.");
                }
                break;
            case SHIPPED:
                if (newStatus != Order.OrderStatus.DELIVERED) {
                    throw new IllegalStateException("Shipped order can only be DELIVERED.");
                }
                break;
            case DELIVERED:
            case CANCELLED:
                // Final states: no transitions are allowed from these states.
                throw new IllegalStateException("Order is already in a final state and cannot be changed.");
        }

        // If the order is being cancelled by the seller, restore stock.
        if (newStatus == Order.OrderStatus.CANCELLED) {
            for (OrderItem item : order.getOrderItems()) {
                Product product = item.getProduct();
                product.setStock(product.getStock() + item.getQuantity());
            }
        }

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);
        return SellerOrderMapper.toSellerDTO(updatedOrder);
    }
}

