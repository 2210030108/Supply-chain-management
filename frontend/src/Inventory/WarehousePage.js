import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import NavBar from './NavBar';

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ location: '', capacity: '', manager: '' });
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const data = await apiService.getWarehouses();
      setWarehouses(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching warehouses:', err);
      setError('Failed to fetch warehouses.');
    }
  };

  const handleCreate = async () => {
    if (!newWarehouse.location || !newWarehouse.capacity || !newWarehouse.manager) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await apiService.createWarehouse(newWarehouse);
      setSuccess('Warehouse created successfully!');
      fetchWarehouses();
      setNewWarehouse({ location: '', capacity: '', manager: '' });
      setError(null);
    } catch (err) {
      console.error('Error creating warehouse:', err);
      setError('Failed to create warehouse.');
    }
  };

  const handleUpdate = async (id) => {
    if (!editingWarehouse.location || !editingWarehouse.capacity || !editingWarehouse.manager) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await apiService.updateWarehouse(id, editingWarehouse);
      setSuccess('Warehouse updated successfully!');
      fetchWarehouses();
      setEditingWarehouse(null);
      setError(null);
    } catch (err) {
      console.error('Error updating warehouse:', err);
      setError('Failed to update warehouse.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteWarehouse(id);
      setSuccess('Warehouse deleted successfully!');
      fetchWarehouses();
    } catch (err) {
      console.error('Error deleting warehouse:', err);
      setError('Failed to delete warehouse.');
    }
  };

  return (
    <>
    <NavBar/>
    <div>
      <h2 className="text-xl font-semibold mb-4">Warehouses</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Add Warehouse</h3>
        <input
          type="text"
          placeholder="Location"
          value={newWarehouse.location}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Capacity"
          value={newWarehouse.capacity}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Manager"
          value={newWarehouse.manager}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, manager: e.target.value })}
          className="border p-2 mb-4 w-full"
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Create Warehouse</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Warehouses List</h3>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Manager</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td className="border p-2">{warehouse.id}</td>
                <td className="border p-2">{warehouse.location}</td>
                <td className="border p-2">{warehouse.capacity}</td>
                <td className="border p-2">{warehouse.manager}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingWarehouse(warehouse)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(warehouse.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingWarehouse && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Edit Warehouse</h3>
          <input
            type="text"
            value={editingWarehouse.location}
            onChange={(e) => setEditingWarehouse({ ...editingWarehouse, location: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingWarehouse.capacity}
            onChange={(e) => setEditingWarehouse({ ...editingWarehouse, capacity: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingWarehouse.manager}
            onChange={(e) => setEditingWarehouse({ ...editingWarehouse, manager: e.target.value })}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={() => handleUpdate(editingWarehouse.id)}
            className="bg-green-500 text-white p-2 rounded"
          >
            Update Warehouse
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
      )}
    </div>
    </>
  );
};

export default WarehousePage;
