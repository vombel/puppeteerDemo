const puppeteer = require("puppeteer"); //木偶模块
const cheerio = require("cheerio");
const fs = require("fs");
const { promisify } = require("util");
const appendFileAsync = promisify(fs.appendFile);
const { Pic } = require("./model/index");
async function init() {
    // 唤起chrome browser对象
    //executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",//使用本地的浏览器
    // const browser = await puppeteer.launch({
    //     // headless: false,
    //     timeout: 10000,
    // });
    const browser = await puppeteer.launch({
        // headless: false,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-blink-features=AutomationControlled",
        ],
        dumpio: false,
    });
    // 创建一个page页面对象
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "userAgent", {
            //userAgent在无头模式下有headless字样，所以需覆盖
            get: () =>
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
        });
    });
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "languages", {
            //添加语言
            get: () => ["zh-CN", "zh", "en"],
        });
    });
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        //notification伪装
        window.navigator.permissions.query = (parameters) =>
            parameters.name === "notifications"
                ? Promise.resolve({ state: Notification.permission })
                : originalQuery(parameters);
    });

    page.setBypassCSP(true);
    page.setDefaultNavigationTimeout(20000);
    // 设置UA
    await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );
    // const navigationPromise = page.waitForNavigation();
    // 跳转页面 131238
    for (let i = 106261; i < 131238; i++) {
        try {
            await page.goto(`https://www.qinimg.com/image/${i}.html`);
            console.log(`加载页面完成`);
            // await navigationPromise;
            // await page.waitForNavigation();
        } catch (e) {
            console.log(`第${i}页加载错误`);
            //await  appendFileAsync(
            //     "./errorInfo.json",
            //     `第${i}页加载错误` + "\n"
            // );
            continue;
        }

        const obj = await page.evaluate(async () => {
            let imgArray = document.querySelectorAll("#image p>a");
            const title = document.title.replace(/(?<=(\]))(.)+/, "");
            // Array.prototype.map.call((el) => el.href,imgArray);
            const imglist = Array.from(imgArray).map((el) => el.href);

            return {
                title,
                length: imglist.length,
                picarray: imglist,
            };
        });

        // const content = await page.content();

        /* 
        $ = cheerio.load(`${content}`);
        const list = $("p>a", "#image");
        console.log($("p>a", "#image").length);
        const imgarray = []; 
        list.each((index, element) => {
            imgarray.push(element.attribs.href);
        });
*/

        console.log("保存中", obj.length);
        // let title = await page.title();

        const db = new Pic({
            ...obj,
            createTime: Date.now(),
        });
        db.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${i} 页保存成功`);
            }
        });

        // await page.waitFor(1000);
    }

    await browser.close();
}

init();
