import database from "./connection.js";

export async function queryOne(sql, params = []){
    const result = await database.query(sql, params);
    return result.rows[0] || null;
}

export async function queryAll(sql, params = []){
    const result = await database.query(sql,params);
    return result.rows;
}