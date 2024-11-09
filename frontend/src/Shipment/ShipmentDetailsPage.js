// src/Shipment/ShipmentDetailsPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { Paper, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const ShipmentDetailsPage = () => {
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const [shipmentHistory, setShipmentHistory] = useState([]);
  const [statusCount, setStatusCount] = useState({
    Pending: 0,
    Shipped: 0,
    Delivered: 0,
  });

  // Fetch shipment details and history
  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const data = await apiService.getShipmentDetails();
        setShipmentDetails(data);
        const history = await apiService.getShipmentHistory(); // Assuming this is another endpoint
        setShipmentHistory(history);
        
        // Count shipment status
        const statusCount = {
          Pending: data.filter(s => s.status === 'Pending').length,
          Shipped: data.filter(s => s.status === 'Shipped').length,
          Delivered: data.filter(s => s.status === 'Delivered').length,
        };
        setStatusCount(statusCount);
      } catch (error) {
        console.error('Failed to fetch shipment details:', error);
      }
    };
    fetchShipmentDetails();
  }, []);

  // Pie chart data for shipment statuses
  const pieChartData = {
    labels: ['Pending', 'Shipped', 'Delivered'],
    datasets: [
      {
        data: [statusCount.Pending, statusCount.Shipped, statusCount.Delivered],
        backgroundColor: ['#ffb3b3', '#ffcc99', '#66b3ff'],
        hoverBackgroundColor: ['#ff9999', '#ff9966', '#3399ff'],
      },
    ],
  };

  // Bar chart data for shipments per date (assuming `shipmentHistory` contains a list of shipments with dates)
  const barChartData = {
    labels: shipmentHistory.map(history => history.date), // Assuming shipmentHistory has a date field
    datasets: [
      {
        label: 'Shipments per Date',
        data: shipmentHistory.map(history => history.shipmentsCount), // Assuming it has a shipmentsCount field
        backgroundColor: '#66b3ff',
      },
    ],
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Shipment Details</h1>

      {/* Shipment Stats Section */}
      <Grid container spacing={4}>
        {/* Pie Chart */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">Shipment Status Distribution</Typography>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} sm={6} md={8}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">Shipments Per Date</Typography>
              <Bar data={barChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Shipment History Table */}
      <Grid container spacing={4} className="mt-6">
        <Grid item xs={12}>
          <Paper className="p-4 shadow-lg">
            <Typography variant="h5" className="font-semibold mb-4">Shipment History</Typography>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 text-left">Shipment ID</th>
                    <th className="p-2 text-left">Destination</th>
                    <th className="p-2 text-left">Shipment Date</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentDetails.map((shipment) => (
                    <tr key={shipment.id} className="border-t">
                      <td className="p-2">{shipment.id}</td>
                      <td className="p-2">{shipment.destination}</td>
                      <td className="p-2">{shipment.shipmentDate}</td>
                      <td className="p-2">{shipment.status}</td>
                      <td className="p-2 text-center">
                        <Button
                          color="secondary"
                          onClick={() => apiService.deleteShipment(shipment.id)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ShipmentDetailsPage;
