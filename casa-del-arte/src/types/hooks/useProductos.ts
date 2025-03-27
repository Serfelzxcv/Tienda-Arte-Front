// hooks/useProductos.ts
import { useState, useEffect } from 'react';
import ProductoService from '../product/product_service';
import { Producto, ProductoResponse } from '../product/product';
import { Categoria } from '../enums/category_enums';


const useProductos = () => {
  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await ProductoService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const crearProducto = async (producto: Producto) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio.toString());
      formData.append('categoria', producto.categoria);
      formData.append('stock', producto.stock.toString());
      
      if (producto.imagen instanceof File) {
        formData.append('imagen', producto.imagen);
      }
      
      if (producto.categoria === Categoria.DISCO && producto.archivo_audio instanceof File) {
        formData.append('archivo_audio', producto.archivo_audio);
      }

      const nuevoProducto = await ProductoService.create(formData);
      setProductos([...productos, nuevoProducto]);
      return nuevoProducto;
    } catch (err) {
      setError('Error al crear el producto');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    crearProducto,
    fetchProductos,
  };
};

export default useProductos;