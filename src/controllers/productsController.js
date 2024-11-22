import express from 'express';
import productsService from '../services/productsService.js';

const routes = express.Router();

routes.get('/', async (request, response) => {
    try {
        const products = await productsService.listProducts();

        if (products.length < 1) {
            return response.status(404).send({ message: "Nenhum produto encontrado." });
        }

        response.status(200).send(products);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Erro ao recuperar produtos." });
    }
});


routes.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    try {

        const result = await productsService.deleteProducts(productId);

        if (!result.success) {
            return res.status(404).send({ success: false, message: "Produto não encontrado." });
        }

        res.status(200).send({ success: true, message: result.message });

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Erro interno ao remover o produto.' });
    }
});


export default routes;