package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.PurchaseOrder;
import com.example.one.model.PurchaseOrderDetails;
import com.example.one.service.PurchaseOrderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/purchaseorders")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    // Create or update a purchase order
    @PostMapping
    public PurchaseOrder createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
        return purchaseOrderService.createPurchaseOrder(purchaseOrder);
    }

    // Get all purchase orders
    @GetMapping
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderService.getAllPurchaseOrders();
    }

    // Get purchase order by ID
    @GetMapping("/{purchaseOrderId}")
    public Optional<PurchaseOrder> getPurchaseOrderById(@PathVariable Integer purchaseOrderId) {
        return purchaseOrderService.getPurchaseOrderById(purchaseOrderId);
    }

    // Get purchase order details by Purchase Order ID
    @GetMapping("/{purchaseOrderId}/details")
    public List<PurchaseOrderDetails> getPurchaseOrderDetails(@PathVariable Integer purchaseOrderId) {
        return purchaseOrderService.getPurchaseOrderDetails(purchaseOrderId);
    }
}

