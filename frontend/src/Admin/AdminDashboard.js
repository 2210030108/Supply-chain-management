import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Collapse, Breadcrumbs } from '@mui/material';
import { MdDashboard, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FaBox, FaUserAlt, FaCog, FaTruck, FaCalendarCheck, FaClipboardList, FaChartBar } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { FaCalendarDays } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { Avatar } from '@mui/material';

// Import Pages
import OrdersPage from '../Ecommerce/OrdersPage';
import OrderDetailsPage from '../Ecommerce/OrderDetailsPage';
import CustomersPage from '../Ecommerce/CustomersPage';
import SuppliersPage from '../Supply/SupplierDashboard';
import PurchaseOrdersPage from '../Supply/PurchaseOrdersPage';
import PurchaseOrderDetailsPage from '../Supply/PurchaseOrderDetailsPage';
import ShipmentsPage from '../Shipment/ShipmentsPage';
import ShipmentDetailsPage from '../Shipment/ShipmentDetailsPage';
import SupplierContractsPage from '../Supply/SupplierContractsPage';
import SupplierPerformancePage from '../Supply/SupplierPerformancePage';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openSuppliers, setOpenSuppliers] = useState(false);

  // Toggle function for collapse
  const handleToggleCustomers = () => setOpenCustomers(!openCustomers);
  const handleToggleSuppliers = () => setOpenSuppliers(!openSuppliers);

  // Breadcrumbs logic
  const getBreadcrumbs = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return ['Home', 'Dashboard'];
      case 'Orders':
        return ['Home', 'Orders'];
      case 'Customers':
        return ['Home', 'Customers'];
      case 'Suppliers':
        return ['Home', 'Suppliers'];
      case 'PurchaseOrders':
        return ['Home', 'Purchase Orders'];
      case 'Shipments':
        return ['Home', 'Shipments'];
      case 'SupplierContracts':
        return ['Home', 'Supplier Contracts'];
      case 'SupplierPerformance':
        return ['Home', 'Supplier Performance'];
      case 'Logout':
        return ['Home', 'Logout'];
      default:
        return ['Home'];
    }
  };

  // Render Components Dynamically
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard': return <div>Dashboard Content</div>;
      case 'Orders': return <OrdersPage />;
      case 'OrderDetails': return <OrderDetailsPage />;
      case 'Customers': return <CustomersPage />;
      case 'Suppliers': return <SuppliersPage />;
      case 'PurchaseOrders': return <PurchaseOrdersPage />;
      case 'PurchaseOrderDetails': return <PurchaseOrderDetailsPage />;
      case 'Shipments': return <ShipmentsPage />;
      case 'ShipmentDetails': return <ShipmentDetailsPage />;
      case 'SupplierContracts': return <SupplierContractsPage />;
      case 'SupplierPerformance': return <SupplierPerformancePage />;
      case 'Logout': return <div>Logout Content</div>;
      default: return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'white',
            color: 'black',
            paddingTop: '20px',
            overflowY: 'auto',  // Ensure the sidebar can scroll while hiding scrollbar
            scrollbarWidth: 'none', // Hide scrollbar in the sidebar
            '&::-webkit-scrollbar': {
              display: 'none',  // Hide scrollbar in the sidebar
            },
          },
        }}
      >
        {/* Avatar and User Name */}
        <div className="text-center">
          <Avatar sx={{ width: 56, height: 56, margin: '0 auto', backgroundColor: '#8e44ad' }}>A</Avatar>
          <Typography variant="h6" className="mt-2">Admin</Typography>
        </div>

        <Divider sx={{ marginY: 2 }} />

        {/* Sidebar Navigation */}
        <List>
          <ListItem button onClick={() => setActiveComponent('Dashboard')}>
            <ListItemIcon>
              <MdDashboard className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => setActiveComponent('Orders')}>
            <ListItemIcon>
              <FaBox className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

          <Divider sx={{ marginY: 2 }} />

          {/* Customers Accordion */}
          <ListItem button onClick={handleToggleCustomers}>
            <ListItemIcon>
              <FaUserAlt className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Customers" />
            {openCustomers ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
          <Collapse in={openCustomers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => setActiveComponent('Customers')}>
                <ListItemText primary="View Customers" sx={{ paddingLeft: 4 }} />
              </ListItem>
              <ListItem button onClick={() => setActiveComponent('NewCustomer')}>
                <ListItemText primary="Add New Customer" sx={{ paddingLeft: 4 }} />
              </ListItem>
            </List>
          </Collapse>

          <Divider sx={{ marginY: 2 }} />

          {/* Suppliers Accordion */}
          <ListItem button onClick={handleToggleSuppliers}>
            <ListItemIcon>
              <FaTruck className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Suppliers" />
            {openSuppliers ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
          <Collapse in={openSuppliers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => setActiveComponent('Suppliers')}>
                <ListItemText primary="View Suppliers" sx={{ paddingLeft: 4 }} />
              </ListItem>
              <ListItem button onClick={() => setActiveComponent('NewSupplier')}>
                <ListItemText primary="Add New Supplier" sx={{ paddingLeft: 4 }} />
              </ListItem>
            </List>
          </Collapse>

          <Divider sx={{ marginY: 2 }} />

          {/* Purchase Orders */}
          <ListItem button onClick={() => setActiveComponent('PurchaseOrders')}>
            <ListItemIcon>
              <FaCalendarCheck className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Purchase Orders" />
          </ListItem>

          <ListItem button onClick={() => setActiveComponent('PurchaseOrderDetails')}>
            <ListItemIcon>
              <FaClipboardList className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Purchase Order Details" />
          </ListItem>

          <Divider sx={{ marginY: 2 }} />

          {/* Shipments */}
          <ListItem button onClick={() => setActiveComponent('Shipments')}>
            <ListItemIcon>
              <FaTruck className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Shipments" />
          </ListItem>

          <ListItem button onClick={() => setActiveComponent('ShipmentDetails')}>
            <ListItemIcon>
              <FaClipboardList className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Shipment Details" />
          </ListItem>

          <Divider sx={{ marginY: 2 }} />

          {/* Settings */}
          <ListItem button onClick={() => setActiveComponent('Settings')}>
            <ListItemIcon>
              <IoSettings className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

          <Divider sx={{ marginY: 2 }} />

          {/* Logout */}
          <ListItem button onClick={() => setActiveComponent('Logout')}>
            <ListItemIcon>
              <CiLogout className="text-gray-800" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 bg-slate-100 p-8 overflow-y-auto main-content">
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" className="mb-4">
          {getBreadcrumbs().map((breadcrumb, index) => (
            <Typography key={index} color="textPrimary">{breadcrumb}</Typography>
          ))}
        </Breadcrumbs>

        {/* Render Active Component */}
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
