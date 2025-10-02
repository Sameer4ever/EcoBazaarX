package com.ecobazaarX.EcoBazaarX.dto.admindto;

import com.ecobazaarX.EcoBazaarX.model.UserStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SellerAdminViewDto {
    private Long sellerId;
    private String email;
    private String businessName;
    private LocalDateTime registrationDate;
    private UserStatus status;
}

