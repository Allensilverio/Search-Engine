import axios from 'axios'
import Express from 'express';
import getMetaData from 'metadata-scraper';


const app = Express();

async function extractPageMetadata(url) {
	const { 
       title,
       description,
       language,
       keywords,
       author,
       published,
       image,
       icon
    } = await getMetaData(url);

    return {
        title,
        description,
        language,
        keywords,
        author,
        published,
        image,
        icon
    };

}

const objResponse = await extractPageMetadata('https://www.youtube.com/')








// APP PORT

app.listen(3000, () => console.log('Server ready in port 3000!'));
