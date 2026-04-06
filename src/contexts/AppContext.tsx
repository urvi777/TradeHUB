import React, { createContext, useContext, useState, useCallback } from "react";
import { products as initialProducts, chatThreads as initialChats, orders as initialOrders, currentUser, Product, ChatThread, Order, ChatMessage } from "@/data/mockData";

interface AppState {
  products: Product[];
  chatThreads: ChatThread[];
  orders: Order[];
  toggleSaved: (id: string) => void;
  addProduct: (product: Product) => void;
  sendMessage: (threadId: string, text: string) => void;
  startChat: (product: Product) => string;
  placeOrder: (product: Product) => void;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [chatThreads, setChatThreads] = useState(initialChats);
  const [orders, setOrders] = useState(initialOrders);

  const toggleSaved = useCallback((id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts(prev => [product, ...prev]);
  }, []);

  const sendMessage = useCallback((threadId: string, text: string) => {
    const msg: ChatMessage = { id: `m-${Date.now()}`, senderId: "me", text, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setChatThreads(prev => prev.map(t => t.id === threadId ? { ...t, messages: [...t.messages, msg], lastMessage: text, lastMessageTime: "Just now", unread: 0 } : t));
  }, []);

  const startChat = useCallback((product: Product) => {
    const existing = chatThreads.find(t => t.product.id === product.id);
    if (existing) return existing.id;
    const newThread: ChatThread = {
      id: `c-${Date.now()}`,
      product,
      otherUser: product.seller,
      messages: [],
      lastMessage: "",
      lastMessageTime: "Now",
      unread: 0,
    };
    setChatThreads(prev => [newThread, ...prev]);
    return newThread.id;
  }, [chatThreads]);

  const placeOrder = useCallback((product: Product) => {
    const order: Order = { id: `o-${Date.now()}`, product, status: "paid", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
    setOrders(prev => [order, ...prev]);
  }, []);

  return (
    <AppContext.Provider value={{ products, chatThreads, orders, toggleSaved, addProduct, sendMessage, startChat, placeOrder }}>
      {children}
    </AppContext.Provider>
  );
};
