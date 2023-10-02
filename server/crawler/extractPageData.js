import { load } from 'cheerio';
import getMetaData from 'metadata-scraper';
import { performance } from 'perf_hooks';

function asignSeoRating(objPage, loadTime) {
    let seoRating = 100
    loadTime = parseInt(loadTime)

    if (objPage.title === undefined) seoRating -= 20
    if (objPage.description === undefined) seoRating -= 20
    if (objPage.language === undefined) seoRating -= 10
    if (objPage.keywords === undefined) seoRating -= 25
    if (objPage.icon === undefined) seoRating -= 25
    if(loadTime> 1000) seoRating -= 10
    //console.log(loadTime);
    return seoRating;         
}



async function extractPageMetadata(url) {
    const start = performance.now();

    try {
        const { 
            title,
            description,
            language,
            keywords,
            icon
         } = await getMetaData(url);

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
    const objResponse = await extractPageMetadata("https://www.amazon.com/");
    console.log(objResponse);
})();

