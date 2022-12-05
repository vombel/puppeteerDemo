// class: Browser
// 事件
browser.on('disconnected')
browser.on('targetchanged')
browser.on('targetcreated')
browser.on('targetdestroyed')
//Methods
browser.browserContexts() //返回一个包含所有打开的浏览器上下文的数组
browser.close() //关闭 Chromium 及其所有页面
browser.createIncognitoBrowserContext() //创建一个匿名的浏览器上下文。这将不会与其他浏览器上下文分享 cookies/cache。
browser.defaultBrowserContext() //返回一个默认的浏览器上下文。这个上下文不能被关闭。

//断开 Puppeteer 和浏览器的连接，但 Chromium 进程仍然在运行。
//在调用 disconnect 之后，Browser 对象本身被认为是处理过的并不能再被使用。
browser.disconnect() 
// 返回一个新的 Page 对象。Page 在一个默认的浏览器上下文中被创建。
browser.newPage()

/* 
返回一个包含所有打开的页面的数组。页面不可见的，比如 "background_page" 将不会列在这。
不过你可以通过 target.page() 找到它们。
返回一个浏览器中所有页面的数组。 在多个浏览器上下文的情况下， 该方法将返回一个包含所有浏览器上下文中所有页面的数组。
*/
browser.pages()
// 产生浏览器的进程。如果浏览器实例是由 puppeteer.connect 方法创建的则返回null。
browser.process()
// 返回浏览器相关的目标对象。
browser.target()
/* 
浏览器内所有活动目标组成的数组。在多个浏览器上下文的情况下，
该方法将返回一个包含所有浏览器上下文中的所有目标的数组。
 */
browser.targets()
// 返回浏览器原始的 user-agent
browser.userAgent()
/* 
 对于无头的 Chromium，这类似于 HeadlessChrome/61.0.3153.0. 
 对于非无头的Chromium, 这类似于 Chrome/61.0.3153.0。
*/
browser.version()
/* 
 返回浏览器 websocket 的地址
 puppeteer.connect 可以将浏览器 websocket 端作为一个参数。其格式为 ws://${host}:${port}/devtools/browser/<id>。
 */
browser.wsEndpoint()