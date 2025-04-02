import { createContext, useState, useContext } from "react";
import { Producto } from "../types/product/product";

interface CartContextType {
  cartItems: Producto[];
  addToCart: (producto: Producto) => void;
  removeFromCart: (productoId: number) => void;
  cartItemsCount: number;
  setCartItems: (items: Producto[]) => void;  // <--- AGREGAR
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, _setCartItems] = useState<Producto[]>([]);

  // Para exponer setCartItems de forma segura:
  const setCartItems = (items: Producto[]) => {
    _setCartItems(items);
  };

  const addToCart = (producto: Producto) => {
    _setCartItems(prevItems => [...prevItems, producto]);
  };

  const removeFromCart = (productoId: number) => {
    _setCartItems(prevItems => prevItems.filter(item => item.id !== productoId));
  };

  const cartItemsCount = cartItems.length;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      cartItemsCount,
      setCartItems // <--- Asegúrate de incluirlo en el "value"
    }}>
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
