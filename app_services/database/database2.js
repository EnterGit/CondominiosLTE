// database.js
const mysql = require('mysql2/promise');

async function connect() {

    const connection = await mysql.createConnection({
        // host: 'localhost',
        // user: 'root',
        // password: '',
        // database: 'condominius'
        host: 'ingenierosti.cl',
        port: '3306',
        user: 'ingeni20_condominius',
        password: 'abrete2023_',
        database: 'ingeni20_condominius'
    });
    return connection;
}

module.exports = connect;