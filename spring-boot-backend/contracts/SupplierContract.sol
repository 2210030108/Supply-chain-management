// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin's Ownable contract to manage access control
import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplierContract is Ownable {

    struct Contract {
        uint256 id;
        address supplier;
        uint256 startDate;
        uint256 endDate;
        string terms;
        bool isActive;
    }

    mapping(uint256 => Contract) public contracts;
    uint256 public nextContractId;

    // Event to emit contract details after creation
    event ContractCreated(uint256 contractId, address supplier, uint256 startDate, uint256 endDate, string terms);

    // Function to create a new supplier contract
    function createContract(address _supplier, uint256 _startDate, uint256 _endDate, string memory _terms) public onlyOwner {
        uint256 contractId = nextContractId++;
        contracts[contractId] = Contract({
            id: contractId,
            supplier: _supplier,
            startDate: _startDate,
            endDate: _endDate,
            terms: _terms,
            isActive: true
        });

        // Emit event for the new contract
        emit ContractCreated(contractId, _supplier, _startDate, _endDate, _terms);
    }

    // Function to get a supplier contract by ID
    function getContract(uint256 _contractId) public view returns (address, uint256, uint256, string memory, bool) {
        Contract memory c = contracts[_contractId];
        return (c.supplier, c.startDate, c.endDate, c.terms, c.isActive);
    }

    // Function to deactivate a contract
    function deactivateContract(uint256 _contractId) public onlyOwner {
        require(contracts[_contractId].isActive, "Contract is already inactive.");
        contracts[_contractId].isActive = false;
    }
}
