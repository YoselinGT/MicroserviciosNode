import mariadb from 'mariadb';
import config from '../config.js';

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: 'social',
    port: '3308'
};

let connection;

const handleCon = async () => {

    try {
        connection = await mariadb.createPool(dbconfig);
        return connection;
    } catch (error) {
        console.log(error)
    }
}
const list = async (table) => {

    try {
        const query = `SELECT * FROM ${table}`;
        const conn = await handleCon()
        const rows = await conn.query(query)

        return rows;

    } catch (error) {
        console.log(error)
    }
}


const get = async (table, id) => {

    try {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        const conn = await handleCon()
        const rows = await conn.query(query)

        return rows;

    } catch (error) {
        console.log(error)
    }
}

const insert = async (table, data) => {

    try {

        const fields = Object.keys(data);
        const values = Object.values(data);
        const fieldsMap = fields.map(campo => '?');

        const query = `INSERT INTO ${table} (${fields}) VALUES (${fieldsMap}) RETURNING id`;
        const conn = await handleCon()
        const rows = await conn.query(query, values, (err, result) => {
            if (err) throw err;
            return result;
        });

        return rows;

    } catch (error) {
        console.log(error)
    }
}

const update = async (table, data) => {

    try {
        const fields = Object.keys(data);
        const values = Object.values(data);
        const fieldsMap = fields.map((campo) => {
            if (campo != 'id') {
                return `${campo} = ?`;
            }
        });

        const arrayFiltrado = fieldsMap.filter((element) => element !== undefined);

        const query = `UPDATE ${table} SET ${arrayFiltrado} WHERE id=?`;
        const conn = await handleCon()
        const rows = await conn.query(query, values, (err, result) => {
            if (err) throw err;
            return result;
        });

        return rows;

    } catch (error) {
        console.log(error)
    }
}
const upsert = async (table, data) => {

    if (data && data.id) {
        return update(table, data)
    } else {
        return insert(table, data)
    }
}

const query = async (table, data, join) => {
    try {
        let joinQuery = '';
        if(join){
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        }
        const filter = Object.keys(data);
        const values = Object.values(data);
        const filtersMap = filter.map(campo => `${campo} = ?`);
        console.log(filtersMap)

        const query = `SELECT * FROM ${table} ${joinQuery} WHERE ${filtersMap}`;
        const conn = await handleCon()
        const rows = await conn.query(query, values, (err, result) => {
            if (err) throw err;
            return result;
        });

        return rows;

    } catch (error) {
        console.log(error)
    }
}

export {get, list, upsert, query}