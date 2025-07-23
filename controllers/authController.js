import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginPage = (req, res) => {
  res.render('Login', { error: null });
};

export const login = async (req, res) => {
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
};

// Аналогично для signupPage, signup и logout


export const signupPage = (req, res) => {
  res.render('Signup', { error: null });

}


export const signup = async (req, res) => {
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
}

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
}
