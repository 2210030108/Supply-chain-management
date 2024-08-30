package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.Warehouse;
import com.example.one.service.InventoryService;

import java.util.List;

// Adjust the package and import statements as needed
@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {

    // Inject the InventoryService
    private final InventoryService inventoryService;

    @Autowired
    public WarehouseController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Get all warehouses
    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return inventoryService.getAllWarehouses();
    }

    // Create a new warehouse
    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return inventoryService.createWarehouse(warehouse);
    }

    // Update an existing warehouse
    @PutMapping("/{id}")
    public Warehouse updateWarehouse(@PathVariable Long id, @RequestBody Warehouse warehouse) {
        return inventoryService.updateWarehouse(id, warehouse);
    }

    // Delete a warehouse
    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable Long id) {
        inventoryService.deleteWarehouse(id);
    }
}

