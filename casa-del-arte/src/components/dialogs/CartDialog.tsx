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
    Divider,
    Box
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
    const formatPrice = (price: any) => {
      const numericPrice = typeof price === 'string' ? parseFloat(price) : Number(price);
      return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => {
        const price = typeof item.precio === 'string' ? parseFloat(item.precio) : Number(item.precio);
        return total + (isNaN(price) ? 0 : price);
      }, 0);
    };

    const handleCheckout = async () => {
        try {
          const token = localStorage.getItem('authToken'); // Suponiendo que el usuario está autenticado con JWT
          const response = await fetch('http://localhost:8000/api/ordenes/crear/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert("Compra realizada con éxito.");
            onClose(); // Cierra el modal después de la compra
          } else {
            alert(`Error: ${data.error}`);
          }
        } catch (error) {
          console.error("Error al procesar el pago:", error);
          alert("Hubo un error al procesar el pago.");
        }
      };
      
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography component="span">Carrito de Compras</Typography>
            <Typography variant="subtitle1" component="span">
              {cartItems.length} {cartItems.length === 1 ? 'ítem' : 'ítems'}
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {cartItems.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1">Tu carrito está vacío</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={onClose}
              >
                Seguir comprando
              </Button>
            </Box>
          ) : (
            <List>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`}>
                  <ListItem>
                    <ListItemText
                      primary={item.nombre}
                      primaryTypographyProps={{ 
                        component: 'div', // Asegura que no sea un <p>
                        fontWeight: 'medium' 
                      }}
                      secondary={
                        <Typography 
                          component="div" // Evita que se genere un <p>
                          variant="body2" 
                          color="text.secondary"
                          display="block"
                        >
                          <Typography component="span" display="block">
                            ${formatPrice(item.precio)}
                          </Typography>
                          {item.descripcion && (
                            <Typography 
                              component="span" 
                              variant="body2" 
                              color="text.secondary"
                              display="block"
                            >
                              {item.descripcion}
                            </Typography>
                          )}
                        </Typography>
                      }
                    />
                    
                    <IconButton 
                      edge="end" 
                      onClick={() => onRemove(item.id)}
                      aria-label="eliminar"
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </div>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <ListItem sx={{ pt: 2 }}>
                <ListItemText 
                  primary="Total" 
                  primaryTypographyProps={{ 
                    variant: 'h6', 
                    fontWeight: 'bold',
                    component: 'div'
                  }}
                />
                <Typography variant="h6" fontWeight="bold" component="span">
                  ${calculateTotal().toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            sx={{ mr: 2 }}
          >
            {cartItems.length > 0 ? 'Seguir comprando' : 'Cerrar'}
          </Button>
          
          {cartItems.length > 0 && (
            <Button 
            variant="contained" 
            color="primary"
            size="large"
            fullWidth
            sx={{ flex: 1 }}
            onClick={handleCheckout}
            >
            Proceder al pago (${calculateTotal().toFixed(2)})
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CartDialog;
