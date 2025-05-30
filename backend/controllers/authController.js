import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersPath = path.join(__dirname, '../models/users.json');

const loadUsers = () => {
  if (!fs.existsSync(usersPath)) return [];
  const file = fs.readFileSync(usersPath);
  return JSON.parse(file);
};

const saveUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

export const register = (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username sudah digunakan.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ id: Date.now(), username, password: hashedPassword, role: 'user' });
  saveUsers(users);

  res.status(201).json({ message: 'Registrasi berhasil!' });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Username atau password salah.' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ message: 'Login berhasil', token, role: user.role });

};
