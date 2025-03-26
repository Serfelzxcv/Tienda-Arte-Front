import React from 'react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Bienvenido a La casa del Arte</h1>
      <p>Has iniciado sesión correctamente.</p>
    </div>
  );
};

export default Home;