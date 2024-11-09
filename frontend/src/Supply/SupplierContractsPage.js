// src/pages/SupplierContractsPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const SupplierContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [newContract, setNewContract] = useState({
    supplierName: '',
    contractDate: '',
    amount: 0,
  });

  const [editContract, setEditContract] = useState(null); // To hold contract being edited
  const [openEditDialog, setOpenEditDialog] = useState(false); // For showing the edit modal

  // Fetch all supplier contracts
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await apiService.getSupplierContracts();
        setContracts(data);
      } catch (error) {
        console.error('Failed to fetch supplier contracts:', error);
      }
    };
    fetchContracts();
  }, []);

  // Handle form submission for creating a new contract
  const handleCreateContract = async (e) => {
    e.preventDefault();
    try {
      await apiService.createSupplierContract(newContract);
      setContracts([...contracts, newContract]);
      setNewContract({ supplierName: '', contractDate: '', amount: 0 });
    } catch (error) {
      console.error('Failed to create contract:', error);
    }
  };

  // Handle the editing of a contract
  const handleEditContract = (contract) => {
    setEditContract(contract);
    setOpenEditDialog(true);
  };

  const handleUpdateContract = async (e) => {
    e.preventDefault();
    try {
      await apiService.updateSupplierContract(editContract.id, editContract); // Assuming an API update endpoint
      const updatedContracts = contracts.map((contract) =>
        contract.id === editContract.id ? editContract : contract
      );
      setContracts(updatedContracts);
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Failed to update contract:', error);
    }
  };

  // Handle contract deletion
  const handleDeleteContract = async (contractId) => {
    try {
      await apiService.deleteSupplierContract(contractId); // Assuming an API delete endpoint
      setContracts(contracts.filter((contract) => contract.id !== contractId));
    } catch (error) {
      console.error('Failed to delete contract:', error);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Supplier Contracts</h1>

      {/* Create Supplier Contract Form */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6" gutterBottom>Create Supplier Contract</Typography>
          <form onSubmit={handleCreateContract}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Supplier Name"
                  fullWidth
                  value={newContract.supplierName}
                  onChange={(e) => setNewContract({ ...newContract, supplierName: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Contract Date"
                  type="date"
                  fullWidth
                  value={newContract.contractDate}
                  onChange={(e) => setNewContract({ ...newContract, contractDate: e.target.value })}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  value={newContract.amount}
                  onChange={(e) => setNewContract({ ...newContract, amount: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
              Create Contract
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card key={contract.id} className="shadow-md rounded-lg p-4">
            <CardContent>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6" className="font-semibold">{contract.supplierName}</Typography>
                  <Typography variant="body2">Contract Date: {contract.contractDate}</Typography>
                  <Typography variant="body2">Amount: ${contract.amount}</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditContract(contract)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteContract(contract.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Contract Modal */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Supplier Contract</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdateContract}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Supplier Name"
                  fullWidth
                  value={editContract?.supplierName}
                  onChange={(e) => setEditContract({ ...editContract, supplierName: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contract Date"
                  type="date"
                  fullWidth
                  value={editContract?.contractDate}
                  onChange={(e) => setEditContract({ ...editContract, contractDate: e.target.value })}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  value={editContract?.amount}
                  onChange={(e) => setEditContract({ ...editContract, amount: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update Contract
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SupplierContractsPage;
