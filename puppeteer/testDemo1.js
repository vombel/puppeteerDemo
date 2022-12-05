const puppeteer = require("puppeteer");

puppeteer
    .launch({
        headless: false,
    })
    .then(async (browser) => {
        const page = await browser.newPage();
        // page.setBypassCSP(true);
        await page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
        );
        await page.goto('https://pixivic.com/?VNK=7e0a581c')
        await page.goto(
            "https://pixivic.com/illusts/103207318?VNK=d40c7341",
            {
                referer: "https://pixivic.com/?VNK=7e0a581c"
            }
        );

        // ...
    });
