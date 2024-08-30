// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 
const apiService = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch products');
    }
  },

  async getProductById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch product');
    }
  },

  async createProduct(product) {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, product, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create product');
    }
  },

  async updateProduct(id, product) {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, product, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update product');
    }
  },

  async deleteProduct(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete product');
    }
  },

  async getStocks() {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock`);
      // Check if response data is in expected format
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching stocks:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch stocks');
    }
  },

  async getStockById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/${id}`);
      // Check if response data is in expected format
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching stock:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch stock');
    }
  },

  async createStock(stock) {
    try {
      // Validate stock object if necessary
      if (!stock || typeof stock !== 'object') {
        throw new Error('Invalid stock data');
      }

      const response = await axios.post(`${API_BASE_URL}/stock`, stock, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if response data is in expected format
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error creating stock:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create stock');
    }
  },

  async getWarehouses() {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      throw error;
    }
  },

  async createWarehouse(warehouse) {
    try {
      const response = await axios.post(`${API_BASE_URL}/warehouses`, warehouse, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating warehouse:', error);
      throw error;
    }
  },

  async updateWarehouse(id, warehouse) {
    try {
      const response = await axios.put(`${API_BASE_URL}/warehouses/${id}`, warehouse, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating warehouse:', error);
      throw error;
    }
  },

  async deleteWarehouse(id) {
    try {
      await axios.delete(`${API_BASE_URL}/warehouses/${id}`);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      throw error;
    }
  },
};

export { apiService };
