// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiService = {
  // Products API
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

  // Stocks API
  async getStocks() {
    try {
      const response = await axios.get(`${API_BASE_URL}/stocks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch stocks');
    }
  },

  async getStockById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/stocks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch stock');
    }
  },

  async createStock(stock) {
    try {
      const response = await axios.post(`${API_BASE_URL}/stocks`, stock, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating stock:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create stock');
    }
  },

  async updateStock(id, stock) {
    try {
      const response = await axios.put(`${API_BASE_URL}/stocks/${id}`, stock, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating stock:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update stock');
    }
  },

  async deleteStock(id) {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${id}`);
    } catch (error) {
      console.error('Error deleting stock:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete stock');
    }
  },

  // Warehouses API
  async getWarehouses() {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouses:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch warehouses');
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
      console.error('Error creating warehouse:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create warehouse');
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
      console.error('Error updating warehouse:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update warehouse');
    }
  },

  async deleteWarehouse(id) {
    try {
      await axios.delete(`${API_BASE_URL}/warehouses/${id}`);
    } catch (error) {
      console.error('Error deleting warehouse:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete warehouse');
    }
  },

  // Orders API
  async getOrders() {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch orders');
    }
  },

  async createOrder(order) {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create order');
    }
  },

  async updateOrder(id, order) {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${id}`, order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update order');
    }
  },

  async deleteOrder(id) {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
    } catch (error) {
      console.error('Error deleting order:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete order');
    }
  },

  // Customers API
  async getCustomers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch customers');
    }
  },

  async createCustomer(customer) {
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, customer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create customer');
    }
  },

  async updateCustomer(id, customer) {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${id}`, customer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update customer');
    }
  },

  async deleteCustomer(id) {
    try {
      await axios.delete(`${API_BASE_URL}/customers/${id}`);
    } catch (error) {
      console.error('Error deleting customer:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete customer');
    }
  },

  // Supplier Contracts API
  async getSupplierContracts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/supplierContracts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching supplier contracts:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch supplier contracts');
    }
  },

  async createSupplierContract(contract) {
    try {
      const response = await axios.post(`${API_BASE_URL}/supplierContracts`, contract, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating supplier contract:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create supplier contract');
    }
  },

  async updateSupplierContract(id, contract) {
    try {
      const response = await axios.put(`${API_BASE_URL}/supplierContracts/${id}`, contract, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating supplier contract:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update supplier contract');
    }
  },

  async deleteSupplierContract(id) {
    try {
      await axios.delete(`${API_BASE_URL}/supplierContracts/${id}`);
    } catch (error) {
      console.error('Error deleting supplier contract:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete supplier contract');
    }
  },

  // Shipments API
  async getShipments() {
    try {
      const response = await axios.get(`${API_BASE_URL}/shipments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shipments:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch shipments');
    }
  },

  async createShipment(shipment) {
    try {
      const response = await axios.post(`${API_BASE_URL}/shipments`, shipment, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating shipment:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create shipment');
    }
  },

  async updateShipment(id, shipment) {
    try {
      const response = await axios.put(`${API_BASE_URL}/shipments/${id}`, shipment, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating shipment:', error.response ? error.response.data : error.message);
      throw new Error('Failed to update shipment');
    }
  },

  async deleteShipment(id) {
    try {
      await axios.delete(`${API_BASE_URL}/shipments/${id}`);
    } catch (error) {
      console.error('Error deleting shipment:', error.response ? error.response.data : error.message);
      throw new Error('Failed to delete shipment');
    }
  },
  getShipmentDetails: async () => {
    const response = await fetch('/api/shipments');
    return response.json();
  },
  getShipmentHistory: async () => {
    const response = await fetch('/api/shipment-history');
    return response.json();
  },
  
};

export { apiService };
