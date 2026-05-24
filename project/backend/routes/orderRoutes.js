import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// Maps POST /api/orders -> createOrder controller
router.route('/').post(createOrder);

export default router;
