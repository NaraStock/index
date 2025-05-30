import React, { useState, useEffect } from 'react'
import heroImage from './assets/homenarastock.png'
import Prediksi from './prediksi'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPrediksi, setShowPrediksi] = useState(false)
  const [articles, setArticles] = useState([]) // <- Tambahan state untuk artikel

  const toggleMenu = () => setMenuOpen(!menuOpen)
  

  // ✅ Fetch artikel dari backend
  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return; // ⛔ Stop kalau belum login
  }

  const fetchArticles = async () => {
    try {
      const res = await fetch('http://localhost:5000/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error('Gagal fetch artikel:', err);
    }
  };

  fetchArticles();
}, []);

  if (showPrediksi) return <Prediksi onBack={handleBack} />


const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;

  try {
    const res = await fetch(`http://localhost:5000/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Gagal menghapus artikel');

    alert('✅ Artikel berhasil dihapus');
    setArticles(articles.filter(article => article.id !== id));
  } catch (err) {
    alert('❌ ' + err.message);
  }
};

const handleTambahArtikel = () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => navigate('/artikel/tambah'));
  } else {
    navigate('/artikel/tambah');
  }
};

const handleEdit = (id) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => navigate(`/artikel/edit/${id}`));
  } else {
    navigate(`/artikel/edit/${id}`);
  }
};

const handleOpenPrediksi = () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => setShowPrediksi(true));
  } else {
    setShowPrediksi(true);
  }
};

const handleBack = () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => setShowPrediksi(false));
  } else {
    setShowPrediksi(false);
  }
};



  return (
    <>
      <header>
        <div className="logo" aria-label="Narastock logo">narastock</div>
        <nav className={menuOpen ? 'open' : ''} aria-label="Primary Navigation">
          <a href="#">Home</a>
          <a href="#">Fitur</a>
          <a href="#">Education</a>
          <a href="#">Prediksi</a>
          <a href="#">Tentang</a>
          <a href="#">Contact</a>
          <button className="subscribe-btn">Subscribe</button>
        </nav>
        <button
          className={`menu-toggle${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}>
          <span></span><span></span><span></span>
        </button>
      </header>

      <main>
        <h1>Prediksi Pasar Saham <br /> Mingguan Untuk</h1>
        <h2>Investor Pemula</h2>
        <p>Mudahkan keputusan investasi Anda dengan prediksi yang sederhana, akurat, dan mudah dipahami.</p>

        <div className="buttons">
          <button className="btn-primary" onClick={handleOpenPrediksi}>Mulai Prediksi</button>
          <button className="btn-primary">Pelajari Fitur</button>
        </div>

        <img src={heroImage} alt="Stock monitor" className="hero-image" draggable={false} loading="lazy" />

        {/* 🔽 Artikel tampil di bawah gambar */}
        <section style={{ marginTop: '2rem' }}>
          <h2>Artikel Terbaru</h2>
          {localStorage.getItem('role') === 'admin' && (
  <button onClick={handleTambahArtikel}>Tambah Artikel</button>
)}
         <ul>
  {articles.map(article => (
    <li key={article.id}>
      <h3>{article.title}</h3>
      <p>{article.content}</p>
      {localStorage.getItem('role') === 'admin' && (
        <>
          <button onClick={() => handleEdit(article.id)}>Edit</button>
          <button onClick={() => handleDelete(article.id)}>Hapus</button>
        </>
      )}
    </li>
  ))}
</ul>
        </section>
      </main>
    </>
  )
}

export default App
