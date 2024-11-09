package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Custom queries can be added here if needed
}

