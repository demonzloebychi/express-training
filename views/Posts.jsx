// views/Posts.jsx
const Header = require("./components/Header");
const React = require("react");

function Posts({ posts }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        <link rel="stylesheet" href="./css/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Блог" />
        <title>Блог</title>
      </head>
      <body>
        <Header></Header>
        <div className="container">
          <h1 className="text-3xl py-[30px]">Блог</h1>
          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post._id}>
                <strong>{post.title}</strong>
                <p>{post.author}</p>
                <br />
                <small>{new Date(post.createdAt).toLocaleString()}</small>
                <a className="button" href={`blog/${post.slug}`}>
                  Перейти
                </a>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
}

module.exports = Posts;
