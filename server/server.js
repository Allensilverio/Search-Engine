import axios from 'axios'
import Express from 'express';
import getMetaData from 'metadata-scraper';
import { connection } from './database/db.js';

const app = Express();

// APP PORT

app.listen(3000, () => console.log('Server ready in port 3000!'));
