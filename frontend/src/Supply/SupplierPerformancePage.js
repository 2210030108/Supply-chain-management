// src/Supply/SupplierPerformancePage.js

import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';

const SupplierPerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [supplierRatingData, setSupplierRatingData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  // Fetch performance, rating, and orders data
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const data = await apiService.getSupplierPerformance(); // Mocked API call
        setPerformanceData(data.performanceMetrics);
        setSupplierRatingData(data.supplierRating);
        setOrdersData(data.orders);
      } catch (error) {
        console.error('Failed to fetch supplier performance data:', error);
      }
    };
    fetchPerformanceData();
  }, []);

  // Data for Pie chart (Supplier rating distribution)
  const pieChartData = supplierRatingData.map(rating => ({
    name: rating.rating,
    value: rating.value
  }));

  // Bar chart data (orders by status)
  const barChartData = ordersData.map(order => ({
    name: order.status,
    value: order.count
  }));

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Supplier Performance</h1>

      {/* Supplier Rating Pie Chart */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Supplier Rating Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8" label>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Bar Chart */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Supplier Performance Data Table */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Performance Data</h2>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={performanceData}
            columns={[
              { field: 'supplierName', headerName: 'Supplier', width: 150 },
              { field: 'orderCount', headerName: 'Orders', width: 150 },
              { field: 'onTimeDeliveries', headerName: 'On-Time Deliveries', width: 180 },
              { field: 'rating', headerName: 'Rating', width: 120 },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SupplierPerformancePage;
