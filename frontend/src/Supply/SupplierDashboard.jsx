/* eslint-disable jsx-a11y/anchor-is-valid */
// src/components/Dashboard.js
import React, { useState } from 'react';
import { Avatar, Divider, Typography, Breadcrumbs, Link as MUILink } from '@mui/material';
import { motion } from 'framer-motion';
import ProductPage from '../Inventory/ProductPage';
import StockPage from '../Inventory/StockPage';
import WarehousePage from '../Inventory/WarehousePage';
import { useUser } from '../context/UserContext';
import ForecastsPage from '../Shipment/ForecastsPage';
import HistoricalSalesPage from '../Shipment/HistoricalSalesPage';
import WorkOrdersPage from '../Shipment/WorkOrdersPage';
const Dashboard = () => {
  const { user, logout } = useUser(); 
  const [activeComponent, setActiveComponent] = useState('ProductPage'); 

  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProductPage':
        return <ProductPage />;
      case 'StockPage':
        return <StockPage />;
      case 'WarehousePage':
        return <WarehousePage />;
      case 'ForecastsPage':
        return <ForecastsPage/>;
      case 'HistoricalSalesPage':
        return <HistoricalSalesPage/>;
      case 'WorkOrdersPage':
        return <WorkOrdersPage/>;
      default:
        return <ProductPage />;
    }
  };

  // Breadcrumbs handler
  const handleBreadcrumbClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex min-h-screen">
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
              className="block hover:bg-blue-50 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('ProductPage')}
            >
              Products
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-50 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('StockPage')}
            >
              Stock
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-50 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('WarehousePage')}
            >
              Warehouse
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-50 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('ForecastsPage')}
            >
             Forecasts
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-50 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('HistoricalSalesPage')}
            >
              HistoricalSales
            </a>
          </li>
          <li>
            <a
              className="block hover:bg-blue-50 hover:rounded-lg p-3 transition-all cursor-pointer"
              onClick={() => setActiveComponent('WorkOrdersPage')}
            >
              WorkOrders
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg mx-4 my-2 overflow-hidden border border-gray-200">
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" className="mb-4">
          <MUILink color="inherit" onClick={() => handleBreadcrumbClick('ProductPage')}>Products</MUILink>
          {activeComponent === 'StockPage' && (
            <MUILink color="inherit" onClick={() => handleBreadcrumbClick('StockPage')}>Stock</MUILink>
          )}
          {activeComponent === 'WarehousePage' && (
            <MUILink color="inherit" onClick={() => handleBreadcrumbClick('WarehousePage')}>Warehouse</MUILink>
          )}
          {activeComponent === 'ForecastsPage' && (
            <MUILink color="inherit" onClick={() => handleBreadcrumbClick('ForecastsPage')}>Forecasts</MUILink>
          )}
          {activeComponent === 'HistoricalSalesPage' && (
            <MUILink color="inherit" onClick={() => handleBreadcrumbClick('HistoricalSalesPage')}>HistoricalSales</MUILink>
          )}
          {activeComponent === 'WorkOrdersPage' && (
            <MUILink color="inherit" onClick={() => handleBreadcrumbClick('WorkOrdersPage')}>Warehouse</MUILink>
          )}
        </Breadcrumbs>

        {/* Rendering the selected component dynamically */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
