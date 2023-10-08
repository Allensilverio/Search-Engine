import {startCrawling} from './crawlerConfig.js';
import { extractPageMetadata } from './extractPageData.js';



let objPages = {};

await startCrawling("https://www.reactjs.wiki/", objPages);

await Promise.all(Object.keys(objPages).map(async url => {
    const metadata = await extractPageMetadata(url);
    if (metadata) {
        objPages[url] = metadata;
    }
}));





// Create a queue to start from a set of base URL for the crawling


// await startCrawling("https://bocao.com.do/", objPages);

// Create a function that inserts in the database every crawled page with the data from extractPageData



