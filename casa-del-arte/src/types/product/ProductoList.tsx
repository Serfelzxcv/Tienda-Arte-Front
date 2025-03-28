// ProductCard.tsx
import { Producto } from '../../components/pages/paintings/Paintings';
import styles from '../../components/main_layout/MainLayout.module.css';

const ProductCard = ({ producto }: { producto: Producto }) => (
  <div className={styles.card}>
    <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
    <div className={styles.cardContent}>
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardPrice}>${producto.precio}</span>
        <span className={styles.cardStock}>Stock: {producto.stock}</span>
      </div>
    </div>
  </div>
);

export default ProductCard;