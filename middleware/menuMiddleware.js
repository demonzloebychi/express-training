import Service from '../models/Service.js';
import Doctor from '../models/Doctor.js';
import Post from '../models/Post.js';

// Построение дерева услуг с вложенностью
function buildTree(items) {
  const map = {};
  const roots = [];

  items.forEach(item => {
    map[item._id.toString()] = { ...item, children: [] };
  });

  items.forEach(item => {
    if (item.parent) {
      const parentId = item.parent.toString();
      if (map[parentId]) {
        map[parentId].children.push(map[item._id.toString()]);
      }
    } else {
      roots.push(map[item._id.toString()]);
    }
  });

  return roots;
}

// Рекурсивное формирование полного пути (fullSlug) для услуги
function setFullSlugRecursively(node, parentSlug = '/services') {
  node.fullSlug = `${parentSlug}/${node.slug}`;
  if (node.children) {
    node.children.forEach(child => setFullSlugRecursively(child, node.fullSlug));
  }
}

// Преобразование узла дерева услуги в формат меню
function transformNodeToMenuItem(node) {
  return {
    title: node.name,
    link: node.fullSlug,
    children: node.children ? node.children.map(transformNodeToMenuItem) : [],
  };
}

export default async function menuMiddleware(req, res, next) {
  try {
    // Все услуги из БД
    const servicesRaw = await Service.find({}).lean();

    // Строим дерево вложенных услуг
    const servicesTree = buildTree(servicesRaw);

    // Формируем полный путь каждой услуги
    servicesTree.forEach(root => setFullSlugRecursively(root));

    // Формируем пункты меню из вложенного дерева услуг
    const servicesMenu = servicesTree.map(transformNodeToMenuItem);

    // Врачи
    const doctors = await Doctor.find({}).select('name lastname').lean();

    // Блог — последние 5 постов
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(5).lean();

    const menu = [
      {
        title: 'Главная',
        link: '/',
      },
      {
        title: 'Услуги',
        link: '/services',
        children: servicesMenu,
      },
      {
        title: 'Врачи',
        link: '/doctors',
        // Можно добавить врачей как подменю, если нужно
        // children: doctors.map(d => ({ title: `${d.name} ${d.lastname}`, link: `/doctors/${d._id}` }))
      },
      {
        title: 'Блог',
        link: '/blog',
        children: posts.map(p => ({ title: p.title, link: `/blog/${p.slug}` })),
      },
    ];

    res.locals.menu = menu;
    next();
  } catch (err) {
    next(err);
  }
}
