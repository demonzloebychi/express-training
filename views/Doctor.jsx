import React from "react";
const Header = require("./components/Header");

export default function Doctor({ doctors }) {
  return (
    <html lang="ru">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Врачи</title>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <Header></Header>
        <div className="container">
          <h1>Список врачей</h1>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor._id}>
                <h2>
                  {doctor.name} {doctor.lastname}
                </h2>
                <p>Должность: {doctor.position}</p>
                {doctor.image && (
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} ${doctor.lastname}`}
                    width="100"
                  />
                )}
                <p>Email: {doctor.email}</p>
              </li>
            ))}
            {doctors.length === 0 && <p>Доктора не найдены</p>}
          </ul>
        </div>
      </body>
    </html>
  );
}
