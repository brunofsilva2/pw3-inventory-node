import mysql from 'mysql2/promise'

async function connect() {
    try {
        const database = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            password: '',
            database: 'inventory',
            user: 'root'
        });
        console.log('Conexão criada:', database);
        return database;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error); // Log de erro
        throw error;
    }
}

export default {connect}