import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../MainLayout/MainLayout.module.css';
import AddProductDialog from '../../../types/product/ProductoForm';
import ProductCard from '../../../types/product/ProductCard';
import { Producto } from '../../../types/product/product';
import { useCart } from '../../../context/CartContext';

const PaintingContent = () => {
  const { addToCart } = useCart(); // Función del contexto para actualizar el carrito local
  const [showDialog, setShowDialog] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/productos/cuadros/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(response.data);
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      }
    };

    fetchProductos();
  }, []);

  // Función ajustada para agregar producto al carrito:
  // Esta función se ejecuta cuando el usuario hace clic en "Añadir al carrito"
  const addProductToList = async (producto: Producto) => {
    try {
      const token = localStorage.getItem('authToken');
      // Llamada al endpoint para guardar el ítem en la BD
      const response = await axios.post(
        'http://localhost:8000/api/carrito/agregar/',
        {
          items: [{ producto_id: producto.id, cantidad: 1 }],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (response.status === 201 || response.status === 200) {
        console.log(`Producto ${producto.nombre} agregado al carrito en el backend.`);
        // Actualizamos el estado global (contexto) para reflejar el cambio localmente
        addToCart(producto);
      } else {
        alert('Error al agregar al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:8000/api/productos/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(productos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Pinturas</h1>
        <button className={styles.addButton} onClick={() => setShowDialog(true)}>
          añadir +
        </button>
      </div>

      <div className={styles.gridContainer}>
        {productos.map(producto => (
          <ProductCard 
            key={producto.id} 
            producto={producto} 
            onDelete={deleteProduct} 
            onAddToCart={addProductToList}  // Se pasa la función ajustada
          />
        ))}
      </div>

      {showDialog && (
        <AddProductDialog 
          onClose={() => setShowDialog(false)} 
          onProductAdded={addProductToList}
        />
      )}
    </div>
  );
};

export default PaintingContent;
