// ==UserScript==
// @name         KoGaMa Addon: Easy Reedem Available Badges.
// @namespace    Simple and useful.
// @version      1.1
// @description  Simply enable this script and head onto your profile page.
// @author       Simon  { Low On Gravity } 
// @match        https://www.kogama.com/profile/*
// @match        https://kogama.com.br/profile/*
// @match        https://friends.kogama.com/profile/*
// @icon         https://i.pinimg.com/564x/59/d1/21/59d12160b7db286e06f1e0c23eaaa16a.jpg
// @grant        none
// ==/UserScript==

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
