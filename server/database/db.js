import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

connection.connect((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('Connected to MySQL database!');
  });