import { load } from 'cheerio';
import getMetaData from 'metadata-scraper';
import { performance } from 'perf_hooks';
import lodash from 'lodash';
import crawlPage from './crawler.config';

function asignSeoRating(objPage, loadTime) {
    let seoRating = 100
    loadTime = parseInt(loadTime)

    if (objPage.title === undefined) seoRating -= 20
    if (objPage.description === undefined) seoRating -= 20
    if (objPage.language === undefined) seoRating -= 10
    if (objPage.keywords === undefined) seoRating -= 25
    if (objPage.icon === undefined) seoRating -= 25
    if(loadTime> 5000) seoRating -= 10
    //console.log(loadTime);
    return seoRating;         
}

async function extractPageMetadata(url) {
    const start = performance.now();

    try {
        const userAgents = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101', 
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50',
    ];
        const randomUserAgent = lodash.sample(userAgents);

        const options = {
            url: url, // URL of web page
            ua: randomUserAgent, // Specify User-Agent header para evitar el error de  (403 forbidden)
            timeout: 10000, // Request timeout in milliseconds (default: 10000ms)
        }

        const { 
            title,
            description,
            language,
            keywords,
            icon
         } = await getMetaData(options);

        const end = performance.now();
        const loadTime = (end - start).toFixed(2);

        const seoRating = asignSeoRating({title, description, language, keywords, icon}, loadTime);
        //console.log(seoRating);

        //console.log(`The page took ${loadTime} milliseconds to load.`);

        return {
            url,
            title,
            description,
            language,
            keywords,
            icon,
            seoRating
        };

    } catch (error) {
        console.log(`It was not possible to extract the metadata from ${url}, error: ${error}`);
        return;
    }
}

(async () => {
    const objResponse = await extractPageMetadata("https://www.booking.com");
    console.log(objResponse);
})();

