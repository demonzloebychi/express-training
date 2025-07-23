import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// API: получить всех пользователей
router.get('/api', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: создать пользователя
router.post('/api', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
