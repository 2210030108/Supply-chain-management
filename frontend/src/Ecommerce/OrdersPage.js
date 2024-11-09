// src/pages/OrdersPage.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../apiService';
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    orderDate: '',
    deliveryDate: '',
    status: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Create new order
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const createdOrder = await apiService.createOrder(newOrder);
      setOrders([...orders, createdOrder]); // Add the new order to the list
      setNewOrder({
        customerId: '',
        orderDate: '',
        deliveryDate: '',
        status: '',
      });
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  // Open edit modal with order details
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  // Update order details
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const updatedOrder = await apiService.updateOrder(editingOrder.id, editingOrder);
      setOrders(orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  // Delete an order
  const handleDeleteOrder = async (id) => {
    try {
      await apiService.deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id)); // Remove the deleted order
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Create Order Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create New Order</h2>
        <form onSubmit={handleCreateOrder} className="space-y-4 mt-4">
          <input
            type="text"
            name="customerId"
            value={newOrder.customerId}
            onChange={handleInputChange}
            placeholder="Customer ID"
            className="input"
            required
          />
          <input
            type="date"
            name="orderDate"
            value={newOrder.orderDate}
            onChange={handleInputChange}
            placeholder="Order Date"
            className="input"
            required
          />
          <input
            type="date"
            name="deliveryDate"
            value={newOrder.deliveryDate}
            onChange={handleInputChange}
            placeholder="Delivery Date"
            className="input"
            required
          />
          <select
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
            className="input"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button type="submit" className="btn btn-primary">Create Order</button>
        </form>
      </div>

      {/* Order Table */}
      <div className="space-y-4">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer ID</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Delivery Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customerId}</td>
                <td className="border px-4 py-2">{order.orderDate}</td>
                <td className="border px-4 py-2">{order.deliveryDate}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Order</h2>
            <form onSubmit={handleUpdateOrder}>
              <input
                type="text"
                name="customerId"
                value={editingOrder.customerId}
                onChange={(e) => setEditingOrder({ ...editingOrder, customerId: e.target.value })}
                className="input mb-4"
              />
              <input
                type="date"
                name="orderDate"
                value={editingOrder.orderDate}
                onChange={(e) => setEditingOrder({ ...editingOrder, orderDate: e.target.value })}
                className="input mb-4"
              />
              <input
                type="date"
                name="deliveryDate"
                value={editingOrder.deliveryDate}
                onChange={(e) => setEditingOrder({ ...editingOrder, deliveryDate: e.target.value })}
                className="input mb-4"
              />
              <select
                name="status"
                value={editingOrder.status}
                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                className="input mb-4"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OrdersPage;
