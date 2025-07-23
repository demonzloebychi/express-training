import React from 'react';

export default function Signup({ error }) {
  return (
    <html>
      <head><title>Регистрация</title></head>
      <body>
        <h1>Регистрация</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form method="POST" action="/signup">
          <input type="text" name="username" placeholder="Имя пользователя" required /><br />
          <input type="email" name="email" placeholder="Email" required /><br />
          <input type="password" name="password" placeholder="Пароль" required /><br />
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p>Уже есть аккаунт? <a href="/login">Вход</a></p>
      </body>
    </html>
  );
}
