import { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import styles from '../../main_layout/MainLayout.module.css';

const PaintingsContent = () => {
  const [search, setSearch] = useState('');
  const paintings = [
    { id: 1, title: 'Pintura 1', price: '$100', img: 'https://picsum.photos/200?random=1' },
    { id: 2, title: 'Pintura 2', price: '$150', img: 'https://picsum.photos/200?random=2' },
    { id: 3, title: 'Pintura 3', price: '$120', img: 'https://picsum.photos/200?random=3' },
    { id: 4, title: 'Pintura 4', price: '$90', img: 'https://picsum.photos/200?random=4' }
  ];

  return (
    <div className={styles.pageContent}>
      <h1 className={styles.pageTitle} style={{ textAlign: 'center' }}>Cuadros</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <div style={{ position: 'relative', flexGrow: 1, maxWidth: '300px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cuadros..."
            style={{ width: '100%', padding: '8px 32px 8px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <FaSearch style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
        </div>

        <button style={{
          marginLeft: '10px',
          padding: '8px 12px',
          borderRadius: '5px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <FaPlus style={{ marginRight: '5px' }} />
          Añadir
        </button>
      </div>

      <div className={styles.gridContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {paintings.map((item) => (
          <div key={item.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <img src={item.img} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3 style={{ margin: '10px 0 5px' }}>{item.title}</h3>
            <p style={{ margin: '0 0 10px', color: '#555' }}>{item.price}</p>
            <button style={{
              padding: '5px 10px',
              fontSize: '14px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}>
              <FaPlus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaintingsContent;
