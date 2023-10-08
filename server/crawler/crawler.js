// EJECUCION 
import crawlPage from "./crawlerConfig.js";

const testURL = 'https://www.ikea.com.do/';

// Create a queue to start from a set of base URL for the crawling

// Create a function that inserts in the database every crawled page with the data from extractPageData


const pages = await crawlPage(testURL, testURL, {});

