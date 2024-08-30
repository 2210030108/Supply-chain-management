// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Dashboard</Link></li>
        <li><Link to="/products" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Products</Link></li>
        <li><Link to="/stocks" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Stocks</Link></li>
        <li><Link to="/warehouses" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Warehouses</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
