import styles from '../../main_layout/MainLayout.module.css';

const PaintingsContent = () => {
  return (
    <div className={styles.pageContent}>
      <h1 className={styles.pageTitle}>Cuadros</h1>
      <div className={styles.gridContainer}>
        {/* Contenido específico de cuadros */}
      </div>
    </div>
  );
};

export default PaintingsContent;