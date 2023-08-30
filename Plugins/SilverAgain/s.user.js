// ==UserScript==
// @name         SilverAgain
// @namespace    github.com/ukishyo
// @version      1.1
// @description  Say Hello to Silver once more.
// @author       Simon
// @match        https://www.kogama.com/profile/*
// @icon         https://i.pinimg.com/564x/76/1c/e6/761ce6d5864fe5be8b2adcc578199bb6.jpg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    const scriptTags = document.getElementsByTagName('script');

    for (const scriptTag of scriptTags) {
        if (scriptTag.innerText.includes('"silver":')) {
            const startIndex = scriptTag.innerText.indexOf('"silver":');
            const endIndex = scriptTag.innerText.indexOf(',', startIndex);
            const silverValue = parseInt(scriptTag.innerText.slice(startIndex + 9, endIndex), 10);

            const silverDisplay = document.createElement('div');
            silverDisplay.className = 'silver data';
            silverDisplay.textContent = `Silver: ${silverValue}`;


            silverDisplay.style.color = '#bfbfbf';
            silverDisplay.style.textShadow = '0 0 3px #525252';


            const targetElement = document.querySelector('#mobile-page #profile-page .section-top .progression .gold .data');

            if (targetElement) {

                targetElement.parentNode.insertBefore(silverDisplay, targetElement.nextSibling);
            }

            break;
        }
    }
})();