package com.example.one.service;

import com.example.one.model.SupplierContract;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.crypto.Credentials;
import org.web3j.tx.gas.DefaultGasProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Web3jService {

    @Value("${ethereum.node-url}")
    private String ethereumNodeUrl;

    @Value("${ethereum.privatekey}")
    private String privateKey;

    private Web3j web3j;
    private Credentials credentials;

    // The address of your deployed contract
    private static final String CONTRACT_ADDRESS = ""; // Replace with actual contract address

    public Web3jService(@Value("${ethereum.node-url}") String ethereumNodeUrl, 
            @Value("${ethereum.private-key}") String privateKey) {
this.ethereumNodeUrl = ethereumNodeUrl;
this.privateKey = privateKey;

// Log the values for debugging purposes
System.out.println("Ethereum Node URL: " + ethereumNodeUrl);
System.out.println("Ethereum Private Key: " + privateKey);

this.web3j = Web3j.build(new HttpService(ethereumNodeUrl));
this.credentials = Credentials.create(privateKey);
}


    // Interact with the contract
    public void interactWithContract() {
        try {
            // Load the contract using Web3j
            SupplierContract contract = SupplierContract.load(
                    CONTRACT_ADDRESS, web3j, credentials, new DefaultGasProvider());

            // Call contract methods (e.g., get contract details)
            String terms = contract.getTerms().send();  // Correctly call send() on the method
            System.out.println("Contract Terms: " + terms);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Method to create a contract on the blockchain
    public TransactionReceipt createContractOnBlockchain(Long supplierId, String startDate, String endDate, String terms) {
        try {
            // Load the contract using Web3j
            SupplierContract contract = SupplierContract.load(
                    CONTRACT_ADDRESS, web3j, credentials, new DefaultGasProvider());

            // Interact with the contract to create a new supplier contract
            TransactionReceipt transactionReceipt = contract.createContract(
                    supplierId, startDate, endDate, terms).send();  // Sends the transaction

            return transactionReceipt;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
