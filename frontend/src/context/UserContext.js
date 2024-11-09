// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || 'Guest',
    profileImage: localStorage.getItem('profileImage') || '', // For storing profile image
  });

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    setUser({ username: '', profileImage: '' });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
