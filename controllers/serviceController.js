import Service from '../models/Service.js';

// Функция поиска услуги по цепочке слагов с учётом parent
async function findServiceByFullSlug(fullSlug) {
  if (!fullSlug) return null;

  const slugs = fullSlug.split('/');
  let parent = null;
  let service = null;

  for (const slug of slugs) {
    service = await Service.findOne({ slug, parent }).lean();
    if (!service) return null;
    parent = service._id;
  }

  return service;
}

// Функция построения полного пути услуги с учётом родителей
async function buildFullSlug(service) {
  const slugs = [service.slug];
  let current = service;

  while (current.parent) {
    current = await Service.findById(current.parent).lean();
    if (!current) break;
    slugs.unshift(current.slug);
  }

  return slugs.join('/');
}

export const renderServicePage = async (req, res) => {
  try {
    // Собираем все slug из параметров, фильтруем undefined
    const slugs = [req.params.slug, req.params.slug1, req.params.slug2, req.params.slug3].filter(Boolean);
    const fullSlug = slugs.join('/');

    // Ищем услугу по полному пути
    const service = await findServiceByFullSlug(fullSlug);
    if (!service) return res.status(404).send('Услуга не найдена');

    // Находим подуслуги (children)
    let subservices = await Service.find({ parent: service._id }).lean();

    // Для каждой подуслуги формируем её полный путь для ссылок
    subservices = await Promise.all(
      subservices.map(async (sub) => {
        sub.fullSlug = await buildFullSlug(sub);
        return sub;
      })
    );

    // Рендерим шаблон, передаём service и subservices
    res.render('Service', { service, subservices });
  } catch (err) {
    console.error('Ошибка в renderServicePage:', err);
    res.status(500).send('Ошибка сервера');
  }
};

export const renderServiceList = async (req, res) => {
  try {
    // Получаем все корневые услуги (parent == null)
    let services = await Service.find({ parent: null }).lean();

    // Формируем полный путь для каждой корневой услуги
    services = await Promise.all(
      services.map(async (s) => {
        s.fullSlug = await buildFullSlug(s);
        return s;
      })
    );

    res.render('ServicesList', { services });
  } catch (err) {
    console.error('Ошибка в renderServiceList:', err);
    res.status(500).send('Ошибка сервера');
  }
};
