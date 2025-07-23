import Service from '../models/Service.js';

// Поиск услуги по цепочке слагов через parent
async function findServiceByFullSlug(fullSlug) {
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

export const renderServicePage = async (req, res) => {
  try {
    // Собираем слаги из параметров по порядку
    const segments = [req.params.slug1, req.params.slug2, req.params.slug3]
      .filter(Boolean);

    const fullSlug = segments.join('/');

    const service = await findServiceByFullSlug(fullSlug);
    if (!service) return res.status(404).send('Услуга не найдена');

    // Получаем подуслуги текущей услуги
    const subservices = await Service.find({ parent: service._id }).lean();

    res.render('Service', { service, subservices });

  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
};


export const renderServiceList = async (req, res) => {
  try {
    // Все услуги верхнего (корневого) уровня — parent == null
    const services = await Service.find({ parent: null }).lean();
    res.render('ServicesList', { services });
  } catch (e) {
    console.error(e);
    res.status(500).send('Ошибка сервера');
  }
};
