package com.example.one.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import com.example.one.model.SupplierContract;
import com.example.one.model.Supplier;
import com.example.one.model.ContractMetadata;
import com.example.one.repository.SupplierContractRepository;
import com.example.one.repository.SupplierRepository;
import com.example.one.exception.ContractException;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;

@Service
public class SupplierContractService {

    @Autowired
    private Web3j web3j;

    @Autowired
    private SupplierContractRepository contractRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Value("${ethereum.contract.address}")
    private String contractAddress;

    @Value("${ethereum.privateKey}")
    private String privateKey;

    private final ContractGasProvider gasProvider = new DefaultGasProvider();

    private static final Logger logger = Logger.getLogger(SupplierContractService.class.getName());

    // Loading the contract with exception handling
    private SupplierContract loadContract() {
        try {
            Credentials credentials = Credentials.create(privateKey);
            return SupplierContract.load(contractAddress, web3j, credentials, gasProvider);
        } catch (Exception e) {
            // Log the exception and return null to allow the app to continue running
            logger.warning("Web3j: Failed to load contract: " + e.getMessage());
            return null;  // Return null so that Web3j-specific code can be skipped
        }
    }

    // Create a contract, saving the metadata to the database
    @Transactional
    public CompletableFuture<ContractMetadata> createContract(Integer supplierId, String startDate, String endDate, String terms) {
        Supplier supplier = supplierRepository.findById(supplierId)
            .orElseThrow(() -> new ContractException("Supplier not found with ID: " + supplierId));

        // Proceed without Web3j contract interaction if Web3j initialization failed
        SupplierContract contract = loadContract();
        if (contract == null) {
            logger.warning("Web3j: Contract interaction skipped due to failure in contract loading.");
            return CompletableFuture.completedFuture(new ContractMetadata());  // Return an empty ContractMetadata to prevent failure
        }

        try {
            return contract.createContract(
                supplierId.longValue(),
                startDate,
                endDate,
                terms
            ).sendAsync().thenApply(receipt -> {
                ContractMetadata metadata = new ContractMetadata();
                metadata.setSupplier(supplier);
                metadata.setStartDate(startDate);
                metadata.setEndDate(endDate);
                metadata.setTerms(terms);
                metadata.setTransactionHash(receipt.getTransactionHash());
                metadata.setContractAddress(contractAddress);

                // Save contract metadata and return it
                return contractRepository.save(metadata);
            }).exceptionally(ex -> {
                logger.warning("Web3j: Error creating contract: " + ex.getMessage());
                throw new ContractException("Error creating contract: " + ex.getMessage());
            });

        } catch (Exception e) {
            logger.warning("Web3j: Failed to create contract: " + e.getMessage());
            throw new ContractException("Failed to create contract: " + e.getMessage());
        }
    }

    // Fetch all contracts from the repository
    public List<ContractMetadata> getAllContracts() {
        return contractRepository.findAll();
    }

    // Fetch a specific contract by its ID
    public Optional<ContractMetadata> getContractById(Integer contractId) {
        return contractRepository.findById(contractId);
    }

    // Fetch contracts associated with a specific supplier
    public List<ContractMetadata> getContractsBySupplierId(Integer supplierId) {
        // Correct query method, since SupplierContractRepository was updated
        return contractRepository.findBySupplier_SupplierId(supplierId);
    }

    // Fetch terms of a contract by contract address
    public CompletableFuture<String> getContractTerms(String contractAddress) {
        try {
            SupplierContract contract = loadContract();
            if (contract == null) {
                // Skip contract terms fetching if Web3j interaction failed
                logger.warning("Web3j: Contract terms fetching skipped due to failed contract loading.");
                return CompletableFuture.completedFuture("Contract terms unavailable");
            }
            return contract.getTerms().sendAsync();
        } catch (Exception e) {
            logger.warning("Web3j: Failed to get contract terms: " + e.getMessage());
            return CompletableFuture.completedFuture("Error fetching contract terms");
        }
    }
}
