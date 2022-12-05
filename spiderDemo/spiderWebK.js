const puppeteer = require("puppeteer"); //木偶模块
// 下载模块
const fs = require("fs");
const { promisify } = require("util");
// 文件读写
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const downloadFile = require("./utils/download");
const strace = require("./utils/strace");
async function load() {
    const browser = await puppeteer.launch({
        // ignoreHTTPSErrors: true,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: false,
        // timeout: 10000,
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");
    // await page.setViewport({ width: 1200, height: 800 });
    for (let i = 1; i < 7139012; i++) {
        await page.goto(`https://danbooru.donmai.us/posts/${i}`);
        // await page.goto(`https://danbooru.donmai.us/media_assets/${i}`);

        // let targetImg = await page.waitForSelector("#image");
        let targetImg = await page.$("#image");
        if (targetImg) {
            const url = await page.$eval("#image", (i) => i.src);
            const content = await strace.getResourceContent(page, url);
            const contentBuffer = Buffer.from(content, "base64");

            fs.writeFileSync(
                `./image/${Date.now()}.jpg`,
                contentBuffer,
                "base64"
            );
            console.log(`下载第${i}张`);
        }

        await page.waitFor(1000);
    }

    // await page.screenshot({ path: "screenshot.png" });

    // await writeFileAsync("./ceshi.json", aArray);
    //等待
    console.log("结束了");
    // await downloadFile(imageHref);
    // await page.waitFor(2000);
    browser.close();
}

load();
