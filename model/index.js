const mongoose=require('mongoose')

async function main(){
    // admin root user
    // mongoose.connect('mongodb://setu:206320xl@124.222.211.33:27017/setu');
    mongoose.connect('mongodb://127.0.0.1:27017/setu')
}

// 连接数据库处理
main().then(()=>{
    console.log("mongodb数据库连接成功");
}).catch(err=>{
    console.log("mongodb数据库连接失败");
    console.log(err);
})

module.exports={
    Pic:mongoose.model('Pic',require('./picModel'),'pics'),
  
}
