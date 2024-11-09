package com.example.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.one.model.ContractMetadata;
import java.util.List;

@Repository
public interface ContractMetadataRepository extends JpaRepository<ContractMetadata, Integer> {
    List<ContractMetadata> findBySupplier_SupplierId(Integer supplierId);
    List<ContractMetadata> findByTransactionHash(String transactionHash);
    List<ContractMetadata> findByContractAddress(String contractAddress);
}