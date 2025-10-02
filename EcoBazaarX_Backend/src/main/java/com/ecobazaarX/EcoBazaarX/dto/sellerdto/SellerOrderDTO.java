package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import com.ecobazaarX.EcoBazaarX.dto.userdto.OrderItemDTO;
import com.ecobazaarX.EcoBazaarX.model.Address;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class SellerOrderDTO {
    private Long orderId;
    private String buyerName;
    private String buyerEmail;
    private Address shippingAddress;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> orderItems;
}
