const puppeteer = require("puppeteer");
const fs = require("fs");
// const axios = require("axios");
const { URL }  = require('url');
const path = require("path");
const { promisify } = require("util");
const download = require("download");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
// const sleep = promisify(setTimeout)
function sleep(time) {
    return new Promise((reslove) => setTimeout(reslove, time));
}
(async () => {
    let headers = {
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
            
    };
    const browser = await puppeteer.launch({
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        // headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    await page.goto("https://pixivic.com/?VNK=7e0a581c");
    const imageHref = await page.evaluate(() => {
        let list = [...document.images];
        // console.log(list);

        return list.map((el) => {
            return { href: el.src.trim(), title: el.dataset };
        });
    });
    // await writeFileAsync("./ceshi.json", JSON.stringify(imageHref));
    console.log("ok");
 
    await downloadFile(imageHref);
    await sleep(3000);
    async function downloadFile(data) {
        for (let index = 5; index < data.length; index++) {
            const item = data[index];
            console.log(item.href);
            // const myURL = new URL(item.href);
            headers.Referer="https://pixivic.com/?VNK=7e0a581c"
            // Path at which image will get downloaded
            const filePath = `${__dirname}/pixiv`;

            await download(item.href, filePath, {
                filename: Date.now() + "pixiv" + path.extname(item.href),
                headers,
            })
                .then(() => {
                    console.log(
                        `Download ${path.basename(item.href)} Completed`
                    );
                    return;
                })
                .catch((err) => {
                    // fs.writeFileSync("./errorInfo.js", err.toString());
                    fs.appendFile("./errorInfo.js", err.toString(), (err) => {
                        if (err) throw err;
                      });
                    return;
                });
        }
    } 

    browser.close();
})();
