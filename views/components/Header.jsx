const React = require("react");
function Header({ users }) {
  return (
    <header className="container header">
      <ul>
        <li>
          <a href="/">Главная</a>
        </li>
        <li>
          <a href="/about">О нас</a>
        </li>
        <li>
          <a href="/blog">Блог</a>
        </li>
      </ul>
    </header>
  );
}
module.exports = Header;
