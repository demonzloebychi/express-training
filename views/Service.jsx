import React from "react";
const Header = require("./components/Header");

export default function Service({ service, subservices }) {
  return (
    <html lang="ru">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="stylesheet" href="/css/style.css" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{service.metaTitle || service.name}</title>
        {service.metaDescription && (
          <meta name="description" content={service.metaDescription} />
        )}
        {/* Можно добавить дополнительные метатеги, если нужно */}
      </head>
      <body>
        <Header></Header>
        <div className="container">
          <h1 className="text-3xl">{service.name}</h1>

          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              style={{ maxWidth: "300px", height: "auto" }}
            />
          )}

          <div dangerouslySetInnerHTML={{ __html: service.body }} />

          {/* Секция вывода подуслуг */}
          {subservices && subservices.length > 0 && (
            <section style={{ marginTop: "40px" }}>
              <h2>Подуслуги</h2>
              <ul>
                {subservices.map((sub) => (
                  <li key={sub._id}>
                    {/* Сформируем ссылку по слагу */}
                    {/* Для вложенных услуг может потребоваться путь с родителями (см. ниже) */}
                    <a href={`/services/${getFullSlug(sub)}`}>{sub.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </body>
    </html>
  );
}

// Вспомогательная функция для построения полного пути услуги с учётом родителей.
// В простейшем случае, если у вас нет поля для полного пути,
// вам нужно запросить путь к услуге из БД (в контроллере) и передать сюда.
// Здесь пример без базы — может быть заглушка:
function getFullSlug(service) {
  // Предполагается, что в объекте service есть поле 'path' с полным слагом (например, "lvl1/lvl2/lvl3")
  // если нет — эту логику придется делать на сервере и передавать готовый путь!

  return service.path || service.slug; // fallback — просто слаг
}
