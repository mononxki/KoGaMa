// ==UserScript==
// @name          Customizable Usernames [ 4Ocean ]
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Made for Blue Ocean
// @author      zombieaztro
// @match                https://www.kogama.com/*
// @match                https://kogama.com.br/*
// @match                https://friends.kogama.com/*
// @icon         https://i.imgur.com/rbx4tiy.png
// @grant        none
// ==/UserScript==



    // Style
    let sheet = top.document.head.appendChild(top.document.createElement('style'))
        .sheet;
    sheet.insertRules = rules => rules.replace(/\}/g, '}^')
        .split('^')
        .map(r => (r.indexOf('{') + 1) && sheet.insertRule(r));
    sheet.insertRules(`

._3zDi- {

  background-image:
       linear-gradient(to right,#F3F3F5,#DBE7FC,#D3D3D3,#36669d,#FEFEFE);
  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: rainbow-animations 2000s linear infinite;
}

@keyframes rainbow-animations {
    to {
        background-position: 4500vh;


}
}


.uwn5j ._3DYYr ._28mON {
  background-image:
    linear-gradient(to right,#F3F3F5,#DBE7FC,#D3D3D3,#36669d,#FEFEFE);
  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: rainbow-animations 1400s linear infinite;
}

@keyframes rainbow-animations {
    to {
        background-position: 4500vh;

}
}

`)



