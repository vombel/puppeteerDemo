const puppeteer = require("puppeteer"); //木偶模块
// 下载模块
const axios = require("axios");
const request = require("request");
const https = require("https");
const download = require("download");
const { DownloaderHelper } = require("node-downloader-helper");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const cheerio = require("cheerio");
// 文件读写
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const strace = require("./utils/strace");

async function load() {
    const browser = await puppeteer.launch({
        // ignoreHTTPSErrors: true,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: false,
        // timeout: 10000,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );
    // await page.setViewport({ width: 1200, height: 800 });
    for (let i = 135914; i > 135814; i--) {
        await page.goto(`https://www.qinimg.com/image/${i}.html`);

        const content = await page.content();
        console.log(`加载页面完成`);

        $ = cheerio.load(`${content}`);
        const list = $("p>a", "#image");
        console.log($("p>a", "#image").length);
        const imgarray = [];
        list.each((index, element) => {
            //  console.log(element.attribute)
            // console.log(element.attribs.href);
            imgarray.push(element.attribs.href);
        });

        console.log("准备下载");
        for (let index = 0; index < imgarray.length; index++) {
            const item = imgarray[index];

            console.log(item);

            const filePath = `第${i}章${index}页.jpg`;
            axios({
                method: "get",
                url: item,
                responseType: "stream",
            }).then(function (response) {
                response.data.pipe( fs.createWriteStream(`./image/${filePath}`));
            });

            await page.waitFor(1000);
        }
        console.log(`第${i}章下载完毕`);
        await page.waitFor(2000);
    }

    async function getResourceContent(page, url) {
        const { content, base64Encoded } = await page._client.send(
            "Page.getResourceContent",
            { frameId: String(page.mainFrame()._id), url }
        );
        assert.equal(base64Encoded, true);
        return content;
    }

    async function downloadImage(page, url, filename) {
        filename = "./setu" + filename;
        const content = await getResourceContent(page, url);
        const contentBuffer = Buffer.from(content, "base64");
        fs.writeFileSync(filename, contentBuffer, "base64");
    }

    browser.close();
}

load();
