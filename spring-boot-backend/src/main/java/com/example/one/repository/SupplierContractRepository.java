package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.one.model.ContractMetadata;  // Import ContractMetadata instead of SupplierContract
import java.util.List;

@Repository
public interface SupplierContractRepository extends JpaRepository<ContractMetadata, Integer> {

    // Query method to find ContractMetadata by associated Supplier's supplierId
    List<ContractMetadata> findBySupplier_SupplierId(Integer supplierId);

    // You can add more custom methods if needed, e.g.:
    // List<ContractMetadata> findByTransactionHash(String transactionHash);
}
