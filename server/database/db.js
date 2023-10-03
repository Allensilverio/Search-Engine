import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "search_engine"
  });

connection.connect((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('Connected to MySQL database!');
  });