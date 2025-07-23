import jwt from 'jsonwebtoken';


// Middleware для проверки JWT в cookie
function authMiddleware(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.redirect('/login');
  }
}

export default authMiddleware