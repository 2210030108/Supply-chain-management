package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.one.model.PurchaseOrderDetails;
import com.example.one.model.ImplId.PurchaseOrderDetailsId;

public interface PurchaseOrderDetailsRepository extends JpaRepository<PurchaseOrderDetails, PurchaseOrderDetailsId> {
    // Define custom queries if needed
}
