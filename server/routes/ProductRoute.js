import express from 'express';
import { createProduct } from '../controllers/ProductController.js';
import { authenticateToken } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/api/products', authenticateToken, createProduct);

export default router