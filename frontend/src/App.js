// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Dashboard from './Inventory/Dashboard';
import ProductPage from './Inventory/ProductPage';
import StockPage from './Inventory/StockPage';
import WarehousePage from './Inventory/WarehousePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/Dash" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/stocks" element={<StockPage />} />
        <Route path="/warehouses" element={<WarehousePage />} />
      </Routes>
    </Router>
    //     <Router>
    //   <div className="min-h-screen bg-gray-100">
    //     <NavBar />
    //     <div className="p-6">
    //       <Routes>
    //         <Route path="/" element={<Dashboard />} />
    //         <Route path="/products" element={<ProductPage />} />
    //         <Route path="/stocks" element={<StockPage />} />
    //         <Route path="/warehouses" element={<WarehousePage />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;
