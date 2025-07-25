import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import expressReactViews from 'express-react-views';

import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';
import pagesRoutes from './routes/pages.js';
import feedbackTelegramRoutes from './routes/feedbackTelegram.js';
import doctorRoutes from './routes/doctor.js';
import serviceRoutes from './routes/service.js';
import menuRoutes from './routes/menu.js';
import menuMiddleware from './middleware/menuMiddleware.js'; // путь подкорректируйте

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(menuMiddleware);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine());
app.set('views', path.join(__dirname, 'views'));

// Подключение маршрутов
app.use('/', authRoutes);              // например, /login /signup /logout
app.use('/', pagesRoutes);             // /, /profile, /about
app.use('/blog', postsRoutes);         // страницы блога и API (около /blog и /blog/:slug)
app.use('/posts', postsRoutes);        // API для постов по /posts/*
app.use('/users', usersRoutes);        // API пользователей по /users/*
app.use('/', feedbackTelegramRoutes);          // /feedback - заявка в телеграм
app.use('/doctors', doctorRoutes);
app.use('/services', serviceRoutes);
app.use('/menu', menuRoutes);

export default app;
