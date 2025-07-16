require('dotenv').config();


const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");


const app = express();

app.use(cors({
  origin: ['https://next-shop-ivory.vercel.app', 'http://localhost:3000'],  // замените на ваш фронтенд URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post("/feedback", async (req, res) => {
  try {
    const { cart, phone, email, name, total } = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: "Нет конфигурации Telegram" });
    }

    let message = "<b>Новый заказ</b>\n\n";
    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.product.title} — ${item.quantity} шт. — ${
        item.product.price * item.quantity
      } $\n`;
    });
    message += `\n<b>Итого:</b> ${total} $\n\n`;
    message += `<b>Контакты:</b>\nТелефон: ${phone}\n`;
    if (email) message += `Email: ${email}\n`;
    if (name) message += `Имя: ${name}\n`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Ошибка отправки в Telegram" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports.handler = serverless(app);
