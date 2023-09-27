// import express from 'express';
// import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/ProductController.js';
// import { authenticateToken } from '../middleware/AuthMiddleware.js';

// const router = express.Router();

// router.post('/api/products', authenticateToken, createProduct);
// router.get('/api/products', authenticateToken, getProducts);
// router.get('/api/products/:id', authenticateToken, getProductById);
// router.put('/api/products/:id', authenticateToken, updateProduct);
// router.delete('/api/products/:id', authenticateToken, deleteProduct);

// export default router

import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/ProductController.js';

const router = express.Router();

router.post('/api/products', createProduct);
router.get('/api/products', getProducts);
router.get('/api/products/:id', getProductById);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

export default router