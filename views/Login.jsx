import React from "react";
const Header = require("./components/Header");

export default function Login({ error }) {
  return (
    <html>
      <head>
        {" "}
        <link rel="stylesheet" href="./css/style.css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <title>Вход</title>
      </head>
      <body>
        <Header></Header>
        <div className="flex flex-col justify-center items-center pt-[40px]">
          <h1 className="text-3xl py-3">Вход</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form
            method="POST"
            action="/login"
            className="w-[300px] flex flex-col "
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="px-5 py-2 border-black border-[1px] border-solid rounded-xl"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              required
              className="px-5 py-2 border-black border-[1px] border-solid rounded-xl"
            />
            <br />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-xl"
            >
              Войти
            </button>
          </form>
          <p>
            Нет аккаунта? <a href="/signup" className="text-blue-700">Регистрация</a>
          </p>
        </div>
      </body>
    </html>
  );
}
