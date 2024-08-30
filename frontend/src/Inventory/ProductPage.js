// src/components/ProductPage.js
import React, { useState, useEffect } from 'react';
import { apiService } from '../apiService';
import NavBar from './NavBar';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', category: '', unitOfMeasure: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await apiService.getProducts();
    setProducts(data);
  };

  const handleCreate = async () => {
    await apiService.createProduct(newProduct);
    fetchProducts();
    setNewProduct({ name: '', description: '', category: '', unitOfMeasure: '' });
  };

  const handleUpdate = async (id) => {
    await apiService.updateProduct(id, editingProduct);
    fetchProducts();
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    await apiService.deleteProduct(id);
    fetchProducts();
  };

  return (
    <>
    <NavBar/>
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Add Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Unit of Measure"
          value={newProduct.unitOfMeasure}
          onChange={(e) => setNewProduct({ ...newProduct, unitOfMeasure: e.target.value })}
          className="border p-2 mb-4 w-full"
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Create Product</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Products List</h3>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Unit of Measure</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.unitOfMeasure}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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

      {editingProduct && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingProduct.category}
            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            value={editingProduct.unitOfMeasure}
            onChange={(e) => setEditingProduct({ ...editingProduct, unitOfMeasure: e.target.value })}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={() => handleUpdate(editingProduct.id)}
            className="bg-green-500 text-white p-2 rounded"
          >
            Update Product
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default ProductPage;
