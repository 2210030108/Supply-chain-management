package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.ShipmentDetail;
import com.example.one.model.ImplId.ShipmentDetailId;


public interface ShipmentDetailRepository extends JpaRepository<ShipmentDetail, ShipmentDetailId> {
    // Custom query methods can be added here if needed
}
