// ==UserScript==
// @name         KoGaMa Fix DisallowedURL Input
// @namespace    https://github.com/deeformed
// @version      1.3
// @description  Replace dots with %2E in copy-pasted links
// @author       Simon
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('paste', function(event) {
      
        const clipboardData = (event.clipboardData || window.clipboardData).getData('text');

       
        if (clipboardData.startsWith('http://') || clipboardData.startsWith('https://')) {
            
            const formattedLink = clipboardData.replace(/\./g, '%2E');

            
            document.execCommand('insertText', false, formattedLink);

            
            event.preventDefault();
        }
    });
})();
