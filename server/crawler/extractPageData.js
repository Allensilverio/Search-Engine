import { load } from 'cheerio';
import getMetadata from 'metadata-scraper';
import { performance } from 'perf_hooks';
import lodash from 'lodash';


export async function extractPageMetadata(urlPage) {
    const start = performance.now();

    try {
        const userAgents = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50',
        ];
        const randomUserAgent = lodash.sample(userAgents);


        const options = {
            url: urlPage,
            ua: randomUserAgent,
            timeout: 10000
        }


        const { title, description, language, keywords, icon } = await getMetadata(options);
        // console.log({ urlPage, title, description, language, keywords, icon });

        const end = performance.now();
        const loadTime = (end - start).toFixed(2);

        const seoRating = assignSeoRating({ title, description, language, keywords, icon }, loadTime);

        var originalString = description;
        var cleanString = originalString.replace(/<\/?[^>]+(>|$)/g, "").replace(/\n/g, " ");
        var maxLength = 160;
        var finalDescription = cleanString.length > maxLength ?
            cleanString.slice(0, maxLength - 3) + "..." :
            cleanString;


        return {
            urlPage,
            title,
            finalDescription,
            language,
            keywords,
            icon,
            seoRating
        };
    } catch (error) {
        //console.log(`It was not possible to extract the metadata from ${urlPage}, error: ${error}`);
        return null;
    }
}

function assignSeoRating(objPage, loadTime) {
    let seoRating = 100;
    loadTime = parseInt(loadTime);

    if (!objPage.title) seoRating -= 20;
    if (!objPage.description) seoRating -= 20;
    if (!objPage.language) seoRating -= 10;
    if (!objPage.keywords) seoRating -= 25;
    if (!objPage.icon) seoRating -= 25;
    if (loadTime > 5000) seoRating -= 10;

    return seoRating;
}



// (async () => {
//     const objResponse = await extractPageMetadata("https://www.reactjs.wiki/que-java-script-necesito-para-aprender-react");
//     console.log(objResponse);
// })();

