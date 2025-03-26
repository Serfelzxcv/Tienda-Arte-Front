import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import loginImage from '../../assets/login_image.png';
import { login } from '../services/auth_service';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(username, password);
      // Guarda el token (usando localStorage, cookies o contexto)
      localStorage.setItem('authToken', response.token);
      // Redirige al home
      navigate('/home');
    } catch (error) {
      setError('Credenciales incorrectas o error de conexión');
    }
  };

  return (
    <div className={styles.splitContainer}>
      {/* Sección de la imagen */}
      <div className={styles.imageSection}>
        <div className={styles.imageOverlay}></div>
        <img src={loginImage} alt="Arte" className={styles.loginImage} />
        <div className={styles.imageContent}>
        </div>
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
              <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
              <p className={styles.registerText}>
                ¿No tienes cuenta? 
                <Link to="/register" className={styles.registerLink}>Regístrate</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;