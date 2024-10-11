import express from 'express';
import service from '../services/userService.js';

const routes = express.Router();

routes.post('/', async(req, res) => {
    const {name, email, password, user_type} = req.body;

    try {

        if(!password || password.trim() < 8){
            return res.status(400).send({ success: false, message: "A senha deverá conter mais de 8 caracteres."})
        }

        if(!email.includes("@")){
            return res.status(400).send({ success: false, message: "O email fornecido não é válido."})
        }

        if(!name || !email || !password || !user_type){
            return res.status(400).send({ success: false, message: "Por favor, preencha todos os campos obrigatórios."});
        }

        if(name.length > 100){
            return res.status(400).send({ success: false, message: "O nome não pode conter mais de 100 caracteres."});
        }

        if(email.length > 100){
            return res.status(400).send({ success: false, message: "O email não pode conter mais de 100 caracteres."});
        }

        await service.createUser(name, email, password, user_type);

        return res.status(201).send({ success: true, message: "Usuário cadastrado com sucesso."})

        
    } catch (error) {
        return res.status(500).send(error.message)
    }
});

export default routes;