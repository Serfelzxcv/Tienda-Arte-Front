import styles from '../../components/MainLayout/MainLayout.module.css';
import { Producto } from './product';

const ProductCard = ({ producto, onDelete }: { producto: Producto; onDelete: (id: number) => void }) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
      <div className={styles.imageOverlay}>
        <p className={styles.overlayDescription}>{producto.descripcion}</p>
      </div>
    </div>
    <div className={styles.cardContent}>
      <h3>{producto.nombre}</h3>
      <div className={styles.cardFooter}>
        <span className={styles.cardPrice}>${producto.precio}</span>
        <span className={styles.cardStock}>Stock: {producto.stock}</span>
      </div>
      <button className={styles.deleteButton} onClick={() => onDelete(producto.id)}>Eliminar</button>
    </div>
  </div>
);

export default ProductCard;
