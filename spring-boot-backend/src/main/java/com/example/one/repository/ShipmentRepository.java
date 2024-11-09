package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.one.model.Shipment;

public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
    // Custom query methods can be added here if needed
}
