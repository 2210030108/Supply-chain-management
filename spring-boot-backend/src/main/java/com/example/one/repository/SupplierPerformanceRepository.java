package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.SupplierPerformance;

public interface SupplierPerformanceRepository extends JpaRepository<SupplierPerformance, Integer> {
    // Custom query methods can be added here if needed
}

