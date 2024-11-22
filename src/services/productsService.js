import database from '../repository/mysql.js'

async function deleteProducts(id){
    const conn = await database.connect();

    try {
        const sql = "DELETE FROM Products WHERE id = ?"
        await conn.query(sql, [id]);
        return { success: true, message: `Produto deletado com sucesso.`}
    } catch (error) {
        return { success: false, message: error.message}
    } finally {
        conn.end();
    }
}

async function listProducts(){
    const conn = await database.connect();
    const sql = "SELECT * FROM products";
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {listProducts, deleteProducts}