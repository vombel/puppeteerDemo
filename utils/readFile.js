const fs = require("fs");
// 工具函数 转换异步函数 为可使用 await
const { promisify } = require("util");
// 转换读取写入文件的fs操作函数
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);


async function readDemo(){
   const res= await readFileAsync('./image/第135914-0.jpg','buffer');
   console.log(res);
   await writeFileAsync(`./image/demo.jpg`,res.toString('base64'));
}
readDemo();