package com.ecobazaarX.EcoBazaarX.dto.admindto;

import com.ecobazaarX.EcoBazaarX.model.UserStatus;
import lombok.Data;

@Data
public class UpdateSellerStatusDto {
    private UserStatus newStatus;
}