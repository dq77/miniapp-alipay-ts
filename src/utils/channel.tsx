export default function getChannel():string {
  switch (process.env.TARO_ENV) {
    case "h5":
      let host = window.location.host;
      if (host === "jd.taozugong.com" || host === "jd.taozugong.cn") {
        return "JDBT";
      } else if (host === "m.taozugong.com" || host === "m.taozugong.cn") {
        return "M_STATION";
      } else if (host === "alipay.taozugong.com" || host === "alipay.taozugong.cn") {
        return "ALIPAY_LIFE";
      } else {
        return "M_STATION";
      }
    case "weapp":
      return "WeChat"; // 微信小程序
    case "alipay":
      return "APLIPAY_MINI_PROGRAM"; // 支付宝小程序
    default:
      return "ALIPAY_LIFE";
  }
}
