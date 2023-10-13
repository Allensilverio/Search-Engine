import mysql from 'mysql2';
import { Connector } from '@google-cloud/cloud-sql-connector';
import dotenv from 'dotenv';
dotenv.config();

const connector = new Connector();
const clientOpts = await connector.getOptions({
    instanceConnectionName: 'augmented-works-401916:us-central1:search-engine1',
    ipType: 'PUBLIC',
});

const connection = mysql.createConnection({
    ...clientOpts,
    user: 'root',
    password: '',
    database: 'buscador',
    host: '34.16.39.221'
});

connection.connect((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Connected to MySQL database!');
});

export { connection };
