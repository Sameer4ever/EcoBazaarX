package com.ecobazaarX.EcoBazaarX.dto.sellerdto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryProduct{
    private Long id;
    private String name;
    private Integer stock;
}
