import express from 'express';
import { renderServicePage, renderServiceList } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', renderServiceList);
router.get('/:slug', renderServicePage);
router.get('/:slug1/:slug2', renderServicePage);
router.get('/:slug1/:slug2/:slug3', renderServicePage);

export default router;
