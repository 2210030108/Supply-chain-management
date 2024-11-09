package com.example.one.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.one.model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    // Query methods specific to Supplier entity
    Optional<Supplier> findBySupplierId(Integer supplierId);
}


