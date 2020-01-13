const mysql = require('mysql');
const { promisify } = require('util');

var database = {
    host: "n1.iworklab.com",
    user: "ajit.pandit_mpay",
    password: "KL68AUPmkt",
    database: "ajit.pandit_mpay"
};

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;