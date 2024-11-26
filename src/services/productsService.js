import database from '../repository/mysql.js'

async function createProducts(name, description, quantity, min_stock, price, categoria_id){
    const conn = database.connect();

    try {

        const [productName] = (await conn).query('SELECT id FROM products WHERE product_name = ?', [name])

        if(productName.length > 1) {
            return { success: false, message: "Já existe um produto com este nome, especifique o laboratório e/ou a quantidade." }
        }

        const productData = `INSERT INTO products 
        (product_name, product_description, quantity, min_stock, price, categoria_id) VALUES (?, ?, ?, ?, ?, ?)`

        const dataProducts = [name, description, quantity, min_stock, price, categoria_id];

        await conn.query(productData, dataProducts);

        return { success: true, message: `Produto "${name}" cadastrado com sucesso!`}
        
    } catch (error) {
        return { success: false, message: "Erro ao criar produto" + error.message}
    } finally{
        conn.end();
    }
}

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

export default {createProducts, listProducts, deleteProducts}