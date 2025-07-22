import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: { type: String, required: true, unique: true }, // новое поле
    body: {type: String, required: true},
    author: String,
    createdAt: { type: Date, default: Date.now },
    seoTitle: { type: String },                      // title для SEO
    seoDescription: { type: String },                // description для SEO
}, {timestamps: true});


// Можно добавить pre-сохранение, чтобы генерировать slug из title
postSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

// Функция простого транслита + замен символов на "-"
function slugify(text) {
  return text.toString().toLowerCase()
    // перевести кириллицу в латиницу (простой пример)
    .replace(/а/g, 'a').replace(/б/g, 'b').replace(/в/g, 'v')
    .replace(/г/g, 'g').replace(/д/g, 'd').replace(/е/g, 'e')
    .replace(/ё/g, 'e').replace(/ж/g, 'zh').replace(/з/g, 'z')
    .replace(/и/g, 'i').replace(/й/g, 'j').replace(/к/g, 'k')
    .replace(/л/g, 'l').replace(/м/g, 'm').replace(/н/g, 'n')
    .replace(/о/g, 'o').replace(/п/g, 'p').replace(/р/g, 'r')
    .replace(/с/g, 's').replace(/т/g, 't').replace(/у/g, 'u')
    .replace(/ф/g, 'f').replace(/х/g, 'h').replace(/ц/g, 'c')
    .replace(/ч/g, 'ch').replace(/ш/g, 'sh').replace(/щ/g, 'shch')
    .replace(/ъ/g, '').replace(/ы/g, 'y').replace(/ь/g, '')
    .replace(/э/g, 'e').replace(/ю/g, 'yu').replace(/я/g, 'ya')
    // заменяем пробелы и знаки на -
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const Post = mongoose.model('Post', postSchema);
export default Post;
