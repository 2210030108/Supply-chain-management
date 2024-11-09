package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.ProductionOrder;
import com.example.one.model.WorkOrder;
import com.example.one.service.ProductionOrderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productionorders")
public class ProductionOrderController {

    @Autowired
    private ProductionOrderService productionOrderService;

    // Create or update a production order
    @PostMapping
    public ProductionOrder createProductionOrder(@RequestBody ProductionOrder productionOrder) {
        return productionOrderService.createProductionOrder(productionOrder);
    }

    // Get all production orders
    @GetMapping
    public List<ProductionOrder> getAllProductionOrders() {
        return productionOrderService.getAllProductionOrders();
    }

    // Get production order by ID
    @GetMapping("/{productionOrderId}")
    public Optional<ProductionOrder> getProductionOrderById(@PathVariable Integer productionOrderId) {
        return productionOrderService.getProductionOrderById(productionOrderId);
    }

    // Get work orders for a specific production order
    @GetMapping("/{productionOrderId}/workorders")
    public List<WorkOrder> getWorkOrdersForProductionOrder(@PathVariable Integer productionOrderId) {
        return productionOrderService.getWorkOrdersForProductionOrder(productionOrderId);
    }

    // Create or update a work order
    @PostMapping("/{productionOrderId}/workorders")
    public WorkOrder createWorkOrder(@PathVariable Integer productionOrderId, @RequestBody WorkOrder workOrder) {
        ProductionOrder productionOrder = productionOrderService.getProductionOrderById(productionOrderId).orElse(null);
        if (productionOrder != null) {
            workOrder.setProductionOrder(productionOrder);
            return productionOrderService.createWorkOrder(workOrder);
        }
        return null;
    }

    // Update work order status
    @PutMapping("/workorders/{workOrderId}/status")
    public void updateWorkOrderStatus(@PathVariable Integer workOrderId, @RequestParam String status) {
        productionOrderService.updateWorkOrderStatus(workOrderId, status);
    }
}

