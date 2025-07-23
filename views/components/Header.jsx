const React = require("react");
function Header({ users }) {
  return (
    <header className="container header ">
      <ul className="py-3">
        <li>
          <a href="/">Главная</a>
        </li>
        <li>
          <a href="/about">О нас</a>
        </li>
        <li>
          <a href="/blog">Блог</a>
        </li>
        <li>
          <a href="/doctors">Врачи</a>
        </li>
        <li>
          <a href="/services">Услуги</a>
        </li>
      </ul>
    </header>
  );
}
module.exports = Header;
