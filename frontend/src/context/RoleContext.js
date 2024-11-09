// src/context/RoleContext.js
import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('Admin');  // Default to 'Admin' (or get from localStorage or API)

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
