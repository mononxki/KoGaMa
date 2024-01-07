// ==UserScript==
// @name         Mplace View Image
// @namespace    justfindme
// @version      1.1
// @description  ppp
// @author       Simon
// @match        https://www.kogama.com/marketplace/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';


    function extractImageUrl(element) {
        const backgroundImage = element.style.backgroundImage;
        return backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    }


    function createViewButton(shopItem) {
        const viewButton = document.createElement('button');
        viewButton.style.position = 'absolute';
        viewButton.style.top = '5px';
        viewButton.style.right = '15px';
        viewButton.style.zIndex = '9999';
        viewButton.style.width = '32px';
        viewButton.style.height = '32px';
        viewButton.style.background = 'url(https://i.imgur.com/ldWTuFV.png) center/cover no-repeat';

        viewButton.addEventListener('click', function() {
            const imageUrl = extractImageUrl(shopItem.querySelector('.shop-image'));
            window.open(imageUrl, '_blank');
        });

        shopItem.appendChild(viewButton);
    }


    function processShopItems() {
        const shopItems = document.querySelectorAll('.shop-item');

        shopItems.forEach((shopItem) => {
            if (!shopItem.classList.contains('image-viewer-added')) {
                createViewButton(shopItem);
                shopItem.classList.add('image-viewer-added');
            }
        });
    }


    processShopItems();


    setInterval(processShopItems, 500);
})();
