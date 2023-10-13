import mysql from 'mysql2';
import { Connector } from '@google-cloud/cloud-sql-connector';
import dotenv from 'dotenv';
dotenv.config();

const connector = new Connector();
const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_NAME,
    ipType: 'PUBLIC',
});

const connection = mysql.createConnection({
    ...clientOpts,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
});

connection.connect((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Connected to MySQL database!');
});

export { connection };
