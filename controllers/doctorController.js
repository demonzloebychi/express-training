import Doctor from '../models/Doctor.js';



// Получить всех врачей и рендерить страницу
export const renderDoctorPage = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 }).lean(); // lean() для plain JS объектов
    res.render('Doctor', { doctors });  // передаём doctors в шаблон
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
};



// Получить всех докторов (список)
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 }).lean();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить доктора по id
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).lean();
    if (!doctor) return res.status(404).json({ message: 'Доктор не найден' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать нового доктора
export const createDoctor = async (req, res) => {
  try {
    const { name, lastname, position, image, email } = req.body;
    const doctor = new Doctor({ name, lastname, position, image, email });
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить доктора по id
export const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Доктор не найден' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Удалить доктора по id
export const deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ message: 'Доктор не найден' });
    res.json({ message: 'Доктор удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
