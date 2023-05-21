import mysql from 'serverless-mysql';
import { dbconf } from './dbconf';

const db = mysql({
    config: {
        host:process.env.DB_HOST,
        database: process.env.DB_DB,
        user: process.env.DB_USER,
        password:process.env.DB_PASS
    }
});

export default async function query(query, values) {
    try {
      const results = await db.query(query, values);
      await db.end();
      return results;
    } catch (error) {
        console.log('error');
        console.log(error);
      return { error };
    }
  }

  /*
  const mysql = require('mysql2/promise');

const db = mysql.createPool({
    connectionLimit: 10,
    host: '3.17.124.25',
    database: 'musicApp',
    user: 'music',
    password:'Oj!LR]uurW/ekpA6'
});

db.getConnection((err, connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release();
    return;
});

module.exports = {
    query: async (sql, values) =>{
        const rows = await db.query(sql, values, function(err, results, fields) {
            if (err) {
                return {
                    error: err
                };
            }
            return results;
        });
        return rows[0];
    }
}
  */