import { useState } from 'react';
import { Button, Badge, IconButton, Avatar, Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../context/AuthContext';
import styles from './AppBar.module.css';
import { useCart } from '../../context/CartContext';
import CartDialog from '../dialogs/CartDialog';

const AppBar = () => {
  const { user, logout } = useAuth();
  const { cartItems, cartItemsCount, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleRemoveItem = (productoId: number) => {
    removeFromCart(productoId);
  };

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
                <IconButton 
                  color="inherit" 
                  className={styles.cartIcon}
                  onClick={handleCartClick}
                  aria-label="carrito de compras"
                >
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

      {/* Diálogo del carrito */}
      <CartDialog 
        open={isCartOpen} 
        onClose={handleCloseCart} 
        cartItems={cartItems}
        onRemove={handleRemoveItem}
      />
    </header>
  );
};

export default AppBar;