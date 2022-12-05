const superagent = require("superagent");
const cheerio = require("cheerio");
async function parse(fId) {
    const fUrl = "https://www.lanzouj.com/" + fId;

    let p = await superagent.get(fUrl).query({ t: new Date().getTime() });

    $ = cheerio.load(p.text);
    let kp = $("iframe").attr("src");
    let mUrl = "https://www.lanzous.com" + kp;

    let h = await superagent.get(mUrl).query({ t: new Date().getTime() }).set({
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
        referer: fUrl,
    });

    let hText = h.text.replace(/\n/g, "").replace(/\s/g, "");
    hText = hText.split("data:{'action':'downprocess','sign':'")[1];
    const sign = hText.split("','ves':1},dataType:'json'")[0];

    let g = await superagent
        .post("https://www.lanzouj.com/ajaxm.php")
        .type("form")
        .set({
            referer: mUrl,
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
        })
        .send({
            action: "downprocess",
            sign: sign,
            ves: 1,
        });
    let result = JSON.parse(g.text);
    // console.log(result.url)
    if (result.url) {
        let gUrl = result.dom + "/file/" + result.url;
        return gUrl;
    } else {
        return this.parse(fId);
    }
}

parse('https://www.lanzouj.com/i7y4nve')
