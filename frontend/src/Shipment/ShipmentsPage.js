// src/pages/ShipmentsPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShipmentsPage = () => {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    shipmentDate: '',
    destination: '',
    status: 'Pending',
  });

  // Fetch all shipments
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await apiService.getShipments();
        setShipments(data);
      } catch (error) {
        console.error('Failed to fetch shipments:', error);
      }
    };
    fetchShipments();
  }, []);

  // Handle form submission for creating a new shipment
  const handleCreateShipment = async (e) => {
    e.preventDefault();
    try {
      await apiService.createShipment(newShipment);
      setShipments([...shipments, newShipment]);
      setNewShipment({ shipmentDate: '', destination: '', status: 'Pending' });
    } catch (error) {
      console.error('Failed to create shipment:', error);
    }
  };

  // Handle delete shipment
  const handleDeleteShipment = async (id) => {
    try {
      await apiService.deleteShipment(id);
      setShipments(shipments.filter(shipment => shipment.id !== id));
    } catch (error) {
      console.error('Failed to delete shipment:', error);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Manage Shipments</h1>

      {/* Create Shipment Form */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Shipment Date"
            type="date"
            value={newShipment.shipmentDate}
            onChange={(e) => setNewShipment({ ...newShipment, shipmentDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Destination"
            value={newShipment.destination}
            onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newShipment.status}
              onChange={(e) => setNewShipment({ ...newShipment, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreateShipment}
            className="mt-6"
          >
            Create Shipment
          </Button>
        </Grid>
      </Grid>

      {/* Shipments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shipment Date</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentDate}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteShipment(shipment.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default ShipmentsPage;
