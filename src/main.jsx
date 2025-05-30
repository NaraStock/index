import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import AddArticle from './pages/AddArticle.jsx';
import EditArticle from './pages/EditArticle.jsx';

const AppWithTransition = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artikel/tambah" element={<AddArticle />} />
      <Route path="/artikel/edit/:id" element={<EditArticle />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppWithTransition />
  </BrowserRouter>
);
