const download = require("download"); //download 下载中间件
const { DownloaderHelper } = require("node-downloader-helper"); //node-downloader-helper 下载中间件
// 文件 路径 url解析 模块
const fs = require("fs");
const path = require("path");
const url = require("url");
const {getResourceContent} =require('./strace')
// 工具函数 转换异步函数 为可使用 await
const { promisify } = require("util");
// 转换读取写入文件的fs操作函数
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
// 设置请求头
let headers = {
    "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
};
// headers.Referer="https://konachan.com"  是否设置referer 防盗链解决方式之一
// 第一种 download下载方式 data为传入的url数组
async function downloadbyDownload(data) {
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        // console.log(item);
        // 文件路径
        const filePath = `${__dirname}/image`;

        await download(item, filePath, {
            filename: Date.now() + "image" + path.extname(item),
            headers,
        })
            .then(() => {
                console.log(`Download ${path.basename(item)} Completed`);
                return;
            })
            .catch((err) => {
                // writeFileAsync("./errorinfo", err.toString());
                fs.appendFile("../errorInfo.js", err.toString());
                return;
            });
    }
}

async function downloadImage(page, url, filename) {
    filename = "download/" + filename;
    const content = await getResourceContent(page, url);
    const contentBuffer = Buffer.from(content, "base64");
    fs.writeFileSync(filename, contentBuffer, "base64");
}

exports.downloadByDownload = downloadbyDownload;
exports.downloadByTrace = downloadImage;
