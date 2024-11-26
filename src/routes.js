import express from 'express';
import userController from './controllers/userController.js';
import productsController from './controllers/productsController.js';
import categoriesController from './controllers/categoriesController.js';

const routes = express();

routes.use('/products', productsController);
routes.use('/users', userController);
routes.use('/categories', categoriesController);

export default routes;