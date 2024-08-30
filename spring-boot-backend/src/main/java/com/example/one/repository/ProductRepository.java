package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.one.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by name
    List<Product> findByName(String name);

    // Find products by category
    List<Product> findByCategory(String category);

    // Find products by unit of measure
    List<Product> findByUnitOfMeasure(String unitOfMeasure);

    // Custom query to find products by partial name match (e.g., for search functionality)
    List<Product> findByNameContainingIgnoreCase(String namePart);
}
