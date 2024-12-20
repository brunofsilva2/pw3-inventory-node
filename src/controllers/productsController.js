import express from 'express';
import productsService from '../services/productsService.js';

const routes = express.Router();

routes.post('/', async (req, res) => {
    const {name, description, quantity, min_stock, price, categoria_id} = req.body;

    try {

        console.log(name, description, quantity, min_stock, price, categoria_id);

        if(!name || !description || !quantity || !min_stock || !price || !categoria_id){
            return res.status(400).send({ success: false, message: "Preencha todos os campos obrigatórios" }); 
        }

        if(name.length > 100){
            return res.status(400).send({ success: false, message: "O nome do produto não pode ter mais de 100 caracteres" });
        }

        const result = await productsService.createProducts(name, description, quantity, min_stock, price, categoria_id);

        if(!result.success){
            return res.status(400).send(result);
        }

        return res.status(201).send({ success: true, message: result.message });

    } catch (error) {
        return res.status(500).send({ success: false, message: "Erro interno do servidor.", error: error.message });
    }
});

routes.put('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const {name, description, quantity, min_stock, price, categoria_id} = req.body;

    try{

    if(!name || !description || !quantity || !min_stock || !price || !categoria_id){
        return res.status(400).send({ success: false, message: "Preencha todos os campos obrigatórios" }); 
    }

    if(name.length > 100){
        return res.status(400).send({ success: false, message: "O nome do produto não pode ter mais de 100 caracteres" });
    }

    const result = await productsService.updateProducts(productId, name, description, quantity, min_stock, price, categoria_id);

    if(!result.success) {
        return res.status(400).send({ message: result.message });
    }

    return res.status(200).send({ success: true, message: result.message });
    } catch(error) {
        return res.status(500).send({ success: false, message: "Erro interno" + error.message })
    }
})

routes.get('/', async (request, response) => {
    try {
        const products = await productsService.listProducts();

        if (products.length < 1) {
            return response.status(404).send({ message: "Nenhum produto encontrado." });
        }

        return response.status(200).send(products);
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Erro ao recuperar produtos." });
    }
});

routes.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    try {

        const result = await productsService.deleteProducts(productId);

        if (!result.success) {
            return res.status(404).send({ success: false, message: "Produto não encontrado." });
        }

        return res.status(200).send({ success: true, message: result.message });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Erro interno ao remover o produto.' });
    }
});

export default routes;
