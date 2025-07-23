import express from 'express';
import {
  renderDoctorPage,
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from '../controllers/doctorController.js';

import authMiddleware from '../middleware/authMiddleware.js'; // если хотите защитить роуты

const router = express.Router();


// Рендеринг страницы со списком врачей
router.get('/', renderDoctorPage);

// API: получить всех врачей JSON (можно если нужно отдельный эндпоинт)
router.get('/api', getAllDoctors);

// Получить доктора по ID
router.get('/:id', getDoctorById);

// Создать доктора (защищённый, например)
router.post('/', authMiddleware, createDoctor);

// Обновить доктора
router.put('/:id', authMiddleware, updateDoctor);

// Удалить доктора
router.delete('/:id', authMiddleware, deleteDoctor);

export default router;
