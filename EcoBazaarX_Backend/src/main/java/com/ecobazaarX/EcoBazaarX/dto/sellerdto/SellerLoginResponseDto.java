package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import com.ecobazaarX.EcoBazaarX.model.UserStatus;
import lombok.Data;

@Data
public class SellerLoginResponseDto {
    private String token;
    private UserStatus status;
    private String email;
    // You can add other details like businessName if needed on the frontend
}
