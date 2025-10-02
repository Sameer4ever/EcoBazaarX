package com.ecobazaarX.EcoBazaarX.repository;

import com.ecobazaarX.EcoBazaarX.dto.admindto.SellerLeaderboardDTO;
import com.ecobazaarX.EcoBazaarX.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findByEmail(String email);
    boolean existsByEmail(String email);

    // ✅ NEW: Query to generate the eco-seller leaderboard
    @Query("SELECT new com.ecobazaarX.EcoBazaarX.dto.admindto.SellerLeaderboardDTO(" +
            "s.businessName, " +
            "AVG(p.carbonEmission), " +
            "SUM(p.carbonEmission * p.stock), " +
            "COUNT(p.id)) " +
            "FROM Seller s JOIN s.products p " +
            "WHERE s.status = 'ACTIVE' AND p.isActive = true " +
            "GROUP BY s.id " +
            "ORDER BY AVG(p.carbonEmission) ASC")
    List<SellerLeaderboardDTO> getSellerLeaderboard();
}
