import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// Страница блога — рендеринг
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.render('Posts', { posts });
});

// Конкретная статья
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).send('Статья не найдена');
    res.render('Post', { post });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// API: получить все посты JSON
router.get('/api/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: создать пост
router.post('/api', async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
