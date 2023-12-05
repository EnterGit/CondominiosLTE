// database.js
const mysql = require('mysql2/promise');

async function connect() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'condominius'
    });

    return connection;
}

module.exports = connect;