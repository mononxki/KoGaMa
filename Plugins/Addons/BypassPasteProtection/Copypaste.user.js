// ==UserScript==
// @name         KoGaMa Addon: Bypass Paste Protection
// @namespace    Simple and useful.
// @version      1.3
// @description  Simply enable this script and enjoy copy-pasting.
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.pinimg.com/564x/59/d1/21/59d12160b7db286e06f1e0c23eaaa16a.jpg
// @grant        none
// ==/UserScript==

(function() {
   var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
})();
