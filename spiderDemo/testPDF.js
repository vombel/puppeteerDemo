const puppeteer = require("puppeteer");
async function test() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.emulateMedia("screen");
    await page.goto(
       
    );

    // await page.goto("https://www.apifox.cn/apidoc/project-817815/api-47549800");
    // const imghandle = await page.$("img");
    await page.pdf({
        scale: 1.8,
        path: "ceshi.pdf",
        format:'A4',
        // preferCSSPageSize: true
    });

    browser.close();
}

test();
