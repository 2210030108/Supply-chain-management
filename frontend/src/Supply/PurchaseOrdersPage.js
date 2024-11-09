// src/pages/PurchaseOrdersPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { Button, TextField, Grid, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PurchaseOrdersPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [newPurchaseOrder, setNewPurchaseOrder] = useState({
    supplierId: '',
    orderDate: '',
    status: 'Pending',
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch Purchase Orders
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const data = await apiService.getPurchaseOrders();
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Failed to fetch purchase orders:', error);
      }
    };
    fetchPurchaseOrders();
  }, []);

  // Handle Create Purchase Order
  const handleCreatePurchaseOrder = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService.createPurchaseOrder(newPurchaseOrder);
      setPurchaseOrders([...purchaseOrders, data]);
      setNewPurchaseOrder({ supplierId: '', orderDate: '', status: 'Pending' });
      setOpenCreateDialog(false);
      setSnackbarMessage('Purchase Order created successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Failed to create purchase order:', error);
    }
  };

  // Handle Edit Purchase Order
  const handleEditPurchaseOrder = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService.updatePurchaseOrder(editingOrder.id, editingOrder);
      setPurchaseOrders(purchaseOrders.map(po => po.id === data.id ? data : po));
      setOpenEditDialog(false);
      setSnackbarMessage('Purchase Order updated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Failed to update purchase order:', error);
    }
  };

  // Handle Delete Purchase Order
  const handleDeletePurchaseOrder = async (id) => {
    try {
      await apiService.deletePurchaseOrder(id);
      setPurchaseOrders(purchaseOrders.filter(po => po.id !== id));
      setSnackbarMessage('Purchase Order deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Failed to delete purchase order:', error);
    }
  };

  // Columns for DataGrid table
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'supplierId', headerName: 'Supplier ID', width: 200 },
    { field: 'orderDate', headerName: 'Order Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            color="primary"
            onClick={() => {
              setEditingOrder(params.row);
              setOpenEditDialog(true);
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            onClick={() => handleDeletePurchaseOrder(params.row.id)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Purchase Orders</h1>

      {/* Create Purchase Order Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)}
        className="mb-6"
      >
        Create Purchase Order
      </Button>

      {/* Data Table for Purchase Orders */}
      <div className="mb-6">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={purchaseOrders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>

      {/* Create Purchase Order Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Create Purchase Order</DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreatePurchaseOrder}>
            <TextField
              label="Supplier ID"
              value={newPurchaseOrder.supplierId}
              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, supplierId: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Order Date"
              type="date"
              value={newPurchaseOrder.orderDate}
              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, orderDate: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Status"
              value={newPurchaseOrder.status}
              onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, status: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={() => setOpenCreateDialog(false)} color="default">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Purchase Order Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Purchase Order</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditPurchaseOrder}>
            <TextField
              label="Supplier ID"
              value={editingOrder?.supplierId}
              onChange={(e) => setEditingOrder({ ...editingOrder, supplierId: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Order Date"
              type="date"
              value={editingOrder?.orderDate}
              onChange={(e) => setEditingOrder({ ...editingOrder, orderDate: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Status"
              value={editingOrder?.status}
              onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="default">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </motion.div>
  );
};

export default PurchaseOrdersPage;
