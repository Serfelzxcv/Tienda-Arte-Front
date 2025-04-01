import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string | null;
  };
  cantidad: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productoId: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/carrito/');
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productoId: number) => {
    try {
      await axios.post('/api/carrito/agregar/', { producto_id: productoId });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await axios.delete(`/api/carrito/items/${itemId}/`);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.patch(`/api/carrito/items/${itemId}/`, { cantidad: newQuantity });
      setCartItems(prev =>
        prev.map(item => 
          item.id === itemId ? { ...item, cantidad: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad), 
      0
    );
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        syncCart: fetchCart
      }}
    >
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