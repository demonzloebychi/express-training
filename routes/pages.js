import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Главная — проверяем токен, но открыт для всех
router.get('/', async (req, res) => {
  const token = req.cookies?.token;
  let user = null;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id).lean();
    } catch { }
  }
  res.render('Home', { user, menu: res.locals.menu, });
});

// Профиль, защищённый
router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  res.render('Profile', { 
    user, // если есть user
    menu: res.locals.menu, // передаем меню из middleware
   });
});

// About и другие публичные
router.get('/about', (req, res) => {
  res.render('About', { menu: res.locals.menu, });
});

export default router;
