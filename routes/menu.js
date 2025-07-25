import express from 'express';

const router = express.Router();

// Просто рендерим страницу с меню из middleware
// Этот роут можно использовать, если хотите отдельно показать меню

router.get('/', (req, res) => {
  res.render('Home', {
    menu: res.locals.menu,
    user: req.user || null, // если хотите
  });
});

export default router;
