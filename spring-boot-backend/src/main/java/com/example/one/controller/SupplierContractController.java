package com.example.one.controller;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.one.exception.ContractException;
import com.example.one.model.ContractMetadata;
import com.example.one.service.SupplierContractService;


@RestController
@RequestMapping("/api/supplier-contracts")
@CrossOrigin(origins = "*")
public class SupplierContractController {

    @Autowired
    private SupplierContractService contractService;

    @PostMapping("/create")
    public ResponseEntity<?> createContract(
            @RequestParam Integer supplierId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String terms) {
        try {
            CompletableFuture<ContractMetadata> future = contractService.createContract(
                supplierId, 
                startDate, 
                endDate, 
                terms
            );
            
            ContractMetadata metadata = future.join();
            return ResponseEntity.ok()
                .body(new ContractResponse(
                    "Contract created successfully",
                    metadata.getTransactionHash(),
                    metadata
                ));
        } catch (ContractException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Contract creation failed", e.getMessage()));
        }
    }

    @GetMapping("/{contractId}")
    public ResponseEntity<?> getContract(@PathVariable Integer contractId) {
        try {
            Optional<ContractMetadata> metadata = contractService.getContractById(contractId);
            if (metadata.isPresent()) {
                CompletableFuture<String> terms = contractService.getContractTerms(
                    metadata.get().getContractAddress()
                );
                return ResponseEntity.ok()
                    .body(new ContractDetailsResponse(metadata.get(), terms.join()));
            }
            return ResponseEntity.notFound().build();
        } catch (ContractException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Failed to fetch contract", e.getMessage()));
        }
    }

    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<?> getContractsBySupplierId(@PathVariable Integer supplierId) {
        try {
            List<ContractMetadata> contracts = contractService.getContractsBySupplierId(supplierId);
            return ResponseEntity.ok().body(contracts);
        } catch (ContractException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Failed to fetch supplier contracts", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllContracts() {
        try {
            List<ContractMetadata> contracts = contractService.getAllContracts();
            return ResponseEntity.ok().body(contracts);
        } catch (ContractException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Failed to fetch contracts", e.getMessage()));
        }
    }

    // Response DTOs
    private static class ContractResponse {
        private final String message;
        private final String transactionHash;
        private final ContractMetadata metadata;

        public ContractResponse(String message, String transactionHash, ContractMetadata metadata) {
            this.message = message;
            this.transactionHash = transactionHash;
            this.metadata = metadata;
        }

        public String getMessage() { return message; }
        public String getTransactionHash() { return transactionHash; }
        public ContractMetadata getMetadata() { return metadata; }
    }

    private static class ContractDetailsResponse {
        private final ContractMetadata metadata;
        private final String terms;

        public ContractDetailsResponse(ContractMetadata metadata, String terms) {
            this.metadata = metadata;
            this.terms = terms;
        }

        public ContractMetadata getMetadata() { return metadata; }
        public String getTerms() { return terms; }
    }

    private static class ErrorResponse {
        private final String error;
        private final String details;

        public ErrorResponse(String error, String details) {
            this.error = error;
            this.details = details;
        }

        public String getError() { return error; }
        public String getDetails() { return details; }
    }
}