import React from "react";
const Header = require("./components/Header");
const Form = require("./components/Form");

export default function Home({ user }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./css/style.css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Главная</title>
      </head>
      <body>
        <Header />
        <div className="container">
          <h1 className="text-3xl">Главная страница</h1>
          <Form />

          <h2 className="text-2xl pt-[30px]">Привет, {user?.username || 'гость'}!</h2>
          {user ? (
            <>
              <p>Email: {user.email}</p>
              <a href="/logout" className="text-blue-700">Выйти</a>
            </>
          ) : (
            <>
              <p><a href="/login" className="text-blue-700">Войти</a> или <a href="/signup" className="text-blue-700">Зарегистрироваться</a></p>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
