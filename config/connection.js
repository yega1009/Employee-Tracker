// Import the 'dotenv' library to load environment variables from a .env file into process.env
require('dotenv').config();

// Import the 'mysql2' library to create a MySQL connection
const mysql = require('mysql2');

// Create a connection to the MySQL database using the configuration from the environment variables
const connection = mysql.createConnection({
    host: 'localhost', 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Export the connection object to be used in other parts of the application
module.exports = connection;
