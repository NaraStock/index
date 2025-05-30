import express from 'express';
import { register, login } from '../controllers/authController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', verifyToken, (req, res) => {
  res.json({ message: `Halo, ${req.user.username}. Kamu adalah ${req.user.role}.` });
});

router.get('/admin-only', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'Kamu berhasil mengakses halaman admin 🔐' });
});

export default router; // ✅ LETAKKAN DI PALING AKHIR
