import React from 'react';
import useProductos from '../hooks/useProductos';

const ProductoList: React.FC = () => {
  const { productos, loading, error } = useProductos();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoria}</p>
            <p>Stock: {producto.stock}</p>
            {producto.imagen && (
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                style={{ maxWidth: '200px' }} 
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoList;