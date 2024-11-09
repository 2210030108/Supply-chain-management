package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    // Custom queries can be added here if needed
}

