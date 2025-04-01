// import styles from '../../MainLayout/MainLayout.module.css';

// const SculpturesContent = () => {
//   return (
//     <div className={styles.pageContent}>
//       <h1 className={styles.pageTitle}>Sculptures</h1>
//       <div className={styles.gridContainer}>
//         {/* Contenido específico de cuadros */}
//       </div>
//     </div>
//   );
// };

// export default SculpturesContent;
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../MainLayout/MainLayout.module.css';

import AddProductDialog from '../../../types/product/ProductoForm';
import ProductCard from '../../../types/product/ProductCard';
import { Producto } from '../../../types/product/product';

const SculpturesContent = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/productos/esculturas/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(response.data);
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const addProductToList = (producto: Producto) => {
    setProductos([...productos, producto]);
  };

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:8000/api/productos/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filtra la lista para eliminar el producto eliminado
      setProductos(productos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Esculturas</h1>
        <button className={styles.addButton} onClick={() => setShowDialog(true)}>añadir +</button>
      </div>

      <div className={styles.gridContainer}>
        {productos.map(producto => (
          <ProductCard key={producto.id} producto={producto} onDelete={deleteProduct} />
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

export default SculpturesContent;
