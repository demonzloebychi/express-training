import React from "react";
const Header = require("./components/Header");

export default function Signup({ error, menu }) {
  return (
    <html>
      <head>
        {" "}
        <link rel="stylesheet" href="./css/style.css" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <title>Регистрация</title>
      </head>
      <body>
        <Header items={menu} />
        <div className="flex flex-col justify-center items-center pt-[40px]">
          <h1 className="text-3xl py-3">Регистрация</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form
            method="POST"
            action="/signup"
            className="w-[300px] flex flex-col "
          >
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              required
              className="px-5 py-2 border-black border-[1px] border-solid rounded-xl"
            />
            <br />
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
              Зарегистрироваться
            </button>
          </form>
          <p>
            Уже есть аккаунт? <a className="text-blue-700" href="/login">Вход</a>
          </p>
        </div>
      </body>
    </html>
  );
}
