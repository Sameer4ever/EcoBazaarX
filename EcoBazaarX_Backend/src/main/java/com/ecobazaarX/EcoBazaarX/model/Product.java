package com.ecobazaarX.EcoBazaarX.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String name;
    private String description;
    private Integer stock;
    private String category;
    private String imagePath;
    private Double carbonEmission;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_ZeroWasteProduct", nullable = false)
    @JsonProperty("isZeroWasteProduct")
    private boolean isZeroWasteProduct = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "products"})
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "product", "order"})
    private List<OrderItem> orderItems;
}
