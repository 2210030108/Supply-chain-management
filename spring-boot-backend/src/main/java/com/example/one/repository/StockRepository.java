package com.example.one.repository;

import com.example.one.model.Stock;
import com.example.one.model.Stock.StockId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, StockId> {
    List<Stock> findByWarehouseId(Long warehouseId);
    List<Stock> findByProductId(Long productId);
}
