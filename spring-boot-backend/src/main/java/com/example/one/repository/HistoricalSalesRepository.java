package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.HistoricalSales;

public interface HistoricalSalesRepository extends JpaRepository<HistoricalSales, Integer> {
    // You can add custom query methods here if needed
}

