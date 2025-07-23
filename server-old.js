import 'dotenv/config';

import express from 'express';
import mongoose from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import expressReactViews from 'express-react-views';

import Post from './models/Post.js';
import User from './models/User.js';



import authMiddleware from './middleware/authMiddleware.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Очень важно!

app.set('view engine', 'jsx');

app.engine('jsx', expressReactViews.createEngine());
app.set('views', path.join(__dirname, 'views'));





app.get('/', async (req, res) => {
  const token = req.cookies?.token;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id).lean();
    } catch (e) {
      // токен невалиден — оставляем user = null
    }
  }

  res.render('Home', { user });
});

app.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  res.render('Profile', { user });
});


// Страница регистрации
app.get('/signup', (req, res) => {
  res.render('Signup', { error: null });
});
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) return res.render('Signup', { error: 'Почта уже занята' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();

    res.redirect('/login');
  } catch (e) {
    res.render('Signup', { error: 'Ошибка сервера' });
  }
});

// Страница входа
app.get('/login', (req, res) => {
  res.render('Login', { error: null });
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.render('Login', { error: 'Неверные данные' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('Login', { error: 'Неверные данные' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.redirect('/');
  } catch (e) {
    res.render('Login', { error: 'Ошибка сервера' });
  }
});

// Выход
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

// Публичные страницы
app.get('/about', (req, res) => {
  res.render('about', { users: ['Иван', 'Мария', 'Пётр'] });
});

app.get('/blog', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.render('Posts', { posts });
});

app.get('/blog/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).send('Статья не найдена');
    res.render('Post', { post });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// API для постов
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API для пользователей
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обработка заявок через Telegram (оставил как есть)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/feedback', async (req, res) => {
  const { name, phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Телефон обязателен' });
  }

  const message = `
Новая заявка с express-react-views:
Имя: ${name || 'Не указано'}
Телефон: ${phone}
`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();

    if (!data.ok) throw new Error(data.description);

    res.json({ message: 'Заявка успешно отправлена в Telegram' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    res.status(500).json({
      message: 'Ошибка сервера при отправке сообщения в Telegram',
    });
  }
});

// Старт сервера после подключения к MongoDB
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
