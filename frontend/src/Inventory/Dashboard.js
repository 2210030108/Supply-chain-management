// src/components/Dashboard.js
import React from 'react';
import NavBar from './NavBar';
// import ProductPage from './ProductPage';
// import StockPage from './StockPage';
// import WarehousePage from './WarehousePage';
const Dashboard = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <NavBar />
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the Inventory Management System Dashboard.</p>
      {/* <ProductPage/>
      <StockPage/>
      <WarehousePage/> */}
    </div>
    </div>
    </>
  );
};

export default Dashboard;
