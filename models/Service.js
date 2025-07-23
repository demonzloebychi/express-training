import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // для URL
  image: String,
  body: String, // описание услуги, можно HTML
  metaTitle: String,
  metaDescription: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', default: null }, // вложенность
  level: { type: Number, default: 1, min: 1, max: 3 }, // глубина вложенности
}, { timestamps: true });

// Индекс на slug для быстрого поиска
serviceSchema.index({ slug: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
