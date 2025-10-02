package com.ecobazaarX.EcoBazaarX.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "sellers", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellerId;

    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    private String password; // stored hashed

    @Column(nullable = false)
    private String role = "SELLER";

    private String businessName;
    private String gstNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.PENDING_APPROVAL;

    @CreationTimestamp
    @Column(name = "registration_date", nullable = false, updatable = false)
    private LocalDateTime registrationDate;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "seller"})
    private List<Product> products;
}
