package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.one.model.ProductionOrder;
import com.example.one.model.WorkOrder;
import com.example.one.repository.ProductionOrderRepository;
import com.example.one.repository.WorkOrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductionOrderService {

    @Autowired
    private ProductionOrderRepository productionOrderRepository;

    @Autowired
    private WorkOrderRepository workOrderRepository;

    // Create or update a production order
    public ProductionOrder createProductionOrder(ProductionOrder productionOrder) {
        return productionOrderRepository.save(productionOrder);
    }

    // Get all production orders
    public List<ProductionOrder> getAllProductionOrders() {
        return productionOrderRepository.findAll();
    }

    // Get production order by ID
    public Optional<ProductionOrder> getProductionOrderById(Integer productionOrderId) {
        return productionOrderRepository.findById(productionOrderId);
    }

    // Get work orders for a specific production order
    public List<WorkOrder> getWorkOrdersForProductionOrder(Integer productionOrderId) {
        return workOrderRepository.findAll().stream()
                .filter(workOrder -> workOrder.getProductionOrder().getProductionOrderId().equals(productionOrderId))
                .toList();
    }

    // Create or update a work order
    public WorkOrder createWorkOrder(WorkOrder workOrder) {
        return workOrderRepository.save(workOrder);
    }

    // Update the status of a work order
    public void updateWorkOrderStatus(Integer workOrderId, String status) {
        Optional<WorkOrder> workOrderOptional = workOrderRepository.findById(workOrderId);
        if (workOrderOptional.isPresent()) {
            WorkOrder workOrder = workOrderOptional.get();
            workOrder.setStatus(status);
            workOrderRepository.save(workOrder);
        }
    }
}

