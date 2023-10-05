import { load } from 'cheerio';
import getMetaData from 'metadata-scraper';
import { performance } from 'perf_hooks';
import lodash from 'lodash';

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
    const objResponse = await extractPageMetadata("https://www.booking.com/hotel/do/central-park-tower.en-gb.html?aid=2311236&label=en-do-booking-desktop-2J6x5lX_xYP650OdUDaD_QS652796016219%2525253Apl%2525253Ata%2525253Ap1%2525253Ap2%2525253Aac%2525253Aap%2525253Aneg%2525253Afi%2525253Atikwd-65526620%2525253Alp9069760%2525253Ali%2525253Adec%2525253Adm&sid=17e003e3e7988ab530c3eac4aff92597&all_sr_blocks=320836302_335416901_0_0_0;checkin=2023-10-06;checkout=2023-10-09;dest_id=13746;dest_type=region;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=320836302_335416901_0_0_0;hpos=1;map=1;matching_block_id=320836302_335416901_0_0_0;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=320836302_335416901_0_0_0__26903;srepoch=1696475310;srpvid=19ab1614e85600de;type=total;ucfs=1&#map_closed");
    console.log(objResponse);
})();

