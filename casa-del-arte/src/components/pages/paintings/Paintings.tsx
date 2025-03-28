import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from '../../main_layout/MainLayout.module.css';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  imagen?: string;
}

const PaintingContent = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('CUADRO');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos/');
        setProductos(response.data);
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('stock', stock);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/productos/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Producto creado:', response.data);
      closeDialog();
      setProductos([...productos, response.data]);
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Painting</h1>
        <button className={styles.addButton} onClick={openDialog}>añadir +</button>
      </div>

      <div className={styles.gridContainer}>
        {productos.map(producto => (
          <div key={producto.id} className={styles.card}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoria}</p>
            <p>Stock: {producto.stock}</p>
            {producto.imagen && <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />}
          </div>
        ))}
      </div>

      {showDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h2>Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <textarea placeholder="Descripción" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
              <input type="number" placeholder="Precio" required value={precio} onChange={(e) => setPrecio(e.target.value)} />

              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="CUADRO">Cuadro</option>
                <option value="ESCULTURA">Escultura</option>
                <option value="DISCO">Disco</option>
              </select>

              <input type="number" placeholder="Stock" required value={stock} onChange={(e) => setStock(e.target.value)} />
              <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setImagen(e.target.files ? e.target.files[0] : null)} />

              <button type="submit">Crear Producto</button>
              <button type="button" onClick={closeDialog}>Cerrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintingContent;
