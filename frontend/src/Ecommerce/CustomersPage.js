// src/pages/CustomersPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });
  const [editCustomer, setEditCustomer] = useState({ id: '', name: '', email: '' });
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Fetch all customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await apiService.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle form submission for creating a new customer
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      const createdCustomer = await apiService.createCustomer(newCustomer);
      setCustomers([...customers, createdCustomer]);
      setNewCustomer({ name: '', email: '' });
      setOpenCreateDialog(false); // Close the dialog after creating customer
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  // Handle update customer
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const updatedCustomer = await apiService.updateCustomer(editCustomer);
      setCustomers(customers.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer));
      setEditCustomer({ id: '', name: '', email: '' });
      setOpenEditDialog(false); // Close the dialog after updating
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  // Handle delete customer
  const handleDeleteCustomer = async (id) => {
    try {
      await apiService.deleteCustomer(id);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Failed to delete customer:', error);
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
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Customers</h1>

      {/* Create Customer Button */}
      <Button
        variant="contained"
        color="primary"
        className="mb-6"
        onClick={() => setOpenCreateDialog(true)}
      >
        Create New Customer
      </Button>

      {/* Customers Table */}
      <TableContainer component={Paper} className="mb-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-100">
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="mr-2"
                    onClick={() => {
                      setEditCustomer({ id: customer.id, name: customer.name, email: customer.email });
                      setOpenEditDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Customer Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create New Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="default">
            Cancel
          </Button>
          <Button onClick={handleCreateCustomer} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={editCustomer.name}
            onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={editCustomer.email}
            onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="default">
            Cancel
          </Button>
          <Button onClick={handleUpdateCustomer} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default CustomersPage;
