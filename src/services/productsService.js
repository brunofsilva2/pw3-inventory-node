import database from '../repository/mysql.js'

async function listProducts(){
    const conn = await database.connect();
    const sql = "SELECT * FROM products";
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {listProducts}