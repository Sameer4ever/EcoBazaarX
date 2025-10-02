package com.ecobazaarX.EcoBazaarX.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Address {

    // --- Mapped to 'shipping_first_name' column ---
    @Column(name = "shipping_first_name", nullable = false)
    private String firstName;

    // --- Mapped to 'shipping_last_name' column ---
    @Column(name = "shipping_last_name", nullable = false)
    private String lastName;

    @Column(name = "shipping_address1", nullable = false)
    private String address1;

    @Column(name = "shipping_address2")
    private String address2;

    @Column(name = "shipping_city", nullable = false)
    private String city;

    @Column(name = "shipping_state")
    private String state;

    @Column(name = "shipping_zip", nullable = false)
    private String zip;

    @Column(name = "shipping_country", nullable = false)
    private String country;
}


