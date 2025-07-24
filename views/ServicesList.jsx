import React from "react";
const Header = require("./components/Header");

export default function ServicesList({ services }) {
  return (
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="stylesheet" href="./css/style.css" />

        <title>Услуги</title>
      </head>
      <body>
        <Header></Header>
        <div className="container">
          <h1 className="text-3xl">Услуги</h1>
          <ul className="py-3 flex gap-[20px] flex-wrap">
            {services.map((s) => (
              <li key={s._id} className="bg-sky-300 rounded-xl px-[20px] py-[10px] size-fit">
                <a href={`/services/${s.slug}`}>
                  <div className="text-xl">{s.name}</div>
                  {s.image && <img src={s.image} alt={s.name} width="100" />}
                </a>
              </li>
            ))}
            {services.length === 0 && <p>Услуги не найдены</p>}
          </ul>
        </div>
      </body>
    </html>
  );
}
