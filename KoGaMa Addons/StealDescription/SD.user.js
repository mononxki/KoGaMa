// ==UserScript==
// @name         Easily Copy Descriptions
// @namespace    discord/@simonvhs
// @version      1.3
// @description  Attaches a copy text button at the end of each description element.
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addCopyButton() {
        var descriptionDiv = document.querySelector('div[itemprop="description"]');

        if (descriptionDiv) {
            var copyButton = document.createElement('button');
            copyButton.textContent = 'Copy Description';
            copyButton.style.display = 'block';
            copyButton.style.marginTop = '10px';
            copyButton.style.marginBottom = '10px';

            copyButton.addEventListener('click', function() {
                var descriptionText = getDescriptionText(descriptionDiv);
                copyToClipboard(descriptionText);
                showCustomNotification('Description copied to clipboard!');
            });

            descriptionDiv.appendChild(copyButton);
        }
    }

    function getDescriptionText(descriptionDiv) {
        var textNodes = Array.from(descriptionDiv.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent.trim());

        var buttonTextIndex = textNodes.findIndex(text => text === 'Copy Description');
        if (buttonTextIndex !== -1) {
            textNodes.splice(buttonTextIndex, 1);
        }

        return textNodes.join('\n');
    }

    function copyToClipboard(text) {
        var tempTextarea = document.createElement('textarea');
        tempTextarea.value = text;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
    }

    function showCustomNotification(message) {
        var notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '10px';
        notification.style.background = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = '#fff';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '9999';
        notification.style.transition = 'opacity 0.3s ease-in-out';

        document.body.appendChild(notification);

        setTimeout(function() {
            notification.style.opacity = '0';

            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 2000);
    }

    window.addEventListener('load', addCopyButton);
})();
