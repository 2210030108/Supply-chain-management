import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext"; // Assuming you have a RoleContext provider
import { UserProvider } from "./context/UserContext";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import AdminDashboard from "./Admin/AdminDashboard";

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./Inventory/Dashboard'));
const ProductPage = React.lazy(() => import('./Inventory/ProductPage'));
const StockPage = React.lazy(() => import('./Inventory/StockPage'));
const WarehousePage = React.lazy(() => import('./Inventory/WarehousePage'));

const OrdersPage = React.lazy(() => import('./Ecommerce/OrdersPage'));
const OrderDetailsPage = React.lazy(() => import('./Ecommerce/OrderDetailsPage'));
const PurchaseOrdersPage = React.lazy(() => import('./Supply/PurchaseOrdersPage'));
const PurchaseOrderDetailsPage = React.lazy(() => import('./Supply/PurchaseOrderDetailsPage'));

const ShipmentsPage = React.lazy(() => import('./Shipment/ShipmentsPage'));
const ShipmentDetailsPage = React.lazy(() => import('./Shipment/ShipmentDetailsPage'));

const CustomersPage = React.lazy(() => import('./Ecommerce/CustomerDashboard'));
const SuppliersPage = React.lazy(() => import('./Supply/SupplierDashboard'));
const SupplierPerformancePage = React.lazy(() => import('./Supply/SupplierPerformancePage'));
const SupplierContractsPage = React.lazy(() => import('./Supply/SupplierContractsPage'));

function App() {
  return (
    <UserProvider>
    <RoleProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* You can include your NavBar here if required */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} /> {/* Default route */}

              {/* Inventory Routes */}
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/stocks" element={<StockPage />} />
              <Route path="/warehouses" element={<WarehousePage />} />

              {/* Supply Chain Routes */}
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/order-details" element={<OrderDetailsPage />} />
              <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
              <Route path="/purchase-order-details" element={<PurchaseOrderDetailsPage />} />

              {/* Shipment Routes */}
              <Route path="/shipments" element={<ShipmentsPage />} />
              <Route path="/shipment-details" element={<ShipmentDetailsPage />} />

              {/* Ecommerce Routes */}
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              
  <Route path="/supplier-performance" element={<SupplierPerformancePage />} />
  <Route path="/supplier-contracts" element={<SupplierContractsPage />} />
  <Route path="/AdminD" element={<AdminDashboard />} />

            </Routes>
          </Suspense>
        </div>
      </Router>
    </RoleProvider>
    </UserProvider>
  );
}

export default App;
