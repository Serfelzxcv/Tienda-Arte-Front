
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import styles from './AppBar.module.css';

const AppBar = () => {
  const { logout } = useAuth();

  return (
    <header className={styles.appBar}>
      <div className={styles.appBarContent}>
        <h2>La Casa del Arte</h2>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={logout}
          className={styles.logoutButton}
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};

export default AppBar;