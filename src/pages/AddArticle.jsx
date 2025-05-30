import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Gagal menambahkan artikel');

      alert('✅ Artikel berhasil ditambahkan!');
      navigate('/'); // ✅ arahkan ke halaman utama
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tambah Artikel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul Artikel</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Konten</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            cols={40}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
