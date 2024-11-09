// src/pages/OrderDetailsPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OrderDetailsPage = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Order Quantity',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Sales Value',
        data: [40, 45, 60, 62, 48, 50],
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await apiService.getOrderDetails();
        setOrderDetails(data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };
    fetchOrderDetails();
  }, []);

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Quantity</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Value</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Average Delivery Time</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Returned Orders</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Profit Margin</h3>
          <Line data={graphData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Order Details Table */}
      <TableContainer component={Paper} className="bg-white shadow-md rounded-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Order ID</TableCell>
              <TableCell className="font-semibold">Product ID</TableCell>
              <TableCell className="font-semibold">Quantity</TableCell>
              <TableCell className="font-semibold">Unit Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.orderId}</TableCell>
                <TableCell>{detail.productId}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>{detail.unitPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default OrderDetailsPage;
