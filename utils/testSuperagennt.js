const superagent=require("superagent");
// promise with async/await
(async () => {
    try {
        const res = await superagent.get("https://www.baidu.com/");
        console.log(res.text);
    } catch (err) {
        console.error(err);
    }
})();
