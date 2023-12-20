// ==UserScript==
// @name         KoGaMa Theme: Hover to DM.
// @namespace    https://greasyfork.org/en/users/776013-scrvbie
// @version      1.o
// @description  Simple yet fun.
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.pinimg.com/564x/b8/d1/be/b8d1be09beb86f973100d50d1e3d0c65.jpg
// @grant        none
// ==/UserScript==

const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}

injectCss("HoverDms",`
  .zUJzi
  {
    width: 110px;
    height: 10px;
    transition: height 0.3s;
    transition: width 0.3s;
  }

  .zUJzi:hover
  {
   height: 400px;
   width: 500px;
       transition: height 0.3s;
    transition: width 0.3s;
  }



}`)