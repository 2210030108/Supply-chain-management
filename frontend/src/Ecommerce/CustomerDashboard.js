/* eslint-disable jsx-a11y/anchor-is-valid */
// src/pages/CustomerDashboard.js
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Typography, Divider, Breadcrumbs, Link as MUILink } from '@mui/material';
import OrdersPage from './OrdersPage';
import OrderDetailsPage from './OrderDetailsPage';
import ShipmentsPage from '../Shipment/ShipmentsPage';
import ShipmentDetailsPage from '../Shipment/ShipmentDetailsPage';
import CustomersPage from './CustomersPage';
import { useUser } from '../context/UserContext'; // Using UserContext

const CustomerDashboard = () => {
  const { user, logout } = useUser(); // Destructure user and logout from UserContext
  const [activeComponent, setActiveComponent] = useState('Orders'); // Active state for the selected component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Orders':
        return <OrdersPage />;
      case 'OrderDetails':
        return <OrderDetailsPage />;
      case 'Shipments':
        return <ShipmentsPage />;
      case 'ShipmentDetails':
        return <ShipmentDetailsPage />;
      case 'Customers':
        return <CustomersPage />;
      default:
        return <OrdersPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        className="w-72 bg-white text-gray-800 p-6 border-r border-gray-200"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        exit={{ x: -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-6">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-gray-300"
            />
          ) : (
            <Avatar sx={{ width: 56, height: 56 }} className="bg-gray-300">
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <div>
            <Typography variant="h6" className="font-semibold">{user.username}</Typography>
            <button
              onClick={logout}
              className="text-sm text-blue-500 hover:text-blue-700 mt-2"
            >
              Logout
            </button>
          </div>
        </div>

        <Divider sx={{ my: 2 }} /> {/* Simple divider to separate profile from menu */}

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <a
              className="block text-gradient hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('Orders')}
            >
              Orders
            </a>
          </li>
          <li>
            <a
              className="block text-gradient hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('OrderDetails')}
            >
              Order Details
            </a>
          </li>
          <li>
            <a
              className="block text-gradient hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('Shipments')}
            >
              Shipments
            </a>
          </li>
          <li>
            <a
              className="block text-gradient hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('ShipmentDetails')}
            >
              Shipment Details
            </a>
          </li>
          <li>
            <a
              className="block text-gradient hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('Customers')}
            >
              Customers
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg mx-4 my-2 overflow-hidden border border-gray-200">
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" className="mb-4">
          <MUILink color="inherit" onClick={() => setActiveComponent('Orders')}>Orders</MUILink>
          {activeComponent === 'OrderDetails' && (
            <MUILink color="inherit" onClick={() => setActiveComponent('OrderDetails')}>Order Details</MUILink>
          )}
          {activeComponent === 'Shipments' && (
            <MUILink color="inherit" onClick={() => setActiveComponent('Shipments')}>Shipments</MUILink>
          )}
          {activeComponent === 'ShipmentDetails' && (
            <MUILink color="inherit" onClick={() => setActiveComponent('ShipmentDetails')}>Shipment Details</MUILink>
          )}
          {activeComponent === 'Customers' && (
            <MUILink color="inherit" onClick={() => setActiveComponent('Customers')}>Customers</MUILink>
          )}
        </Breadcrumbs>

        {/* Rendering the selected component dynamically */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default CustomerDashboard;
