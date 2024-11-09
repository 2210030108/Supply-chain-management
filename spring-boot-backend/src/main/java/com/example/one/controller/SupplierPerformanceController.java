package com.example.one.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.one.model.SupplierPerformance;
import com.example.one.service.SupplierPerformanceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/performances")
public class SupplierPerformanceController {

    @Autowired
    private SupplierPerformanceService supplierPerformanceService;

    // Create a new supplier performance evaluation
    @PostMapping
    public SupplierPerformance createPerformance(@RequestBody SupplierPerformance performance) {
        return supplierPerformanceService.createPerformance(performance);
    }

    // Get all performance evaluations
    @GetMapping
    public List<SupplierPerformance> getAllPerformances() {
        return supplierPerformanceService.getAllPerformances();
    }

    // Get a performance evaluation by ID
    @GetMapping("/{performanceId}")
    public Optional<SupplierPerformance> getPerformanceById(@PathVariable Integer performanceId) {
        return supplierPerformanceService.getPerformanceById(performanceId);
    }

    // Get performance evaluations by supplier ID
    @GetMapping("/supplier/{supplierId}")
    public List<SupplierPerformance> getPerformanceBySupplierId(@PathVariable Integer supplierId) {
        return supplierPerformanceService.getPerformanceBySupplierId(supplierId);
    }
}

