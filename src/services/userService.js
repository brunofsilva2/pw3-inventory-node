import database from '../repository/mysql.js'

async function createUser(name, email, password, user_type) {

    if(!user_type){
        return {success: false, message: "O tipo de usuário é obrigatório"};
    }

    const conn = await database.connect();

    try {
        const userData = "insert into users(user_name, email, password_hash, user_type) values (?, ?, ?, ?)";

        const dataUser = [name, email, password, user_type];
        await conn.query(userData, dataUser);

        return { success: true, message: "Usuário criado com sucesso."};
    } catch (error) {
        return { success: false, message: "Erro ao criar usuário." + error.message };
    } finally {
        await conn.end();
    }
}

async function listUsers(){

    const conn = await database.connect();
    const sql = "SELECT * FROM users WHERE soft_delete = 0";
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;

}

export default {createUser, listUsers}