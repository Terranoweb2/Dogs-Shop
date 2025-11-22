
import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/lib/localStorage';
import { Order } from '@/types/dog';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getFromLocalStorage<Order[]>(STORAGE_KEYS.ORDERS, []));
  }, []);

  const addOrder = (order: Order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    saveToLocalStorage(STORAGE_KEYS.ORDERS, newOrders);
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    const newOrders = orders.map(order =>
      order.id === orderId ? { ...order, ...updates } : order
    );
    setOrders(newOrders);
    saveToLocalStorage(STORAGE_KEYS.ORDERS, newOrders);
  };

  const deleteOrder = (orderId: string) => {
    const newOrders = orders.filter(order => order.id !== orderId);
    setOrders(newOrders);
    saveToLocalStorage(STORAGE_KEYS.ORDERS, newOrders);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById
  };
}
