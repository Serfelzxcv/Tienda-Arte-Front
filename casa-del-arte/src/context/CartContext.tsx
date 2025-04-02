// contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Producto } from '../types/product/product';

interface CartContextType {
  cartItems: Producto[];
  addToCart: (producto: Producto) => void;
  removeFromCart: (productoId: number) => void;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Producto[]>([]);

  const addToCart = (producto: Producto) => {
    setCartItems(prevItems => [...prevItems, producto]);
  };
  const removeFromCart = (productoId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productoId));
  };
  
  const cartItemsCount = cartItems.length;
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};