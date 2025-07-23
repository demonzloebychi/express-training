const React = require("react");
const Header = require("./components/Header");

function About({  }) {
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
          <Header />
          <div className="container">
            <h1>О нас - страница</h1>
    
          </div>
        </body>
      </html>
    </>
  );
}
module.exports = About;
