package com.ecobazaarX.EcoBazaarX.repository;

import com.ecobazaarX.EcoBazaarX.model.EmissionFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmissionFactorRepository extends JpaRepository<EmissionFactor, Long> {
    Optional<EmissionFactor> findByFactorTypeAndNameAndRegion(String factorType, String name, String region);
}