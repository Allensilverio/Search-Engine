import axios from 'axios'
import Express from 'express';
import getMetaData from 'metadata-scraper';


const app = Express();

async function extractPageMetadata() {
	const url = 'https://www.amazon.es/'
	const { 
       title,
       description,
       language,
       keywords,
       author,
       publised,
       image,
       icon
    } = await getMetaData(url);
}


// APP PORT

app.listen(3000, () => console.log('Server ready in port 3000!'));
