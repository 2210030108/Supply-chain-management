package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.one.model.PurchaseOrder;
import com.example.one.model.PurchaseOrderDetails;
import com.example.one.model.Supplier;
import com.example.one.repository.PurchaseOrderDetailsRepository;
import com.example.one.repository.PurchaseOrderRepository;
import com.example.one.repository.SupplierRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private PurchaseOrderDetailsRepository purchaseOrderDetailsRepository;

    // Create or update a purchase order
    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        if (purchaseOrder.getSupplier() != null && purchaseOrder.getSupplier().getSupplierId() != null) {
            Optional<Supplier> supplier = supplierRepository.findById(purchaseOrder.getSupplier().getSupplierId());
            if (supplier.isPresent()) {
                purchaseOrder.setSupplier(supplier.get());
            }
        }
        return purchaseOrderRepository.save(purchaseOrder);
    }

    // Get all purchase orders
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll();
    }

    // Get purchase order by ID
    public Optional<PurchaseOrder> getPurchaseOrderById(Integer purchaseOrderId) {
        return purchaseOrderRepository.findById(purchaseOrderId);
    }

    // Get purchase order details by PurchaseOrderID
    public List<PurchaseOrderDetails> getPurchaseOrderDetails(Integer purchaseOrderId) {
        return purchaseOrderDetailsRepository.findAll().stream()
                .filter(detail -> detail.getPurchaseOrder().getPurchaseOrderId().equals(purchaseOrderId))
                .toList();
    }
}

