package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import lombok.Data;

// This class is used as the request body for updating an order's status.
@Data
public class OrderStatusUpdateRequest {
    // The new status, e.g., "APPROVED", "SHIPPED"
    private String newStatus;
}
