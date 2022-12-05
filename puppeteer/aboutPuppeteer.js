// puppeteer对象
const puppeteer = require('puppeteer');
// 方法
puppeteer.launch({
    ignoreHTTPSErrors :false,//是否在导航期间忽略 HTTPS 错误. 默认是 false。
    headless :false,//是否以 无头模式
    executablePath :"C:/Program Files/Google/Chrome/Application/chrome.exe",//使用本地的浏览器
    slowMo :300,//将 Puppeteer 操作减少指定的毫秒数。这样你就可以看清发生了什么，这很有用
    defaultViewport :{
        width :800,//页面宽度像素。
        height :600,// 页面高度像素。
        deviceScaleFactor :1,//设置设备的缩放（可以认为是 dpr）。默认是 1。
        isMobile :false,//是否在页面中设置了 meta viewport 标签。默认是 false
        hasTouch: true,//指定viewport是否支持触摸事件
        isLandscape: true,// 指定视口是否处于横向模式
    },
    args :['aaaa'],
    ignoreDefaultArgs :false,//
    timeout :10000,
    userDataDir
/* 用户数据路径，这样chrome可以使用你的一些设置和缓存
注意： 如果用户数据路径中包含中文，记得将js保存为utf8格式，以免不认识 */
})
puppeteer.connect(options)
puppeteer.createBrowserFetcher([options])
puppeteer.defaultArgs([options])
puppeteer.executablePath()

