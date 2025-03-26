import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  styled 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Palette as PaintingsIcon,
  Terrain as SculpturesIcon,
  Album as AlbumsIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import styles from './Sidebar.module.css';

// Styled component para el ícono activo
const ActiveIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const Sidebar = () => {
  const location = useLocation();
  
  // Maneja la ruta activa
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const menuItems = [
    {
      path: 'paintings',
      name: 'Pinturas',
      icon: <PaintingsIcon />,
      active: isActive('paintings')
    },
    {
      path: 'sculptures',
      name: 'Esculturas',
      icon: <SculpturesIcon />,
      active: isActive('sculptures')
    },
    {
      path: 'albums',
      name: 'Discos',
      icon: <AlbumsIcon />,
      active: isActive('albums')
    }
  ];

  return (
    <nav className={styles.sidebar}>
      <List>
        <ListItemButton className={styles.sidebarTitle}>
          <ListItemText 
            primary="Galería de Arte" 
            primaryTypographyProps={{ 
              variant: 'h6',
              className: styles.titleText
            
            }}
          />
        </ListItemButton>
        <Divider className={styles.divider} />
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={`/home/${item.path}`}
            className={`${styles.listItem} ${item.active ? styles.active : ''}`}
          >
            {item.active ? (
              <ActiveIcon>{item.icon}</ActiveIcon>
            ) : (
              <ListItemIcon className={styles.icon}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{
                fontWeight: item.active ? 'medium' : 'regular'
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </nav>
  );
};

export default Sidebar;