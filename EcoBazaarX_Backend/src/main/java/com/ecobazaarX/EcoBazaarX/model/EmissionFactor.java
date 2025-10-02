package com.ecobazaarX.EcoBazaarX.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "emission_factors")
public class EmissionFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String factorType; // e.g., "MATERIAL", "PACKAGING", "TRANSPORT"

    @Column(nullable = false)
    private String name; // e.g., "Cotton", "Recycled Cardboard"

    private String region; // e.g., "India", "USA", "Global"

    // Stores emission value in kg CO2 per unit (e.g., per kg of material)
    @Column(nullable = false)
    private Double value;
}