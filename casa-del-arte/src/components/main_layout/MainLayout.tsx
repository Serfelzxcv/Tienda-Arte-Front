
import AppBar from '../layout/AppBar';
import Sidebar from '../layout/Sidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.container}>
      <AppBar />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;