// components/ProductoForm.tsx
import React, { useState } from 'react';
;

import { Categoria } from '../enums/category_enums';
import { Producto } from './product';
import ProductoService from './product_service';

const ProductoForm: React.FC = () => {
  const [producto, setProducto] = useState<Omit<Producto, 'id'>>({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: null,
    categoria: Categoria.CUADRO,
    stock: 0,
    archivo_audio: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProducto({
        ...producto,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio.toString());
      formData.append('categoria', producto.categoria);
      formData.append('stock', producto.stock.toString());
      
      if (producto.imagen) {
        formData.append('imagen', producto.imagen as File);
      }
      
      if (producto.categoria === Categoria.DISCO && producto.archivo_audio) {
        formData.append('archivo_audio', producto.archivo_audio as File);
      }

      await ProductoService.create(formData);
      setSuccess(true);
      // Reset form
      setProducto({
        nombre: '',
        descripcion: '',
        precio: 0,
        imagen: null,
        categoria: Categoria.CUADRO,
        stock: 0,
        archivo_audio: null,
      });
    } catch (err) {
      setError('Error al crear el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Producto</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Producto creado exitosamente!</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label>Categoría:</label>
          <select
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            required
          >
            {Object.values(Categoria).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            name="imagen"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        
        {producto.categoria === Categoria.DISCO && (
          <div>
            <label>Archivo de Audio (para discos):</label>
            <input
              type="file"
              name="archivo_audio"
              onChange={handleFileChange}
              accept="audio/*"
            />
          </div>
        )}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;