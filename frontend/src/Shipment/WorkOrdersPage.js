// src/pages/WorkOrdersPage.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../apiService'; // Assuming you have a service to fetch data

const WorkOrdersPage = () => {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const data = await apiService.getWorkOrders(); // Replace with your API call
        setWorkOrders(data);
      } catch (error) {
        console.error('Failed to fetch work orders:', error);
      }
    };
    fetchWorkOrders();
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Work Orders</h1>
      <div className="space-y-4">
        {workOrders.map((workOrder) => (
          <div key={workOrder.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold">Work Order ID: {workOrder.id}</h3>
            <p>Product ID: {workOrder.productId}</p>
            <p>Status: {workOrder.status}</p>
            <p>Due Date: {workOrder.dueDate}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkOrdersPage;
