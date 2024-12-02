import express from 'express';
import categoriesService from '../services/categoriesService.js'

const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
        const categories = await categoriesService.listCategories();

        if(categories.length < 1) {
            return res.status(404).send({ message: "Nenhuma categoria encontrada! "});
        }

        return res.status(200).send(categories);

    } catch (error) {
        res.status(500).send({ message: "Erro ao recuperar categorias."})
    }
})

export default routes;