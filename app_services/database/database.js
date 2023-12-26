const mysql = require('mysql2');

const db = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'condominius'
  host: 'ingenierosti.cl',
  // port: '3306',
  user: 'ingeni20_condominius',
  password: 'abrete2023_',
  database: 'ingeni20_condominius'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

module.exports = db;

