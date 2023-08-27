function getCoupon(code){
fetch("https://www.kogama.com/api/coupon/redeem/", {
  "headers": {
    "content-type": "application/json",
  },
  "body": `{\"code\":\"${code}\"}`,
  "method": "POST",
});
}

getCoupon('coolcat')
getCoupon('fish')
getCoupon('android')
getCoupon('michal')
getCoupon('scary')
getCoupon('ifollowinstagram')
getCoupon('banana')
getCoupon('standalone-install-plugin')
getCoupon('ab1000')
