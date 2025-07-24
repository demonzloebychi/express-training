// views/Post.jsx
const React = require("react");
const Header = require("./components/Header");

function Post({ post }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        <link rel="stylesheet" href="/css/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={post.seoDescription} />
        <title>{post.seoTitle}</title>
      </head>
      <body>
        <Header></Header>
        <div className="container">
          <h1>{post.title}</h1>
          <p>
            <em>Автор: {post.author || "Неизвестен"}</em>
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          <p>
            <small>
              Опубликовано: {new Date(post.createdAt).toLocaleString()}
            </small>
          </p>
        </div>
      </body>
    </html>
  );
}

module.exports = Post;
