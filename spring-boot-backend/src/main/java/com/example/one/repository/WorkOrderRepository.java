package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.one.model.WorkOrder;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Integer> {
    // You can add custom query methods here if needed
}

