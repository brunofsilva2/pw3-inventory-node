import database from '../repository/mysql.js'

async function listCategories(){
    const conn = await database.connect();
    const sql = "SELECT * FROM Categorias";
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {listCategories}