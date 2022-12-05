// page对象
// 事件
Events
page.on('close') //当页面关闭时触发。
page.on('console') 
//当页面js代码调用了 console 的某个方法 js源码中传给 console.log 的参数，会传给 console 事件的监听器。
// 传递msg 通过msg.args() 拿到参数
page.on('dialog')
/* 
当js对话框出现的时候触发，比如alert, prompt, confirm 或者 beforeunload。
Puppeteer可以通过Dialog's accept 或者 dismiss来响应弹窗。
*/
page.on('domcontentloaded')
// 当页面的 DOMContentLoaded事件被触发时触发。
page.on('error') 
// 当页面崩溃时触发。
page.on('frameattached') 
// 当 iframe 加载的时候触发。
page.on('framedetached')
// 当 iframe 从页面移除的时候触发。
page.on('framenavigated')
// 当 iframe 导航到新的 url 时触发。
page.on('load')
// 当页面的 load 事件被触发时触发。
page.on('metrics')
// 当页面js代码调用了 console.timeStamp 方法时触发
page.on('pageerror')
// 当发生页面js代码没有捕获的异常时触发。
page.on('request')
// 当页面发送一个请求时触发。参数 request 对象是只读的
page.on('requestfailed')
// 当页面的请求失败时触发。比如某个请求超时了。
page.on('requestfinished')
// 当页面的某个请求成功完成时触发。
page.on('response')
// 当页面的某个请求接收到对应的 response 时触发。
page.on('workercreated')
// 当页面生成相应的 WebWorker 时触发。
page.on('workerdestroyed')
// 当页面终止相应的 WebWorker 时触发。

// Namespaces
Namespaces
page.accessibility
page.coverage
page.keyboard
page.mouse
page.touchscreen
page.tracing


// 方法
Methods
// 客户端模拟
page.setViewport(viewport)// 设置视图大小
page.setUserAgent(userAgent) //设置UserAgent
page.setCookie(...cookies)//设置Cookie
// 设置其他的HTTPHeaders 每个 HTTP 请求都会带上这些请求头。对象中值必须是字符串
page.setExtraHTTPHeaders(headers)
// emulate函数 设置常用设备预设
page.emulate(options) //iPhone
// 根据指定的参数和 user agent 生成模拟器
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone = devices['iPhone 6'];
// puppeteer 提供了一些设备的参数选项，可以通过 require('puppeteer/DeviceDescriptors') 命令引入
page.emulateMedia(mediaType)
// 改变页面的css媒体类型。支持的值仅包括 'screen', 'print' 和 null

// 页面跳转相关 也可以同通过执行js跳转和模拟点击link跳转 navigator history
page.goto(url, options)  //可以添加 referer 
page.goBack(options)    //前进
page.goForward(options) //后退 导航到页面历史的后一个页面。
page.reload(options)

// 元素选择 
// 类似于document.querySelector和document.querySelectorAll。
page.$(selector) 

page.$$(selector)
// 还有一个使用xpath的select版本。
page.$x(expression)

// 模拟输入
// 1 mouse
page.mouse
// 2 keyboard
page.keyboard
// 模拟输入函数
page.click(selector, [options])    //    在被选择元素上模拟点击 如果需要会把此元素滚动到可视
page.type(selector, text,[options])  //  在被选择的输入框中输入
page.hover(selector)               // 模拟鼠标移动到被选择元素上
page.select(selector, ...values)       // 在被选择元素上模拟选择select选项
page.tap(selector)                    //在被选择元素上模拟触摸
page.focus(selector)  //此方法找到一个匹配selector的元素，并且把焦点给它。 如果没有匹配的元素，此方法将报错
// 等待执行函数
/* 
const navigationPromise = page.waitForNavigation();
await page.click('a.my-link'); 
await navigationPromise; 
*/
page.waitForNavigation(options) //等待跳转结束，例如点击搜索按钮后，等待跳转至搜索结果页面。
page.waitFor(selectorOrFunctionOrTimeout,[options],[ ...args]) 
page.waitForSelector(selector,[options])
page.waitForXPath(xpath,[ options])
page.waitForFunction(pageFunction,[ options],[ ...args])

page.waitForRequest(urlOrPredicate,[ options])
page.waitForResponse(urlOrPredicate, [options])

// 执行脚本
page.evaluate(pageFunction,[...args]) //类似于在控制台中执行指令。 可以执行函数返回
page.evaluateHandle(pageFunction,[ ...args])
page.evaluateOnNewDocument(pageFunction,[ ...args])

page.$$eval(selector, pageFunction, [...args])
// 此方法在页面内执行 Array.from(document.querySelectorAll(selector))，
//然后把匹配到的元素数组作为第一个参数传给 pageFunction。
page.$eval(selector, pageFunction,[...args]) //传入的选择的element元素

// 信息查看
page.url() 
page.content() //返回页面的完整 html 代码，包括 doctype。
page.frames() //加载到页面中的所有iframe标签
page.mainFrame()
page.metrics() // 包含指标数据的键值对 测试用
page.target() 
page.title() //返回页面标题.
page.viewport()
page.cookies([...urls]) 
//如果不指定任何 url，此方法返回当前页面域名的 cookie。 如果指定了 url，只返回指定的 url 下的 cookie。
page.deleteCookie(...cookies)
page.setCookie(...cookies)//设置Cookie
page.browser() //得到当前 page 实例所属的 browser 实例。

// 请求中断 拦截器
// 我们可以通过它实现一个无图模式。
page.setRequestInterception(true)
/* 
启用请求拦截器会禁用页面缓存。
interceptedRequest对象，它提供了三种响应模式：abort、continue和respond。
await page.setRequestInterception(true);
page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
        interceptedRequest.abort();
    else
        interceptedRequest.continue();
});
*/

// 内容注入
page.addScriptTag(options)
// 注入一个指定src(url)或者代码(content)的 script 标签到当前页面。
page.addStyleTag(options)
// 添加一个指定link(url)的 <link rel="stylesheet"> 标签。 或者添加一个指定代码(content)的 <style type="text/css"> 标签。

// 内容保存
page.pdf([options]) // PDF 保存为pdf
page.screenshot([options]) // screenshot 截屏


page.authenticate(credentials)
// 为HTTP authentication 提供认证凭据 。 token!!
page.bringToFront()
// 相当于多个tab时，切换到某个tab。
page.close([options])
// page.close() 在 beforeunload 处理之前默认不执行


page.exposeFunction('ceshi', puppeteerFunction) //将一个方法挂载到window上 以方便调用

page.isClosed()
page.queryObjects(prototypeHandle)
// 此方法遍历js堆栈，找到所有带有指定原型的对象
page.setBypassCSP(enabled) 
// 设置绕过页面的安全政策
page.setCacheEnabled([enabled])
// 设置每个请求忽略缓存。默认是启用缓存的。
page.setContent(html, [options])
// ？ 渲染
page.setDefaultNavigationTimeout(timeout)
// 最多等待时间，单位是毫秒
page.setGeolocation(options)
// await page.setGeolocation({latitude: 59.95, longitude: 30.31667}); 
//  browserContext.overridePermissions 授予页面权限去读取地址位置。
// 设置地理位置、、、
page.setJavaScriptEnabled(enabled)
// 是否启用js
page.setOfflineMode(enabled)
// 设置 true, 启用离线模式。
page.workers()

