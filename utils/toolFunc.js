// 延迟工具函数
/* async function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
} */
// 工具类
class Tools {
    // 延迟函数 传入延迟毫秒数
    static sleep(delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(1);
                } catch (e) {
                    reject(0);
                }
            }, delay);
        });
    }

    /**
     * [TimeTools description]
     * @param {[type]} timestamp  12312312312312
     * @param {[type]} formatStr Y年M月D日
     *
     * M: month 1~12
     * Y: year 2017
     * D: date 0 ~ 31
     */
    // 格式化时间戳
    static moment(formatStr, timestamp) {
        let date = new Date(timestamp || new Date().getTime());

        let M = date.getMonth() + 1;

        let Y = date.getFullYear();

        let D = date.getDate();

        let h = date.getHours();

        let m = date.getMinutes();

        let s = date.getSeconds();

        return formatStr
            .replace("M", M)
            .replace("Y", Y)
            .replace("D", D)
            .replace("h", h)
            .replace("m", m)
            .replace("s", s);
    }
}

module.exports = Tools;
