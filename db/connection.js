const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lion2001^^',
    database: 'employee_tracker'
});

module.exports = connection;