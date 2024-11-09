package com.example.one.model;

import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

import java.util.Arrays;
import java.util.Collections;

public class SupplierContract extends Contract {

    // Constructor: ABI, Contract address, Web3j instance, Credentials, ContractGasProvider
    public SupplierContract(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super("[Actual ABI JSON]", contractAddress, web3j, credentials, contractGasProvider); // Replace with actual ABI
    }

    // Method to get terms of the contract (returns a String)
    public RemoteCall<String> getTerms() {
        Function function = new Function(
            "getTerms",  // method name in the contract
            Collections.emptyList(),  // no input parameters
            Arrays.asList(new TypeReference<Utf8String>() {})  // return type as Utf8String
        );

        return executeRemoteCallSingleValueReturn(function, String.class);  // Execute and return a single String value
    }

    // Method to create a new contract (returns a TransactionReceipt)
    public RemoteCall<TransactionReceipt> createContract(Long supplierId, String startDate, String endDate, String terms) {
        Function function = new Function(
            "createContract",  // method name in the contract
            Arrays.asList(
                new Uint256(supplierId),  // supplier ID as Uint256
                new Utf8String(startDate),  // start date as Utf8String
                new Utf8String(endDate),  // end date as Utf8String
                new Utf8String(terms)  // contract terms as Utf8String
            ),  
            Collections.emptyList()  // no return type (void function)
        );

        return executeRemoteCallTransaction(function);  // Execute and return TransactionReceipt
    }

    // Static method to load the contract (same as the constructor)
    public static SupplierContract load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new SupplierContract(contractAddress, web3j, credentials, contractGasProvider);
    }
}
