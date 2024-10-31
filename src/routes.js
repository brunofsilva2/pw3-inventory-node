import express from 'express';
import userController from './controllers/userController.js';
import productsController from './controllers/productsController.js';

const routes = express();

routes.use('/products', productsController);
routes.use('/users', userController);

export default routes;