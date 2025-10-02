package com.ecobazaarX.EcoBazaarX.dto.admindto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductAdminViewDto {
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private Integer stock;
    private Double carbonEmission;
    private String sellerBusinessName; // To show which seller it belongs to
}
