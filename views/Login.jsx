import React from 'react';

export default function Login({ error }) {
  return (
    <html>
      <head><title>Вход</title></head>
      <body>
        <h1>Вход</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form method="POST" action="/login">
          <input type="email" name="email" placeholder="Email" required /><br />
          <input type="password" name="password" placeholder="Пароль" required /><br />
          <button type="submit">Войти</button>
        </form>
        <p>Нет аккаунта? <a href="/signup">Регистрация</a></p>
      </body>
    </html>
  );
}
