import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Supply Chain Management System
          </motion.h1>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Streamline and optimize your entire supply chain process with our powerful and intuitive solution.
          </motion.p>
          <Link
            to="/AdminD"
            className="bg-white text-blue-800 py-2 px-6 rounded-lg text-xl hover:bg-gray-200 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Research Article Section */}
      <section className="bg-gray-50 p-8">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Understanding the Importance of Supply Chain Optimization
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-4">What is Supply Chain Management?</h3>
              <p className="text-gray-700 mb-4">
                Supply chain management (SCM) is the management of the flow of goods and services, which includes all processes that transform raw materials into final products. Effective SCM helps businesses to lower costs, improve quality, and increase efficiency.
              </p>
              <p className="text-gray-700">
                Our Supply Chain Management System aims to provide businesses with tools to automate, monitor, and optimize their entire supply chain process, from procurement and production to inventory and shipment management.
              </p>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src="img1.jpg" alt="Supply Chain Management" className="rounded-lg shadow-lg w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Introduction Section */}
      <section className="bg-white p-8">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Why Choose Our Supply Chain Management System?
          </motion.h2>
          <p className="text-lg text-gray-700 mb-8">
            Our system integrates all key areas of your supply chain to ensure seamless collaboration across different departments. With real-time analytics, forecasting tools, and easy-to-use dashboards, you'll have full control over your supply chain operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Real-Time Data Tracking</h3>
              <p className="text-gray-600">
                Track every aspect of your supply chain, from inventory levels to order status, in real-time. Reduce delays and improve decision-making.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Automated Reporting</h3>
              <p className="text-gray-600">
                Automate report generation and receive insights into your supply chain operations without the need for manual intervention.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Seamless Integration</h3>
              <p className="text-gray-600">
                Our system integrates easily with your existing tools and platforms, providing a smooth transition to improved operations.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Cost Optimization</h3>
              <p className="text-gray-600">
                Save costs by optimizing routes, automating procurement, and managing inventory more efficiently.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 mt-8">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Project Signature
          </motion.h2>
          <p className="text-lg mb-4">
            This Supply Chain Management System was developed with precision and efficiency in mind. Our goal is to help organizations of all sizes optimize their supply chain processes, reduce waste, and improve their bottom line.
          </p>
          <p className="text-xl font-semibold">Created by Sai Venkatesh</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
