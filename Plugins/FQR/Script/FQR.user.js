// ==UserScript==
// @name         KoGaMa: F QR
// @namespace    https://github.com/LowOnGravity
// @version      1.0
// @description  Get rid of new Share with QR buttons all over the site
// @author       Simon
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.imgur.com/UHO8XjR.jpg
// @grant        none
// ==/UserScript==
const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}




injectCss("FQR",`
/* QR on profile */
.MuiIconButton-root {
display: none;
}
.MuiIconButton-root:hover {
display: none;
}

/* Models N the Rest */
._5_A8n._2nEPs {
display: none;
}
._5_A8n._3g-6H {
display: none;
}
}`)
