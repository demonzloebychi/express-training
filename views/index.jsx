const React = require("react");
const Header = require("./components/Header");
const Form = require("./components/Form");

function Index({ users }) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="./css/style.css" />

          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
        </head>
        <body>
          <div className="container">
            <Header></Header>
            <h1>Главная страница</h1>
            <Form></Form>

            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </body>
      </html>
    </>
  );
}
module.exports = Index;
