import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const articlesPath = path.join(__dirname, '../models/articles.json');

const loadArticles = () => {
  if (!fs.existsSync(articlesPath)) return [];
  const data = fs.readFileSync(articlesPath);
  return JSON.parse(data);
};

const saveArticles = (articles) => {
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
};
export const getArticles = (req, res) => {
  const articles = loadArticles();
  res.json(articles);
};


export const getArticleById = (req, res) => {
  const articles = loadArticles();
  const article = articles.find((a) => a.id == req.params.id);

  if (!article) {
    return res.status(404).json({ message: 'Artikel tidak ditemukan' });
  }

  res.json(article);
};


export const addArticle = (req, res) => {
  const { title, content } = req.body;
  const articles = loadArticles();
  const newArticle = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date()
  };
  articles.push(newArticle);
  saveArticles(articles);
  res.status(201).json({ message: 'Artikel berhasil ditambahkan', article: newArticle });
};

export const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let articles = loadArticles();
  const index = articles.findIndex(a => a.id == id);
  if (index === -1) return res.status(404).json({ message: 'Artikel tidak ditemukan' });

  articles[index] = { ...articles[index], title, content };
  saveArticles(articles);
  res.json({ message: 'Artikel berhasil diperbarui' });
};

export const deleteArticle = (req, res) => {
  const { id } = req.params;
  let articles = loadArticles();
  const newArticles = articles.filter(a => a.id != id);
  if (articles.length === newArticles.length) return res.status(404).json({ message: 'Artikel tidak ditemukan' });

  saveArticles(newArticles);
  res.json({ message: 'Artikel berhasil dihapus' });
};
