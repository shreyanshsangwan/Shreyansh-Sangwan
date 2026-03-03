import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, mockOrders } from '../data/mockData';

interface AppContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  user: { name: string; phone: string } | null;
  login: (phone: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const login = (phone: string) => {
    setUser({ name: 'Demo User', phone });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ orders, addOrder, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
