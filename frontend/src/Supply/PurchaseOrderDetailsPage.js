// src/pages/PurchaseOrderDetailsPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PurchaseOrderDetailsPage = () => {
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    Pending: 0,
    Shipped: 0,
    Delivered: 0,
  });

  useEffect(() => {
    const fetchPurchaseOrderDetails = async () => {
      try {
        const data = await apiService.getPurchaseOrderDetails();
        setPurchaseOrderDetails(data);
        
        // Data processing for the charts and counts
        processDataForCharts(data);
      } catch (error) {
        console.error('Failed to fetch purchase order details:', error);
      }
    };

    fetchPurchaseOrderDetails();
  }, []);

  // Process data for chart and status counts
  const processDataForCharts = (data) => {
    let shipped = 0;
    let pending = 0;
    let delivered = 0;
    let total = 0;

    // Loop through data and compute totals
    const chartData = data.map((detail) => {
      total += detail.quantity;
      if (detail.status === 'Pending') pending += detail.quantity;
      if (detail.status === 'Shipped') shipped += detail.quantity;
      if (detail.status === 'Delivered') delivered += detail.quantity;

      return {
        product: detail.productId,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
      };
    });

    // Set up status count for Pie chart and Bar chart
    setStatusCounts({ Pending: pending, Shipped: shipped, Delivered: delivered });
    setTotalOrders(total);
    setChartData(chartData);
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'productId', headerName: 'Product ID', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'unitPrice', headerName: 'Unit Price', width: 150 },
  ];

  // Data for the Pie chart (Order Status)
  const pieData = [
    { name: 'Pending', value: statusCounts.Pending },
    { name: 'Shipped', value: statusCounts.Shipped },
    { name: 'Delivered', value: statusCounts.Delivered },
  ];

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Purchase Order Details</h1>

      <Grid container spacing={4}>
        {/* Column 1: Pie Chart for Order Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Status Distribution</Typography>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#ff8042" : (index === 1 ? "#0088fe" : "#00c49f")} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Column 2: Bar Chart for Quantity vs Product ID */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quantity per Product</Typography>
              <BarChart width={400} height={300} data={chartData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#82ca9d" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Column 3: DataGrid with Purchase Order Details */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Purchase Order Details Table</Typography>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={purchaseOrderDetails}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider className="my-6" />
      
      {/* Order Summary */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Order Summary</Typography>
          <Typography variant="body1">Total Orders: {totalOrders}</Typography>
          <Typography variant="body1">Pending Orders: {statusCounts.Pending}</Typography>
          <Typography variant="body1">Shipped Orders: {statusCounts.Shipped}</Typography>
          <Typography variant="body1">Delivered Orders: {statusCounts.Delivered}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PurchaseOrderDetailsPage;
