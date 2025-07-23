import express from 'express';

const router = express.Router();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

router.post('/feedback', async (req, res) => {
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

export default router;
