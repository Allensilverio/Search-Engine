

import {startCrawling} from './crawlerConfig.js';
import { extractPageMetadata } from './extractPageData.js';
import mysql from 'mysql2/promise';



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: ' ',
    database: 'buscador',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
  });
  

  const processUrlsInChunks = async (urls, chunkSize) => {
    for (let i = 0; i < urls.length; i += chunkSize) {
        const chunk = urls.slice(i, i + chunkSize);
        await Promise.all(chunk.map(processUrl));
    }
};

const processUrl = async (url) => {
    try {
        // Extracting data
        const pageMetadata = await extractPageMetadata(url);

        // Checking if pageMetadata is not null or undefined
        if (!pageMetadata) {
            console.error(`Failed to extract metadata for ${url}`);
            return; // Skip to the next iteration
        }

        const {
            urlPage,
            title = " ",
            finalDescription = " ",
            icon,
            keywords = " ",
            language,
            seoRating
        } = pageMetadata;

        console.log({
            urlPage,
            title,
            finalDescription,
            language,
            keywords,
            icon,
            seoRating
        });

        const connection = await pool.getConnection();

        try {
            // Call the stored procedure
            await connection.query('CALL spInsertPage(?, ?, ?, ?, ?, ?, ?)', [
                urlPage,
                title,
                finalDescription,
                icon,
                keywords,
                language,
                seoRating
            ]);
        } finally {
            // Ensure connection is released back to the pool
            connection.release();
        }
    } catch (error) {
        console.error(`Error processing URL ${url}:`, error);
    }
};

// Usage:
let objPages = {};
await startCrawling("https://www.siempreviajero.com/", objPages);
await processUrlsInChunks(Object.keys(objPages), 5);
