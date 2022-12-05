browser.on("targetcreated", async (info) => {
    console.log("打开了一个页面");
    await appendFileAsync("./actionInfo.json", JSON.stringify(info) + "\n");
});
browser.on("targetchanged", async (info) => {
    console.log("跳转中");
    await appendFileAsync("./actionInfo.json", JSON.stringify(info) + "\n");
});
browser.on("targetdestroyed", async (info) => {
    console.log("页面被关闭");
    await appendFileAsync("./actionInfo.json", JSON.stringify(info) + "\n");
});
browser.on("disconnected", async (info) => {
    console.log("浏览器关闭");
    // 关闭信息打印的时候 关闭浏览器中断
    // await appendFileAsync("./actionInfo.json", JSON.stringify(info));
});
