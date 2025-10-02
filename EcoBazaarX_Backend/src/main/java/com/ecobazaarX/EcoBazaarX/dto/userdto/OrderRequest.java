package com.ecobazaarX.EcoBazaarX.dto.userdto;

import com.ecobazaarX.EcoBazaarX.model.Address;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private List<CartItemDto> orderItems;
    private Address shippingAddress;

    @Data
    public static class CartItemDto {
        private Long productId;
        private int quantity;
    }
}