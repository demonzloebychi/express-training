// import React from ("react");


// export default function Header({ users }) {
//   return (
//     <header className="container header">
//       <ul className="py-3">
//         <li>
//           <a href="/">Главная</a>
//         </li>
//         <li>
//           <a href="/about">О нас</a>
//         </li>
//         <li>
//           <a href="/blog">Блог</a>
//         </li>
//         <li>
//           <a href="/doctors">Врачи</a>
//         </li>
//         <li>
//           <a href="/services">Услуги</a>
//         </li>
//       </ul>
//     </header>
//   );
// }
const React = require('react');

function Menu({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <ul>
      {items.map(item => (
        <li key={item.link}>
          <a href={item.link}>{item.title}</a>
          {item.children && item.children.length > 0 && (
            <Menu items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

function Header({ items }) {
  return (
    <>
    <header className='header'>
      <nav className='container'>
        <Menu items={items} />
        <div className="burger">Меню</div>
      </nav>
    </header>
            <script src="/js/header.js"></script>

    </>
    
  );
}

module.exports = Header;