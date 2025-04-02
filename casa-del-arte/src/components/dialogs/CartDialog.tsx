// components/CartDialog.tsx
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Typography,
    IconButton,
    Divider
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { Producto } from '../../types/product/product';
  
  interface CartDialogProps {
    open: boolean;
    onClose: () => void;
    cartItems: Producto[];
    onRemove: (productoId: number) => void;
  }
  
  const CartDialog = ({ open, onClose, cartItems, onRemove }: CartDialogProps) => {
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.precio, 0);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Carrito de Compras</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <Typography variant="body1" sx={{ py: 2 }}>Tu carrito está vacío</Typography>
          ) : (
            <List>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`}>
                  <ListItem 
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => onRemove(item.id)}
                        aria-label="eliminar"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText 
                      primary={item.nombre} 
                      secondary={`$${item.precio.toFixed(2)}`} 
                    />
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </div>
              ))}
              <Divider sx={{ my: 2 }} />
              <ListItem>
                <ListItemText 
                  primary="Total" 
                  primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                  secondary={`$${calculateTotal().toFixed(2)}`} 
                  secondaryTypographyProps={{ variant: 'h6' }}
                />
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
          {cartItems.length > 0 && (
            <Button variant="contained" color="primary">
              Comprar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CartDialog;