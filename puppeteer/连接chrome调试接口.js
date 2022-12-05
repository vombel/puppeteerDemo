// "C:\Program Files (x86)\Google\Chrome\Application\Chrome.exe" 
// --remote-debugging-port=9222 
// --user-data-dir=".\UserData"
// 获取调试接口
const axios = require('axios');
async function get_debug_url() {
    var rsp = await axios.get('http://127.0.0.1:9222/json/version');
    return rsp.data.webSocketDebuggerUrl;
}
/* {
    "Browser": "Chrome/71.0.3578.98",
    "Protocol-Version": "1.3",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
    "V8-Version": "7.1.302.31",
    "WebKit-Version": "537.36 (@15234034d19b85dcd9a03b164ae89d04145d8368)",
    "webSocketDebuggerUrl":     "ws://127.0.0.1:9222/devtools/browser/1b9f6012-6b9b-4450-a6a5-a0bbc8b54ee8"
} */
async function run() {
    var ws = await get_debug_url();
    console.log(ws);
    const browser = await puppeteer.connect({
        browserWSEndpoint: ws,
        defaultViewport: null
    });
    const pages = await browser.pages();
    const page = pages[0];
    await page.screenshot({ path: 'screen.png' });
    console.log("finished");
};

run();