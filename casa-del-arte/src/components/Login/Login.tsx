import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import loginImage from '../../assets/login_image.png';
import { login as loginService } from '../services/auth_service';
import { useAuth } from '../../context/AuthContext';
import { Producto } from '../../types/product/product';
import { useCart } from '../../context/CartContext';


const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [savedCartItems, setSavedCartItems] = useState<Producto[]>([]);
  const { setCartItems } = useCart()

  // Hook personalizado (o contexto) para manejar la autenticación.
  const { login } = useAuth();

  // Efecto para mostrar el estado actualizado de savedCartItems
  useEffect(() => {
    console.log("savedCartItems (actualizado):", savedCartItems);
  }, [savedCartItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Autenticar con el backend
      const response = await loginService(username, password);
      console.log('Respuesta del backend:', response);
      login(response.access, response.user);
      await loadSavedCart();

    } catch (error) {
      setError('Credenciales incorrectas o error de conexión');
    }
  };

  const loadSavedCart = async () => {
    try {
      console.log("Cargando carrito guardado...");
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8000/carrito/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        console.error('Error al obtener el carrito guardado');
        return;
      }

      const data = await response.json();
      const mappedItems = data.items.map((itemCarrito: any) => ({
        // Tomamos los campos del producto
        id: itemCarrito.producto.id,
        nombre: itemCarrito.producto.nombre,
        precio: itemCarrito.producto.precio,
        descripcion: itemCarrito.producto.descripcion,
        categoria: itemCarrito.producto.categoria,
        
        // Importante: mantenemos la cantidad
        cantidad: itemCarrito.cantidad,
        
        // Opcional: si quisieras guardar itemCarrito.id en algún campo:
        carritoItemId: itemCarrito.id,
      }));

      // data.items es el array de productos del carrito 
      console.log("Items recuperados del servidor:", data.items);

      // Guardamos en el estado local
      setSavedCartItems(data.items);
      setCartItems(mappedItems);

    } catch (error) {
      console.error('Error al hacer la petición GET del carrito:', error);
    }
  };

  return (
    <div className={styles.splitContainer}>
      {/* Sección de la imagen */}
      <div className={styles.imageSection}>
        <div className={styles.imageOverlay}></div>
        <img src={loginImage} alt="Arte" className={styles.loginImage} />
        <div className={styles.imageContent}></div>
      </div>

      {/* Sección del login */}
      <div className={styles.loginSection}>
        <div className={styles.loginBox}>
          <div className={styles.logoContainer}>
            <h1 className={styles.loginTitle}>La casa del Arte</h1>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" className={styles.loginButton}>
              Ingresar
            </button>

            <div className={styles.additionalOptions}>
              <a href="#" className={styles.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </a>
              <p className={styles.registerText}>
                ¿No tienes cuenta?{' '}
                <Link to="/register" className={styles.registerLink}>
                  Regístrate
                </Link>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
