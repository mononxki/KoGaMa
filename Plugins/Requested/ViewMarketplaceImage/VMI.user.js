// ==UserScript==
// @name         KoGaMa View Marketplace Image
// @namespace    justfindme
// @version      2.1
// @description  View images in a layered overlay on the page
// @author       Simon
// @match        https://www.kogama.com/marketplace/*
// @match        https://www.kogama.com/profile/*/marketplace/avatar/*
// @match        https://www.kogama.com/profile/*/marketplace/model/*
// @grant        GM_addStyle
// ==/UserScript==
 // MARKETPLACE ITEM PREVIEW
(function () {
    'use strict';

    GM_addStyle(`
        .overlay-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999; /* Updated z-index to 9999 */
            background: rgba(0, 0, 0, 0.7); /* Darkened overlay */
            justify-content: center;
            align-items: center;
        }

        .image-container {
            position: relative;
            width: 90%;
            height: 90%;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }



        .link-button {
            position: absolute;
            bottom: 74px;
            right: 50%
             transform: translateX(50%);
            width: 180px;
            height: 45px;
             white-space: nowrap;
            background-color: #3EAA5A;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
           text-align: center;
            z-index: 10001;
            transition: all  0.7s ease-in-out;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        }
         .link-button:hover {
         background-color:# 63AA75;
         box-shadow: 0px 0px 15px #66EE88;

         }
    `);

    function extractImageUrl(element) {
        const backgroundImage = element.style.backgroundImage;
        return backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    }

    function createViewOverlay(imageUrl) {
        const overlayContainer = document.createElement('div');
        overlayContainer.classList.add('overlay-container');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function () {
            overlayContainer.style.display = 'none';
        });

        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';

        const linkButton = document.createElement('button');
        linkButton.classList.add('link-button');
        linkButton.textContent = 'Copy Link';
        linkButton.addEventListener('click', function (event) {
            event.stopPropagation();
            copyToClipboard(imageUrl);
        });

        imageContainer.appendChild(closeButton);
        imageContainer.appendChild(img);
        overlayContainer.appendChild(imageContainer);
        overlayContainer.appendChild(linkButton);
        document.body.appendChild(overlayContainer);

        overlayContainer.addEventListener('click', function () {
            overlayContainer.style.display = 'none';
        });

        overlayContainer.style.display = 'flex';
    }

    function createViewButton(shopItem) {
        const viewButton = document.createElement('button');
        viewButton.style.position = 'absolute';
        viewButton.style.top = '5px';
        viewButton.style.right = '15px';
        viewButton.style.zIndex = '97';
        viewButton.style.width = '32px';
        viewButton.style.height = '32px';
        viewButton.style.background = 'url(https://i.imgur.com/vQtwuy7.png) center/cover no-repeat';

        viewButton.addEventListener('click', function (event) {
            event.stopPropagation();
            const imageUrl = extractImageUrl(shopItem.querySelector('.shop-image'));
            createViewOverlay(imageUrl);
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

    function copyToClipboard(text) {
        const textField = document.createElement('textarea');
        textField.value = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        document.body.removeChild(textField);
    }

    processShopItems();

    setInterval(processShopItems, 500);
    })();
