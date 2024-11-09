// src/pages/ForecastsPage.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../apiService'; // Assuming you have a service to fetch data

const ForecastsPage = () => {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const fetchForecasts = async () => {
      try {
        const data = await apiService.getForecasts(); // Replace with your API call
        setForecasts(data);
      } catch (error) {
        console.error('Failed to fetch forecasts:', error);
      }
    };
    fetchForecasts();
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Forecasts</h1>
      <div className="space-y-4">
        {forecasts.map((forecast) => (
          <div key={forecast.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold">Forecast ID: {forecast.id}</h3>
            <p>Product ID: {forecast.productId}</p>
            <p>Quantity Forecasted: {forecast.forecastQuantity}</p>
            <p>Forecast Period: {forecast.period}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastsPage;
