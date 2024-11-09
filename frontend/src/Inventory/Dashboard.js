// src/components/Dashboard.js
import React, { useState } from 'react';
import { Avatar, Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ProductPage from './ProductPage';
import StockPage from './StockPage';
import WarehousePage from './WarehousePage';
import { useUser } from '../context/UserContext'; // Using UserContext

const Dashboard = () => {
  const { user, logout } = useUser(); // Destructure user and logout from UserContext
  const [activeComponent, setActiveComponent] = useState('ProductPage'); // Active state for selected component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProductPage':
        return <ProductPage />;
      case 'StockPage':
        return <StockPage />;
      case 'WarehousePage':
        return <WarehousePage />;
      default:
        return <ProductPage />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.div
        className="w-72 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6"
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
              className="w-14 h-14 rounded-full border-2 border-white"
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
              className="text-sm text-blue-300 hover:text-white mt-2"
            >
              Logout
            </button>
          </div>
        </div>

        <Divider sx={{ my: 2 }} />

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <a
              className="block hover:bg-blue-700 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('ProductPage')}
            >
              Products
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-700 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('StockPage')}
            >
              Stock
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-700 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('WarehousePage')}
            >
              Warehouse
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg mx-4 my-2 overflow-hidden">
        {/* Rendering the selected component dynamically */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
