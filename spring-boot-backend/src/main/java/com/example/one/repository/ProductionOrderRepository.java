package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.ProductionOrder;

public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, Integer> {
    // You can add custom query methods here if needed
}

