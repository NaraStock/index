import express from 'express';
import { getArticleById ,getArticles, addArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Semua orang bisa lihat
router.get('/', getArticles);
router.get('/:id', verifyToken, getArticleById);
// Admin-only
router.post('/', verifyToken, verifyAdmin, addArticle);
router.put('/:id', verifyToken, verifyAdmin, updateArticle);
router.delete('/:id', verifyToken, verifyAdmin, deleteArticle);

export default router;
