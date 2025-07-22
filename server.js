import 'dotenv/config';

import express from 'express';
import mongoose from './db.js'; // ваш файл с подключением, экспорт должен быть через export default mongoose;
import bodyParser from 'body-parser';  // Не обязателен, express теперь умеет работать без него напрямую, можно удалить если не используете


import Post from './models/Post.js';
import User from './models/User.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'jsx');
import reactViews from 'express-react-views';
app.engine('jsx', reactViews.createEngine());


// Главная страница (пример с использованием данных User)
app.get('/', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render('Index', { users });
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.get('/about', (req, res) => {
  res.render('about', { users: ['Иван', 'Мария', 'Петр'] });
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

// Все посты
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать пост
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

// Создать пользователя
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Получить пользователей
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Обработка заявок (feedback) через Telegram

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

    if (!data.ok) {
      throw new Error(data.description);
    }

    res.json({ message: 'Заявка успешно отправлена в Telegram' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    res.status(500).json({
      message: 'Ошибка сервера при отправке сообщения в Telegram',
    });
  }
});


// Запуск сервера после подключения к MongoDB

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
