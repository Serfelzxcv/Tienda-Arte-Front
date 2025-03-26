import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';
import registerImage from '../../assets/login_image.png';
import { register } from '../services/auth_service';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Usamos formData directamente que contiene todos los campos
      await register(formData);
      console.log('Registro exitoso:', formData);
      navigate('/login'); // Redirige al login después del registro
    } catch (error) {
      console.error('Error en el registro:', error);
      setError(error instanceof Error ? error.message : 'Error en el registro');
    }
  };

  return (
    <div className={styles.splitContainer}>
      {/* Sección de la imagen */}
      <div className={styles.imageSection}>
        <div className={styles.imageOverlay}></div>
        <img src={registerImage} alt="Arte" className={styles.loginImage} />
        <div className={styles.imageContent}>
        </div>
      </div>

      {/* Sección del registro */}
      <div className={styles.loginSection}>
        <div className={styles.loginBox}>
          <div className={styles.logoContainer}>
            <h1 className={styles.loginTitle}>Crear cuenta</h1>
          </div>
          
          {error && <p className={styles.errorMessage}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Usuario*</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                required
                minLength={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="first_name">Nombre</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Opcional"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="last_name">Apellido</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Opcional"
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Registrarse
            </button>
          </form>

          <div className={styles.additionalOptions}>
            <p className={styles.registerText}>
              ¿Ya tienes cuenta? <Link to="/login" className={styles.registerLink}>Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;