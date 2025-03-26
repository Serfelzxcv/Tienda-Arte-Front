import MainLayout from "../../main_layout/MainLayout";
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <MainLayout>
      <Outlet /> {/* Esto renderizará el contenido dinámico */}
    </MainLayout>
  );
};

export default Home;