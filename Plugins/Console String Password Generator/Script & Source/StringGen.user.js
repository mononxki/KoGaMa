// ==UserScript==
// @name         KoGaMa Addon: DevConsole - String Password Generator 
// @namespace    Simple and useful.
// @version      1.1
// @description  Simply enable this script and head onto your dev-console to see all generated strings.
// @author       Simon  { Low On Gravity } 
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.pinimg.com/564x/59/d1/21/59d12160b7db286e06f1e0c23eaaa16a.jpg
// @grant        none
// ==/UserScript==

setTimeout(() => {
for (let i = 1; i <= 4; i++) {
console.clear()
}
}, "1000")


setTimeout(() => {
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$!@#_=_;.,$!*&';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

for (let i = 1; i <= 80; i++) {
console.log(makeid(45)); //amount of generated strings
}

}, "2000")