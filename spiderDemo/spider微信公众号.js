const url = require("url");
const qs = require("querystring");
const fs=require("fs");

const cheerio = require("cheerio");
const superagent = require("superagent");

const testUrl = `https://mp.weixin.qq.com/mp/recommendtag?c1=&c2=&tag=头像壁纸控&msg_type=1&__biz=&mid=&idx=&sn=0Xs-nSHbtXlSVh0ivOqW5hjNMRY&ext=HDumE84jvgF82uPDsrG6fizKbvFWoZ0W3YVA33RuZKqMW7hV&cardid=49a86804c72021566ba9590c5082bdb2&exptype=unsubscribed_card_recommend_article_u2i_mainprocess_coarse_sort&tag_type=8&scene=1&subscene=1#wechat_redirect`;
const realUrl =
    "https://mp.weixin.qq.com/mp/recommendtag?c1=&c2=&tag=%E5%A4%B4%E5%83%8F%E5%A3%81%E7%BA%B8%E6%8E%A7&msg_type=1&__biz=&mid=&idx=&sn=0Xs-nSHbtXlSVh0ivOqW5hjNMRY&ext=HDumE84jvgF82uPDsrG6fizKbvFWoZ0W3YVA33RuZKqMW7hV&cardid=49a86804c72021566ba9590c5082bdb2&exptype=unsubscribed_card_recommend_article_u2i_mainprocess_coarse_sort&tag_type=8&scene=1&subscene=1#wechat_redirect";
// const parseUrl=url.parse(testUrl)
// const qsUrl=qs.parse(parseUrl.query)
// console.log(qsUrl);
(async () => {
    try {
        const res = await superagent.get(realUrl);
        fs.writeFileSync('./test.html',res.text)
        // console.log(res);
    } catch (err) {
        console.error(err);
    }
})();
