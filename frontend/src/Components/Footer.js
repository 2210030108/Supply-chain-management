// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <p className="text-center text-sm">
          &copy; 2024 <strong>Supply Chain Management</strong>. All rights reserved.
        </p>
        <p className="text-center text-xs mt-2">
          Created by <span className="font-semibold">Sai Venkatesh</span>
        </p>
        <div className="flex space-x-6 mt-4">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
            LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors duration-300">
            GitHub
          </a>
          <a href="mailto:sai.venkatesh@example.com" className="text-white hover:text-gray-400 transition-colors duration-300">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
