// src/pages/HistoricalSalesPage.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../apiService'; // Assuming you have a service to fetch data

const HistoricalSalesPage = () => {
  const [historicalSales, setHistoricalSales] = useState([]);

  useEffect(() => {
    const fetchHistoricalSales = async () => {
      try {
        const data = await apiService.getHistoricalSales(); // Replace with your API call
        setHistoricalSales(data);
      } catch (error) {
        console.error('Failed to fetch historical sales:', error);
      }
    };
    fetchHistoricalSales();
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Historical Sales</h1>
      <div className="space-y-4">
        {historicalSales.map((sale) => (
          <div key={sale.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold">Sale ID: {sale.id}</h3>
            <p>Product ID: {sale.productId}</p>
            <p>Quantity Sold: {sale.quantitySold}</p>
            <p>Sale Date: {sale.saleDate}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HistoricalSalesPage;
