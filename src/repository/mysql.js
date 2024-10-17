import mysql from 'mysql2/promise';

async function connect(){
    return await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        password: '',
        database: 'inventory',
        user: 'root'
    })
}

export default {connect}