import { useState } from 'react';
import styles from '../../main_layout/MainLayout.module.css';

const PaintingContent = () => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    const token = localStorage.getItem('authToken');
    setShowDialog(true);
    console.log("Token:", token);

  }
  const closeDialog = () => setShowDialog(false);

  return (
    <div className={styles.pageContent}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Painting</h1>
        <button className={styles.addButton} onClick={openDialog}>
          añadir +
        </button>
      </div>

      <div className={styles.gridContainer}>
        {/* Contenido específico de cuadros */}
      </div>

      {showDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogBox}>
            <h2>Nuevo cuadro</h2>
            {/* Aquí va el contenido específico del diálogo */}
            <button className={styles.closeButton} onClick={closeDialog}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintingContent;
