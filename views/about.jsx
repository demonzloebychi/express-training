const React = require("react");
const Header = require("./components/Header");

function About({ users }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="stylesheet" href="./css/style.css" />

          <title>Document</title>
        </head>
        <body>
          <div className="container">
            <Header />
            <h1>О нас - страница</h1>
            <ul>
              {users.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
        </body>
      </html>
    </>
  );
}
module.exports = About;
