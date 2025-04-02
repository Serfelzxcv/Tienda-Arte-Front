import { Button, Badge, IconButton, Avatar, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../context/AuthContext';
import styles from './AppBar.module.css';
import { useCart } from '../../context/CartContext';

const AppBar = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart(); // Desestructuración correcta
  
  return (
    <header className={styles.appBar}>
      <Box className={styles.appBarContent}>
        <Typography variant="h6" className={styles.title}>
          La Casa del Arte
        </Typography>

        <Box className={styles.rightSection}>
          {user && (
            <Box className={styles.userSection}>
              <Box className={styles.userInfo}>
                <Avatar className={styles.avatar}>
                  {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                </Avatar>
                <Box className={styles.userText}>
                  <Typography variant="subtitle2" className={styles.userName}>
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="caption" className={styles.userBalance}>
                    ${user.dinero.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box className={styles.cartContainer}>
                <IconButton color="inherit" className={styles.cartIcon}>
                  <Badge badgeContent={cartItemsCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Box>
          )}

          <Box className={styles.logoutContainer}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={logout}
              className={styles.logoutButton}
              size="small"
            >
              Salir
            </Button>
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default AppBar;