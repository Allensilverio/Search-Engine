import {JSDOM} from 'jsdom';

export default async function crawlPage(baseURL, currentURL, pages) {
    

    baseURL = new URL(baseURL);
    currentURL = new URL(currentURL);

    if (baseURL.hostname !== currentURL.hostname) {
        return pages; // I dont want to crawl the entire internet, just the pages inside one page
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    if (pages[normalizedCurrentURL] > 0) { // How many times the page has been crawled
        pages[normalizedCurrentURL] ++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;
    console.log(`actively crawling ${currentURL}`);

    try {
        const resp = await fetch(currentURL); // fetch the page to get the HTML
        if (resp.status > 399) {
            //console.log(`error crawling ${currentURL} with status code: ${resp.status}`);
            return pages;
        }

        const contentType = resp.headers.get('content-type');

        if (!contentType.includes("text/html")) {
            //console.log(`non html response, content type ${contentType}, on page ${currentURL}`);
            return pages;
        }

        const htmlBody = await resp.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextURL of nextURLs) {
            await crawlPage(baseURL, nextURL, pages);
        }

    } catch (err) {
        //console.log(`error crawling ${currentURL}: ${err.message}`);
    }

    return pages

}

crawlPage("https://www.wikipedia.com/", "https://www.wikipedia.com/", {})

function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a')

    for(const linkElement of linkElements){
        if (linkElement.href.slice(0,1) === '/'){
            //relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                //console.log(`error with relative url: ${err.message}`);
            }
        } else {
            //absolute url
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                //console.log(`error with absolute url: ${err.message}`);
            }

        
        }

        }

        return urls; 
        
    }

function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    else {
        return hostPath;
    }
}



