import database from '../repository/mysql.js'

async function createUser(name, email, password, user_type) {

    if(!user_type){
        return {success: false, message: "O tipo de usuário é obrigatório"};
    }

    const conn = await database.connect();

    try {
        const [existingEmail] = await conn.query('select 1 from usuarios where email = ?', [email]);

        if (existingEmail.length > 0) {
            return { success: false, message: "Já existe um usuário cadastrado com esse e-mail." };
        }
        
            const userData = "insert into usuarios(nome_usuario, email, senha, permissao) values (?, ?, ?, ?)";

            const dataUser = [name, email, password, user_type];
            await conn.query(userData, dataUser);
            console.log('oiii', dataUser)

            return { success: true, message: "Usuário criado com sucesso."};
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message); // Log do erro
        return { success: false, message: "Erro ao criar usuário." + error.message };
    } finally {
        await conn.end();
    }
}

export default {createUser}