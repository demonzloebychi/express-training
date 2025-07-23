import React from "react";
const Header = require("./components/Header");
const Form = require("./components/Form");

export default function Home({ user }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./css/style.css" />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Главная</title>
      </head>
      <body>
        <Header />
        <div className="container">
          <h1>Твой профиль</h1>
          <Form />

          <h2>Привет, {user?.username || 'гость'}!</h2>
          {user ? (
            <>
              <p>Email: {user.email}</p>
              <a href="/logout">Выйти</a>
            </>
          ) : (
            <>
              <p><a href="/login">Войти</a> или <a href="/signup">Зарегистрироваться</a></p>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
