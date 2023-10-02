// EJECUCION 
import crawlPage from "./crawlerConfig.js";

const testURL = 'https://www.ikea.com.do/';


console.log(`starting crawl of ${testURL}`)
const pages = await crawlPage(testURL, testURL, {});

for (const page of Object.entries(pages)) {
    console.log(page);
}