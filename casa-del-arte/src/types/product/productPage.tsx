// App.tsx
import React from 'react';
import ProductoForm from './ProductoForm';
import ProductoList from './ProductoList';


const ProductPage: React.FC = () => {
  return (
    <div className="App">
      <h1>Tienda de Arte</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <ProductoForm />
        </div>
        <div style={{ flex: 2 }}>
          <ProductoList />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;