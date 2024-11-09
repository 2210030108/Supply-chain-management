// src/pages/DashboardRouter.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import SupplierDashboard from './SupplierDashboard';

const DashboardRouter = () => {
  const { role } = useRole();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <Switch>
        {role === 'Admin' && <Route path="/" exact component={AdminDashboard} />}
        {role === 'Customer' && <Route path="/" exact component={CustomerDashboard} />}
        {role === 'Supplier' && <Route path="/" exact component={SupplierDashboard} />}
      </Switch>
    </div>
  );
};

export default DashboardRouter;
