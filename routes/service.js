import express from 'express';
import { renderServiceList, renderServicePage } from '../controllers/serviceController.js';

const router = express.Router();

// Список корневых услуг
router.get('/', renderServiceList);

// Услуга 1-го уровня — /services/slug1
router.get('/:slug1', renderServicePage);

// Услуга 2-го уровня — /services/slug1/slug2
router.get('/:slug1/:slug2', renderServicePage);

// Услуга 3-го уровня — /services/slug1/slug2/slug3
router.get('/:slug1/:slug2/:slug3', renderServicePage);

export default router;
