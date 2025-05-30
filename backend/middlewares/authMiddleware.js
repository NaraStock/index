import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // <-- TAMBAHKAN INI

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan user info ke req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid.' });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses khusus admin.' });
  }
  next();
};
