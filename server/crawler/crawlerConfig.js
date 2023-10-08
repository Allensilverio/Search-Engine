import { JSDOM } from 'jsdom';


let lastLogTime = Date.now();
let objPages = {};

function logTimeValidation(arg, time) {
    lastLogTime = time;
    console.log(arg);
}

async function crawlPage(baseURL, currentURL, pages) {
    baseURL = new URL(baseURL);
    currentURL = new URL(currentURL);

    if (baseURL.hostname !== currentURL.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);

    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;
    logTimeValidation(`Actively crawling ${currentURL}`, Date.now());

    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            return pages;
        }

        const contentType = resp.headers.get('content-type');

        if (!contentType.includes("text/html")) {
            return pages;
        }

        const htmlBody = await resp.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);

        await Promise.all(nextURLs.map(nextURL => crawlPage(baseURL, nextURL, pages)));
        return pages;

    } catch (err) {
        // Log error message
        //console.error(`Error crawling ${currentURL}: ${err.message}`);
        return pages;
    }
}

export async function startCrawling(startURL, pages) {
    try {
        const timeoutWatcher = setInterval(() => {
            const currentTime = Date.now() - lastLogTime;
            if (currentTime > 10000) {
                console.log('No logs for 10 seconds. Stopping...');
                clearInterval(timeoutWatcher);
                console.log(pages);
                process.exit(0);
            }
        }, 5000);

        const crawledPages = await crawlPage(startURL, startURL, pages);
        console.log(crawledPages);
        clearInterval(timeoutWatcher);
        process.exit(0);
    } catch (error) {
        //console.error("An error occurred:", error);
        process.exit(1);
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        if (linkElement.href.startsWith('/')) {
            try {
                const urlObj = new URL(linkElement.href, baseURL);
                urls.push(urlObj.href);
            } catch (err) {
                //console.error(`Error with relative URL: ${err.message}`);
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                //console.error(`Error with absolute URL: ${err.message}`);
            }
        }
    }
    return urls;
}

function normalizeURL(urlObject) {
    const hostPath = `${urlObject.protocol}${urlObject.hostname}${urlObject.pathname}`;
    return hostPath.endsWith('/') ? hostPath.slice(0, -1) : hostPath;
}

// Start the crawling process
// startCrawling("https://www.intec.edu.do/", objPages);
