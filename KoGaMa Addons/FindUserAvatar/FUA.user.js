// ==UserScript==
// @name         Find User Avatar
// @namespace    discord/@simonvhs
// @version      1.1
// @description  Tries to locate an avatar owned by other user.
// @author       ⛧ sim
// @match        https://www.kogama.com/profile/*/avatars/
// ==/UserScript==

(function() {
    'use strict';

    if (!/^https:\/\/www\.kogama\.com\/profile\/\d+\/avatars\/?$/.test(window.location.href)) {
        return;
    }

    function addButtonsToAvatar(avatar) {
        if (avatar.querySelector('.marketplace-button')) {
            return;
        }
        const avatarNameElement = avatar.querySelector('._2uIZL');
        const avatarName = avatarNameElement.textContent.trim();
        const backgroundImageStyle = avatar.querySelector('._3Up3H').getAttribute('style');
        const imageUrlMatch = backgroundImageStyle.match(/url\("([^"]+)"\)/);
        const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';

        const marketplaceButton = document.createElement('button');
        marketplaceButton.textContent = 'Find';
        marketplaceButton.className = 'marketplace-button';
        marketplaceButton.style.cssText = `
            position: absolute;
            bottom: 15%;
            left: 37%;
            z-index: 999;
            padding: 6px 12px;
            background-color: #1a1a1a;
            color: #fff;
            border: none;
            border-radius: 17px;
            cursor: pointer;
        `;

        marketplaceButton.addEventListener('click', function() {
            const requestUrl = `https://www.kogama.com/model/market/?page=1&count=200&order=undefined&category=avatar&orderBy=created&q=${encodeURIComponent(avatarName)}`;

            fetch(requestUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.data.length === 1) {
                        console.log('Single object found:');
                        console.log(data.data[0]);
                        openMarketplacePage(data.data[0]);
                    } else {
                        let foundMatch = false;
                        for (const object of data.data) {
                            if (getBaseUrl(object.image_large) === getBaseUrl(imageUrl)) {
                                console.log('Match Found:');
                                console.log(object);
                                foundMatch = true;
                                openMarketplacePage(object);
                                break;
                            }
                        }
                        if (!foundMatch) {
                            showNotification('Entity not found. No longer sold or the name has been changed.');
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });

        avatar.style.position = 'relative';
        avatar.appendChild(marketplaceButton);
    }

    function openMarketplacePage(object) {
        const productId = object.product_id;
        const marketplaceUrl = `https://www.kogama.com/marketplace/avatar/${productId}/`;
        window.open(marketplaceUrl, '_blank');
    }

    function getBaseUrl(url) {
        return url.split('?')[0];
    }

    function rescanAvatars() {
        const avatars = document.querySelectorAll('.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 .MuiGrid-item');

        avatars.forEach(avatar => {
            addButtonsToAvatar(avatar);
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            border-radius: 14px;
            font-size: 14px;
            z-index: 9999;
            backdrop-filter: blur(4px);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2400);
    }

    window.addEventListener('load', function() {
        console.log('Page fully loaded');

        setTimeout(function() {
            rescanAvatars();

            setInterval(function() {
                const missingButtons = document.querySelectorAll('.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2 .MuiGrid-item:not(:has(.marketplace-button))');
                if (missingButtons.length > 0) {
                    rescanAvatars();
                }
            }, 5000);
        }, 2000);
    });
})();
