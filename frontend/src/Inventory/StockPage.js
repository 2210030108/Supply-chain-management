import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import NavBar from './NavBar';

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ productId: '', warehouseId: '', quantityOnHand: '', reorderLevel: '' });
  const [editingStock, setEditingStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getStocks();
      setStocks(data);
    } catch (err) {
      setError('Failed to fetch stocks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiService.createStock(newStock);
      fetchStocks();
      setNewStock({ productId: '', warehouseId: '', quantityOnHand: '', reorderLevel: '' });
    } catch (err) {
      setError('Failed to create stock.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.updateStock(id, editingStock);
      fetchStocks();
      setEditingStock(null);
    } catch (err) {
      setError('Failed to update stock.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteStock(id);
      fetchStocks();
    } catch (err) {
      setError('Failed to delete stock.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    // Basic validation to check if all fields are filled
    return Object.values(newStock).every(value => value.trim() !== '');
  };

  return (
    <>
    <NavBar/>
    <div>
      <h2 className="text-xl font-semibold mb-4">Stocks</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading && <div className="mb-4">Loading...</div>}

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Add Stock</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={newStock.productId}
          onChange={(e) => setNewStock({ ...newStock, productId: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Warehouse ID"
          value={newStock.warehouseId}
          onChange={(e) => setNewStock({ ...newStock, warehouseId: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Quantity on Hand"
          value={newStock.quantityOnHand}
          onChange={(e) => setNewStock({ ...newStock, quantityOnHand: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Reorder Level"
          value={newStock.reorderLevel}
          onChange={(e) => setNewStock({ ...newStock, reorderLevel: e.target.value })}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={!isFormValid() || loading}
        >
          Create Stock
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Stocks List</h3>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Product ID</th>
              <th className="border p-2">Warehouse ID</th>
              <th className="border p-2">Quantity On Hand</th>
              <th className="border p-2">Reorder Level</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="border p-2">{stock.id}</td>
                <td className="border p-2">{stock.productId}</td>
                <td className="border p-2">{stock.warehouseId}</td>
                <td className="border p-2">{stock.quantityOnHand}</td>
                <td className="border p-2">{stock.reorderLevel}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingStock(stock)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="bg-red-500 text-white p-1 rounded"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingStock && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Edit Stock</h3>
          <input
            type="text"
            value={editingStock.productId}
            onChange={(e) => setEditingStock({ ...editingStock, productId: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingStock.warehouseId}
            onChange={(e) => setEditingStock({ ...editingStock, warehouseId: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            value={editingStock.quantityOnHand}
            onChange={(e) => setEditingStock({ ...editingStock, quantityOnHand: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            value={editingStock.reorderLevel}
            onChange={(e) => setEditingStock({ ...editingStock, reorderLevel: e.target.value })}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={() => handleUpdate(editingStock.id)}
            className="bg-green-500 text-white p-2 rounded"
            disabled={loading}
          >
            Update Stock
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default StockPage;
