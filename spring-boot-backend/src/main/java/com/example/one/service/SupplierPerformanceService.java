package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.one.model.SupplierPerformance;
import com.example.one.repository.SupplierPerformanceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierPerformanceService {

    @Autowired
    private SupplierPerformanceRepository supplierPerformanceRepository;

    public SupplierPerformance createPerformance(SupplierPerformance performance) {
        return supplierPerformanceRepository.save(performance);
    }

    public List<SupplierPerformance> getAllPerformances() {
        return supplierPerformanceRepository.findAll();
    }

    public Optional<SupplierPerformance> getPerformanceById(Integer performanceId) {
        return supplierPerformanceRepository.findById(performanceId);
    }

    public List<SupplierPerformance> getPerformanceBySupplierId(Integer supplierId) {
        return supplierPerformanceRepository.findAll().stream()
                .filter(performance -> performance.getSupplier().getSupplierId().equals(supplierId))
                .toList();
    }
}

