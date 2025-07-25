const headerMenu = document.querySelector('.header>nav>ul')

const burger = document.querySelector('.burger')

// const headerMenuItem = document.querySelectorAll('.header.nav li>a')

burger.addEventListener('click', function() {
    headerMenu.classList.toggle('active')
})

const mediaQuery = window.matchMedia('(max-width: 768px)');

function handleScreenChange(e) {
  if (e.matches) {
    // Если ширина экрана равна или меньше 768px — выполняем нужные действия
    console.log('Экран 768px или меньше');
    // Ваш код здесь

    const headerMenuItem = Array.from(document.querySelectorAll('a')).filter(link => {
    return link.nextElementSibling && link.nextElementSibling.tagName.toLowerCase() === 'ul';
    });

    headerMenuItem.forEach(item => {
        item.addEventListener('click', function(event) {
            if (!item.classList.contains('active')) {
                event.preventDefault();

                item.classList.add('active')
            }
        })
    })

  } else {
    // Если ширина экрана больше 768px
    console.log('Экран больше 768px');
    // Код для больших экранов (если нужно)
  }
}

// Начальная проверка
handleScreenChange(mediaQuery);

// Отслеживание изменения размеров окна
mediaQuery.addListener(handleScreenChange);




// if (window.innerWidth <= 768) {
//   // Действия для экрана 768px и меньше
//   console.log('Экран 768px или меньше');
// }
// window.addEventListener('resize', () => {
//   if (window.innerWidth <= 768) {
//     console.log('Экран 768px или меньше');
//     // Ваш код для маленьких экранов
//   } else {
//     console.log('Экран больше 768px');
//     // Код для больших экранов
//   }
// });
