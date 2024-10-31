import express from 'express';
import service from '../services/productsService.js';

const routes = express.Router();

routes.get('/', async (request, response) => {
    const products = await service.listProducts();

    if(products.length < 1) {
        return response.status(204).end();
    }

    response.status(200).send({message: products});
});

export default routes;