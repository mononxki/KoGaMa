// ==UserScript==
// @name         KoGaMa Allow URL Input
// @namespace    discord/@simonvhs
// @version      0.4
// @description  No more errors, gosh!
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('paste', function(event) {

        const clipboardData = (event.clipboardData || window.clipboardData).getData('text');

        // Are you really a link?
        if (clipboardData.startsWith('http://') || clipboardData.startsWith('https://')) {

            // are you youtube?
            if (clipboardData.includes('youtu.be') || clipboardData.includes('youtube.com')) {
                // youtube? no deal
                document.execCommand('insertText', false, clipboardData);
            } else {
                // not youtube? deal
                const formattedLink = clipboardData.replace(/\./g, '%2E');
                document.execCommand('insertText', false, formattedLink);
            }

            event.preventDefault();
        }
    });
})();
