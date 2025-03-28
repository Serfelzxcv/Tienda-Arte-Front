import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from '../../components/main_layout/MainLayout.module.css';
import { Producto } from './product';


const AddProductDialog = ({ onClose, onProductAdded }: { onClose: () => void, onProductAdded: (producto: Producto) => void }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('CUADRO');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('stock', stock);
    if (imagen) formData.append('imagen', imagen);

    try {
      const response = await axios.post('http://localhost:8000/api/productos/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onProductAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  return (
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
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductDialog;
