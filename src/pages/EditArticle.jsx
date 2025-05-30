import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Gagal memuat artikel');
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error('Gagal memperbarui artikel');
      alert('✅ Artikel berhasil diperbarui!');
      navigate('/');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Artikel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul Artikel</label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Konten</label><br />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} cols={40} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditArticle;
