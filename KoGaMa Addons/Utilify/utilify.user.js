// ==UserScript==
// @name         Utilify: KoGaMa
// @namespace    discord/@simonvhs
// @version      3.2.2
// @description  KoGaMa Utility script that aims to port as much KoGaBuddy features as possible alongside adding my own.
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// @match        https://www.kogama.com/profile/*
// @match        https://www.kogama.com/games/*
// @match        https://www.kogama.com/build/*
// @match        https://www.kogama.com/marketplace/model/*
// @match        https://www.kogama.com/marketplace/avatar/*
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @downloadURL https://update.greasyfork.org/scripts/491505/Utilify%3A%20KoGaMa.user.js
// @updateURL https://update.greasyfork.org/scripts/491505/Utilify%3A%20KoGaMa.meta.js
// ==/UserScript==

// CREDITS TO RAPTORFIRMAX FOR NOTICITNG AN ISSUE WITH LOGGING SCREEN.

// - Allow Paste
// - Auto Block Users
// - Basic User/Game mentions
// - Better Titles
// - Compact Menu
// - Console Warning
// - Creator Credits
// - Edit Website Gradient
// - Faster Friendslist
// - Find User Avatars
// - Fix Tylda syntax
// - Friend Status Counter
// - GetRidOfImageStrokes
// - HeadersInDescription
// - KoGaMaBuddy emojis
// - Preview Marketplace Images
// - PrivacyBlur
// - RememberSafetyNotification
// - RichText
// - Steal Description
// - User Backgrounds
// - User Gradients


// NON-FUNCTIONAL:
// - Allow URL input

(function() {
    'use strict';
    function waitForElement(selector, callback) {
        var element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(function() {
                waitForElement(selector, callback);
            }, 100);
        }
    }
    function parseMarkdown(text) {
        const lines = text.split('<br>');
        const processedLines = lines.map(line => {
            if (line.startsWith('### ')) {
                return '<h3>' + line.substring(4) + '</h3>';
            } else if (line.startsWith('## ')) {
                return '<h2>' + line.substring(3) + '</h2>';
            } else if (line.startsWith('# ')) {
                return '<h1>' + line.substring(2) + '</h1>';
            }
            line = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
            line = line.replace(/\*(.+?)\*/g, '<i>$1</i>');
            line = line.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
            return line;
        });
        return processedLines.join('<br>');
    }
    waitForElement('div.MuiPaper-root._1rJI8 div._1aUa_[itemprop="description"]', function(element) {
        var originalText = element.innerHTML;
        var processedText = parseMarkdown(originalText);
        element.innerHTML = processedText;
    });
})();


(function() {
    'use strict';

    function isMassPurchaseURL() {
        return window.location.pathname.endsWith('/masspurchase');
    }

    if (!isMassPurchaseURL()) {
        return;
    }

    var menuDiv = document.createElement('div');
    menuDiv.style.position = 'fixed';
    menuDiv.style.top = '50%';
    menuDiv.style.left = '50%';
    menuDiv.style.transform = 'translate(-50%, -50%)';
    menuDiv.style.background = 'rgba(0, 0, 0, 0.5)';
    menuDiv.style.padding = '20px';
    menuDiv.style.zIndex = '999';
    menuDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
    menuDiv.style.borderRadius = '10px';
    menuDiv.style.backdropFilter = 'blur(10px)';
    menuDiv.style.height = '320px';
    menuDiv.style.display = 'flex';
    menuDiv.style.flexDirection = 'column';
    menuDiv.style.justifyContent = 'space-around';

    var objectTypeLabel = document.createElement('label');
    objectTypeLabel.textContent = 'OBJECT TYPE: ';
    objectTypeLabel.style.color = '#fff';
    var objectTypeSelect = document.createElement('select');
    var avatarOption = document.createElement('option');
    avatarOption.value = 'avatar';
    avatarOption.textContent = 'Avatar';
    var modelOption = document.createElement('option');
    modelOption.value = 'model';
    modelOption.textContent = 'Model';
    objectTypeSelect.appendChild(avatarOption);
    objectTypeSelect.appendChild(modelOption);
    objectTypeSelect.style.backgroundColor = 'black';
    objectTypeSelect.style.color = 'white';
    objectTypeSelect.style.padding = '5px';
    objectTypeSelect.style.borderRadius = '5px';
    objectTypeSelect.style.width = '100px';
    objectTypeLabel.appendChild(objectTypeSelect);
    menuDiv.appendChild(objectTypeLabel);

    var objectIdLabel = document.createElement('label');
    objectIdLabel.textContent = 'ID: ';
    objectIdLabel.style.color = '#fff';
    var objectIdInput = document.createElement('input');
    objectIdInput.type = 'text';
    objectIdInput.style.backgroundColor = 'black';
    objectIdInput.style.color = 'white';
    objectIdInput.style.padding = '5px';
    objectIdInput.style.borderRadius = '5px';
    objectIdInput.style.width = '50px';
    objectIdLabel.appendChild(objectIdInput);
    menuDiv.appendChild(objectIdLabel);

    var loopAmountLabel = document.createElement('label');
    loopAmountLabel.textContent = 'AMOUNT OF LOOPS: ';
    loopAmountLabel.style.color = '#fff';
    var loopAmountInput = document.createElement('input');
    loopAmountInput.type = 'number';
    loopAmountInput.style.backgroundColor = 'black';
    loopAmountInput.style.color = 'white';
    loopAmountInput.style.padding = '5px';
    loopAmountInput.style.borderRadius = '5px';
    loopAmountInput.style.width = '100px';
    loopAmountLabel.appendChild(loopAmountInput);
    menuDiv.appendChild(loopAmountLabel);

    var goldRequiredText = document.createElement('div');
    goldRequiredText.style.color = 'yellow';
    goldRequiredText.style.marginTop = '10px';
    goldRequiredText.textContent = 'Gold Required: 0';
    menuDiv.appendChild(goldRequiredText);

    var targetReceivesText = document.createElement('div');
    targetReceivesText.style.color = '#fff';
    targetReceivesText.style.marginTop = '10px';
    targetReceivesText.textContent = 'Target Receives: 0 gold';
    menuDiv.appendChild(targetReceivesText);

    var purchaseButton = document.createElement('button');
    purchaseButton.textContent = 'PURCHASE';
    purchaseButton.style.backgroundColor = 'green';
    purchaseButton.style.color = 'white';
    purchaseButton.style.padding = '5px';
    purchaseButton.style.borderRadius = '5px';
    purchaseButton.style.width = '100px';
    purchaseButton.style.margin = '0 auto';
    purchaseButton.style.marginTop = '20px';
    menuDiv.appendChild(purchaseButton);

    document.body.appendChild(menuDiv);

    var infoDiv = document.createElement('div');
    infoDiv.style.position = 'fixed';
    infoDiv.style.bottom = '20px';
    infoDiv.style.left = '50%';
    infoDiv.style.transform = 'translateX(-50%)';
    infoDiv.style.background = 'rgba(0, 0, 0, 0.8)';
    infoDiv.style.padding = '10px';
    infoDiv.style.borderRadius = '5px';
    infoDiv.style.color = '#fff';
    infoDiv.style.zIndex = '999';
    infoDiv.textContent = 'No requests sent yet.';
    document.body.appendChild(infoDiv);

    purchaseButton.addEventListener('click', function() {
        var objectType = objectTypeSelect.value;
        var objectId = objectIdInput.value;
        var loopCount = parseInt(loopAmountInput.value);

        if (loopCount < 0) {
            loopCount = 0;
            loopAmountInput.value = 0;
        }

        var count = 0;
        var successCount = 0;

        function purchaseWithDelay() {
            var fetchURL = '';
            if (objectType === 'avatar') {
                fetchURL = `https://www.kogama.com/model/market/a-${objectId}/purchase/`;
            } else if (objectType === 'model') {
                fetchURL = `https://www.kogama.com/model/market/i-${objectId}/purchase/`;
            }

            fetch(fetchURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            .then(response => {
                if (response.ok) {
                    successCount++;
                    updateInfoDiv(count, successCount, loopCount);
                } else {
                    updateInfoDiv(count, successCount, loopCount, false);
                }
            })
            .catch(error => {
                updateInfoDiv(count, successCount, loopCount, false);
            })
            .finally(() => {
                count++;
                if (count < loopCount) {
                    setTimeout(purchaseWithDelay, 30000);
                }
            });
        }

        purchaseWithDelay();
    });

    function updateGoldAndTargetText() {
        var objectType = objectTypeSelect.value;
        var loopCount = parseInt(loopAmountInput.value);

        var goldRequired = 0;
        var targetReceives = 0;
        if (objectType === 'avatar') {
            goldRequired = Math.max(0, 140 * loopCount);
            targetReceives = Math.max(0, 14 * loopCount);
        } else if (objectType === 'model') {
            goldRequired = Math.max(0, 10 * loopCount);
            targetReceives = Math.max(0, loopCount);
        }

        goldRequiredText.textContent = `Gold Required: ${goldRequired}`;
        targetReceivesText.textContent = `Target Receives: ${targetReceives} gold`;
    }

    loopAmountInput.addEventListener('input', function() {
        var loopAmountValue = parseInt(loopAmountInput.value);
        if (loopAmountValue < 0) {
            loopAmountInput.value = 0;
        }
        updateGoldAndTargetText();
    });

    objectTypeSelect.addEventListener('change', updateGoldAndTargetText);

    function updateInfoDiv(count, successCount, totalRequests, isSuccess = true) {
        if (isSuccess) {
            var suffix = getOrdinalSuffix(successCount);
            infoDiv.textContent = `Object bought for the ${successCount}${suffix} time out of ${totalRequests} requests.`;
        } else {
            infoDiv.textContent = `Failed to purchase object. ${count} requests sent, ${successCount} successfully bought.`;
        }
    }

    function getOrdinalSuffix(number) {
        var suffixes = ['th', 'st', 'nd', 'rd'];
        var remainder = number % 100;
        return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    }

})();


(function() {
    'use strict';

    function removeElementsAndUpdateStyles() {
        var rectElements = document.querySelectorAll('.UA3TP rect');
        rectElements.forEach(function(rectElement) {
            rectElement.parentNode.removeChild(rectElement);
        });

        var nestedElements = document.querySelectorAll('.UA3TP ._11RkC');
        nestedElements.forEach(function(nestedElement) {
            nestedElement.style.stroke = 'transparent';
        });

        var svgElements = document.querySelectorAll('.Hkdag');
        svgElements.forEach(function(svgElement) {
            svgElement.parentNode.removeChild(svgElement);
        });
    }

    function handleMutations(mutationsList) {
        mutationsList.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    var rectElements = node.querySelectorAll('.UA3TP rect');
                    rectElements.forEach(function(rectElement) {
                        rectElement.parentNode.removeChild(rectElement);
                    });

                    var nestedElements = node.querySelectorAll('.UA3TP ._11RkC');
                    nestedElements.forEach(function(nestedElement) {
                        nestedElement.style.stroke = 'transparent';
                    });

                    var svgElements = node.querySelectorAll('.Hkdag');
                    svgElements.forEach(function(svgElement) {
                        svgElement.parentNode.removeChild(svgElement);
                    });
                }
            });
        });
    }

    var observer = new MutationObserver(handleMutations);

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', function() {
        removeElementsAndUpdateStyles();
    });
})();
GM_addStyle(`
    .MuiFilledInput-inputMarginDense,
    .MuiSelect-select.MuiSelect-select,
    ._13UrL .kR267 ._9smi2 ._1rJI8 {
        filter: blur(5px);
        transition: filter 0.3s ease;
    }
    .MuiFilledInput-inputMarginDense:hover,
    .MuiSelect-select.MuiSelect-select:hover,
    ._13UrL .kR267 ._9smi2 ._1rJI8:hover {
        filter: none;
    }

    ._13UrL .kR267 ._9smi2 ._1rJI8:not(::before):not(::after) {
        filter: none; /* Resetting filter for pseudo-elements */
    }
    /* Initially hide the timestamps */
    .MuiCardHeader-subheader {
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
    }

    /* On hover, make the timestamps visible */
    .MuiCardHeader-content:hover .MuiCardHeader-subheader {
        opacity: 0.6;
        }
        ._13UrL ._23KvS ._33DXe {
        filter: blur(4px) !important;
        }
`);


(function() {
    'use strict';

    const SEVEN_HOURS = 7 * 60 * 60 * 1000;

    const lastNotificationTime = localStorage.getItem('lastNotificationTime');
    const currentTime = Date.now();
    if (!lastNotificationTime || currentTime - lastNotificationTime >= SEVEN_HOURS) {
        displayNotification();
        localStorage.setItem('lastNotificationTime', currentTime);
        createBlockingLayer();
    }

    function displayNotification() {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '-100px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.background = 'rgba(0, 0, 0, 0.7)';
        notification.style.backdropFilter = 'blur(5px)';
        notification.style.padding = '20px';
        notification.style.borderRadius = '17px';
        notification.style.textShadow = '0 0 3px #00000';
        notification.style.zIndex = '9999';
        notification.style.boxShadow = '0 0 10px #825CB0';
        notification.style.transition = 'top 0.5s ease-in-out';
        notification.style.color = '#fff';
        notification.innerHTML = `
            <p style="margin: 0; font-size: 16px; font-weight: bold;">REMEMBER</p>
            <p style="margin: 10px 0; white-space: pre-line;">Someone trying to actually help you will never ask you for your password.\n\nRemember to stay safe and not trust users that seek out your personal data.\n\nWarm regards,\n<a href="https://www.kogama.com/profile/17769289/">Kaiser</a></p>
            <button style="margin-top: 10px; background: #3498db; color: #fff; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; display: block; margin: 0 auto;" id="closeBtn">Stay Safe!</button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.top = '296px';
        }, 100);

        const closeBtn = notification.querySelector('#closeBtn');
        closeBtn.addEventListener('click', () => {
            notification.style.top = '-100px';
            setTimeout(() => {
                notification.remove();
                removeBlockingLayer();
            }, 500);
        });
    }

    function createBlockingLayer() {
        const blockingLayer = document.createElement('div');
        blockingLayer.classList.add('blocking-layer');
        blockingLayer.style.position = 'fixed';
        blockingLayer.style.top = '0';
        blockingLayer.style.left = '0';
        blockingLayer.style.width = '100%';
        blockingLayer.style.height = '100%';
        blockingLayer.style.background = 'rgba(0, 0, 0, 0.5)';
        blockingLayer.style.zIndex = '9998';
        blockingLayer.style.pointerEvents = 'auto';
        document.body.appendChild(blockingLayer);
    }

    function removeBlockingLayer() {
        const blockingLayer = document.querySelector('.blocking-layer');
        if (blockingLayer) {
            blockingLayer.remove();
        }
    }
})();


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





(function() {
    'use strict';

    GM_addStyle(`
        .menu-label {
            display: inline-block;
            color: #e8e8e8;
            cursor: pointer;
            margin-top: 10px;
            margin-left: 14px;
            font-weight: 700;
        }
        .menu-icon {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            margin-bottom: 6px;
            padding-left: 3px;
        }
        .expanded-menu {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 10px;
            border-radius: 5px;
            display: none;
            z-index: 9999;
            transition: max-height 0.3s ease;
        }
        .expanded-menu.show {
            display: block;
            max-height: 200px;
            overflow-y: auto;
        }
        .expanded-menu button {
            display: block;
            background-color: transparent;
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 13px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .expanded-menu button:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        .dark-glass {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            border-radius: 21px;
        }
        .modal-content {
            background: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 21px;
            width: 300px;
            text-align: center;
        }
        .modal-content input {
            margin-bottom: 10px;
            width: calc(100% - 40px);
            padding: 8px;
            border: none;
            border-radius: 5px;
        }
        .modal-content button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }
        .modal-content button:hover {
            background-color: #45a049;
        }
        .modal-content select {
            width: calc(50% - 10px);
            padding: 8px;
            border: none;
            border-radius: 5px;
        }
        .modal-content .apply-btn {
            width: calc(50% - 10px);
        }

        .blocking-status {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            z-index: 999;
        }
        /* Friends List: Elite Frame */
.UA3TP img[src$="svg"] {
    transform: scale(1.1);
    top: 2px;
}

        .UA3TP ._3tYRU,
         .UA3TP rect {
         clip-path: circle();
       }
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 10px;
        }
    `);

    var menuLabel = document.createElement('div');
    menuLabel.className = 'menu-label';
    menuLabel.innerHTML = '<svg class="menu-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a10 10 0 1 1-2.8-6.2"></path></svg>Extras';

    var header = document.querySelector('#pageheader > .pageheader-inner');

    if (header) {
        header.appendChild(menuLabel);

        var expandedMenu = document.createElement('div');
        expandedMenu.className = 'expanded-menu';

        var menuButtons = document.createElement('div');
        menuButtons.className = 'menu-buttons';

        var gradientButton = document.createElement('button');
        gradientButton.textContent = 'Gradient';

        gradientButton.addEventListener('click', function() {
            var currentUrl = window.location.href;
            var newUrl = currentUrl + '/gradient';
            window.location.href = newUrl;
        });

        var autoblockingButton = document.createElement('button');
        autoblockingButton.textContent = 'Autoblocking';

        autoblockingButton.addEventListener('click', function() {
            var currentUrl = window.location.href;
            var newUrl = currentUrl + '/autoblocking';
            window.location.href = newUrl;
        });
        var masspurchaseButton = document.createElement('button');
        masspurchaseButton.textContent = 'Mass Purchase';

        masspurchaseButton.addEventListener('click', function() {
            var currentUrl = window.location.href;
            var newUrl = currentUrl + '/masspurchase';
            window.location.href = newUrl;
        });


        menuButtons.appendChild(gradientButton);
        menuButtons.appendChild(masspurchaseButton);
        menuButtons.appendChild(autoblockingButton);

        expandedMenu.appendChild(menuButtons);
        header.appendChild(expandedMenu);

        menuLabel.addEventListener('mouseenter', function() {
            var labelRect = menuLabel.getBoundingClientRect();
            var headerRect = header.getBoundingClientRect();
            expandedMenu.style.left = labelRect.left - headerRect.left + 'px';
            expandedMenu.style.top = labelRect.bottom - headerRect.top + 10 + 'px';
            expandedMenu.classList.add('show');
        });

        expandedMenu.addEventListener('mouseleave', function() {
            expandedMenu.classList.remove('show');
        });

        if (window.location.href.endsWith('/autoblocking')) {
            var darkGlass = document.createElement('div');
            darkGlass.className = 'dark-glass';

            var modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            var selfIdInput = document.createElement('input');
            selfIdInput.placeholder = 'SELFID';

            var usersToBlockInput = document.createElement('input');
            usersToBlockInput.placeholder = 'USERSTOBLOCK';

            var presetDropdown = document.createElement('select');
            presetDropdown.innerHTML = '<option value="">Select Preset</option>' +
                                        '<option value="null">NULL</option>' +
                                        '<option value="peaceful">Peaceful</option>' +
                                        '<option value="furtherpeace">Further Peace</option>';

            presetDropdown.addEventListener('change', function() {
                if (presetDropdown.value === 'peaceful') {
                    usersToBlockInput.value = '34445, 1186442, 2416361, 2814866, 3375976, 5037938, 8339104, 9019571, 9839184, 10183579, 10497951, 15386532, 15546142, 16154001, 16324315, 18365116, 18515594, 19222931, 19531003, 20037522, 20107599, 21232073, 21269335, 22535591, 23142079, 23213484, 23323453, 24243477, 24304847, 24388642, 25037907, 25227903, 25453113, 50156316, 50417643, 50596580, 50709102, 50980597, 51053955, 51597483, 51605152, 666676920, 667204078, 667315982, 667411050, 667414035, 667630286, 667633711, 667635238, 667767029, 667789126, 667834566, 668064310, 668124616, 668156150, 668287717, 668303247, 668332488, 668923437, 669107441, 669128099, 669333877, 669358563, 669537156, 669604901, 669605680, 669650523, 669696966, 669730391';
                } else if (presetDropdown.value === 'null') {
                    usersToBlockInput.value = '';
                } else if (presetDropdown.value === 'furtherpeace') {
                    usersToBlockInput.value = '6141, 34445, 1186442, 2416361, 2814866, 3375976, 5037938, 8339104, 9019571, 9839184, 9852276, 10183579, 10497951, 15386532, 15546142, 16154001, 16324315, 18365116, 18515594, 19222931, 19531003, 20037522, 20107599, 20570568, 21232073, 21269335, 22535591, 23142079, 23213484, 23323453, 24243477, 24304847, 24388642, 25037907, 25227903, 25453113, 50156316, 50417643, 50453248, 50596580, 50709102, 50980597, 51053955, 51597483, 51605152, 666676920, 667204078, 667315982, 667411050, 667414035, 667630286, 667633711, 667635238, 667767029, 667789126, 667834566, 668064310, 668124616, 668156150, 668287717, 668291112, 668303247, 668332488, 668923437, 669082985, 669107441, 669128099, 669203174, 669222295, 669283759, 669303784, 669333877, 669358563, 669448523, 669484907, 669537156, 669586281, 669590528, 669604901, 669605680, 669650523, 669696966, 669730391, 669779395, 669942558, 670017695, 670019951';
                }
    });

            var applyButton = document.createElement('button');
            applyButton.textContent = 'Apply';
            applyButton.className = 'apply-btn';

            applyButton.addEventListener('click', function() {
                var selfId = selfIdInput.value.trim();
                var usersToBlock = usersToBlockInput.value.trim().split(/\s*,\s*|\s+/);
                blockUsersWithDelay(selfId, usersToBlock);
            });

            modalContent.appendChild(selfIdInput);
            modalContent.appendChild(usersToBlockInput);
            modalContent.appendChild(presetDropdown);
            modalContent.appendChild(applyButton);

            darkGlass.appendChild(modalContent);
            document.body.appendChild(darkGlass);
        }
    } else {
        console.error('Header element not found!');
    }

    async function blockUsersWithDelay(selfId, usersToBlock) {
        const delayBetweenRequests = 600;
        const retryDelay = 1000;
        showNotification('Blocking users...');

        for (const userId of usersToBlock) {
            await blockUserWithRetry(selfId, userId, delayBetweenRequests, retryDelay);
            updateNotification(`User <a href="https://www.kogama.com/profile/${userId}">${userId}</a> has been blocked.`);
        }

        showNotification('All users have been blocked.');
        setTimeout(function() {
            var notification = document.querySelector('.notification');
            if (notification) {
                notification.remove();
            }
        }, 5000);
    }

    async function blockUserWithRetry(selfId, userId, delay, retryDelay) {
        try {
            await blockUserWithDelay(selfId, userId, delay);
        } catch (error) {
            if (error !== 500) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                await blockUserWithDelay(selfId, userId, delay);
            }
        }
    }

    async function blockUserWithDelay(selfId, profileId, delay) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const response = await fetch(`/user/${selfId}/block/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "X-Csrf-Token": ""
            },
            body: JSON.stringify({
                profile_id: profileId
            })
        });

        if (!response.ok) {
            throw response.status;
        }
    }

    function showNotification(message) {
        var notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = message;
        document.body.appendChild(notification);

        var notifications = document.querySelectorAll('.notification');
        var totalHeight = 0;
        notifications.forEach(function(item) {
            totalHeight += item.offsetHeight;
        });

        notification.style.top = totalHeight + 20 + 'px';
    }

    function updateNotification(message) {
        var notification = document.querySelector('.notification');
        if (notification) {
            notification.innerHTML = message;
        }
    }

    var blockingStatus = document.createElement('div');
    blockingStatus.className = 'blocking-status';
    document.body.appendChild(blockingStatus);

})();

(async () => {
    'use strict';

    // Function to fetch page data
    async function fetchPageData(pageNumber) {
        const url = `https://www.kogama.com/game/?page=${pageNumber}&count=12&filter=all`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Function to create the dark mode modal
    function createDarkModeModal() {
        const modal = document.createElement('div');
        modal.id = 'customModal';
        modal.className = 'custom-modal custom-dark-modal';
        modal.innerHTML = `
            <div class="custom-modal-content">
                <span class="custom-modal-close">&times;</span>
                <label for="searchInput">Search:</label>
                <input type="text" id="searchInput" placeholder="Search..." style="width: calc(100% - 20px); margin-bottom: 10px; background-color: #333; color: #fff;">
                <label for="userIdInput">UserID:</label>
                <input type="text" id="userIdInput" placeholder="Enter UserID..." style="width: calc(100% - 20px); margin-bottom: 10px; background-color: #333; color: #fff;">
                <p style="font-size: 12px; color: #999; margin-bottom: 10px;">Please note that extracting all your projects might take a bit, stay patient.</p>
                <ul id="elementList" style="list-style-type: none; padding: 0; max-height: 300px; overflow-y: auto; margin-top: 10px;"></ul>
            </div>
        `;

        // Append modal to body
        document.body.appendChild(modal);

        // Get close button
        const closeBtn = modal.querySelector('.custom-modal-close');

        // Close modal when close button is clicked
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Prevent clicks inside modal from closing it
        modal.querySelector('.custom-modal-content').addEventListener('click', function(event) {
            event.stopPropagation();
        });

        // Handle search input change event
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            const searchText = searchInput.value.toLowerCase();
            const listItems = modal.querySelectorAll('#elementList li');
            listItems.forEach(item => {
                const link = item.querySelector('a');
                const itemName = link.textContent.toLowerCase();
                if (itemName.includes(searchText)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Function to add button
    function addButton() {
        const parentElement = document.querySelector('div._2UG5l');

        if (!parentElement) {
            console.error('Parent element not found!');
            return;
        }

        // Create the button element
        const customButton = document.createElement('button');
        customButton.className = 'MuiButtonBase-root MuiButton-root MuiButton-text CustomButton';
        customButton.type = 'button';
        customButton.textContent = 'Search';

        // Add click event listener to the button
        customButton.addEventListener('click', function() {
            const modal = document.getElementById('customModal');
            if (modal) {
                modal.style.display = 'block';
            }
        });

        // Append the button to the parent element
        parentElement.appendChild(customButton);
    }

    // Wait for React to render the target element before adding the button
    function waitForElement() {
        const targetNode = document.querySelector('div._2UG5l');
        if (targetNode) {
            // If target node is found, create the button and dark mode modal
            addButton();
            createDarkModeModal();
        } else {
            // If not found, wait and check again after a delay
            setTimeout(waitForElement, 2000); // Adjust delay as needed
        }
    }

    // Start waiting for the target element
    waitForElement();

    // Style for the dark mode modal
    GM_addStyle(`
        .custom-dark-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .custom-modal-content {
            background-color: #333;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 30%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
            position: relative;
            color: white;
        }

        .custom-modal-close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .custom-modal-close:hover,
        .custom-modal-close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    `);

    // Function to wait for paginator element with timeout
    async function waitForPaginator() {
        return new Promise((resolve, reject) => {
            const maxAttempts = 10; // Maximum number of attempts
            let attemptCount = 0;

            const intervalId = setInterval(() => {
                attemptCount++;
                const paginator = document.querySelector('div._2Z6tA nav.MuiPagination-root ul.MuiPagination-ul');
                if (paginator) {
                    clearInterval(intervalId);
                    resolve(paginator);
                } else if (attemptCount >= maxAttempts) {
                    clearInterval(intervalId);
                    reject(new Error('Paginator not found'));
                }
            }, 2000); // Adjust delay as needed
        });
    }

    // Function to generate href based on UserID
    function generateHref(userId, objectId) {
        return `https://www.kogama.com/build/${userId}/project/${objectId}/`;
    }

    // Function to update all hrefs based on the provided UserID
    function updateHrefs(userId) {
        const elementList = document.getElementById('elementList');
        if (!elementList) return;

        const listItems = elementList.querySelectorAll('li');
        listItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const objectId = link.getAttribute('data-object-id');
                link.href = generateHref(userId, objectId);
            }
        });
    }

    try {
        const paginator = await waitForPaginator();

        const pageButtons = paginator.querySelectorAll('button[aria-label^="Go to page"]');
        let totalPages = 0;

        pageButtons.forEach(button => {
            const pageNum = parseInt(button.textContent.trim(), 10);
            if (!isNaN(pageNum) && pageNum > totalPages) {
                totalPages = pageNum;
            }
        });

        if (totalPages === 0) {
            throw new Error("Total pages number is not a valid number");
        }

        console.log(`Total Pages: ${totalPages}`);

        // Get UserID input element
        const userIdInput = document.getElementById('userIdInput');
        let userId = ''; // Initialize userId variable

        // Check if userIdInput is already filled
        if (userIdInput) {
            userId = userIdInput.value.trim();
        }

        // Listen for changes in UserID input
        userIdInput.addEventListener('input', function() {
            userId = userIdInput.value.trim();
            updateHrefs(userId);
        });

        const elementList = document.getElementById('elementList');

        for (let i = 1; i <= totalPages; i++) {
            try {
                console.log(`Fetching data from page ${i}...`);
                const content = await fetchPageData(i);

                content.data.forEach(item => {
                    if (item.id && item.name) {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = item.name;
                        link.setAttribute('data-object-id', item.id);

                        // Use the stored userId to generate href
                        link.href = generateHref(userId, item.id);

                        link.target = '_blank'; // Open link in new tab
                        listItem.appendChild(link);
                        elementList.appendChild(listItem);
                    }
                });

                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(`Failed to fetch data from page ${i}:`, error);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();


(function() {
    'use strict';

    function runScriptUnderSpecificURLs() {
        const urlPattern = /https:\/\/www.kogama.com\/profile\/\w+\/friends\//;
        if (!urlPattern.test(window.location.href)) {
            console.log('Script will not run under this URL.');
            return;
        }

        function getProfileID() {
            const url = window.location.href;
            const regex = /https:\/\/www.kogama.com\/profile\/(\w+)\/friends\//;
            const match = url.match(regex);

            if (match && match[1]) {
                return match[1];
            }

            return null;
        }

        function storeProfileID() {
            const profileID = getProfileID();

            if (profileID) {
                localStorage.setItem('kogamaProfileID', profileID);
                console.log('Profile ID stored in local storage:', profileID);
            } else {
                console.error('Unable to retrieve Profile ID from the URL.');
            }
        }

        async function fetchAndAppendFriends() {
            const profileID = localStorage.getItem('kogamaProfileID');
            if (!profileID) {
                console.error('Profile ID not found in local storage.');
                return;
            }

            const friendsURL = `https://www.kogama.com/user/${profileID}/friend/?count=555`;

            try {
                const response = await fetch(friendsURL);
                const data = await response.json();

                const friendsList = data.data.filter(friend => friend.friend_status === 'accepted');
                const friendsColumn = document.querySelector('#friendsList');

                if (!friendsColumn) {
                    console.error('Friends list container not found.');
                    return;
                }

                friendsList.forEach((friend, index) => {
                    const friendLink = document.createElement('a');
                    friendLink.href = `https://www.kogama.com/profile/${friend.friend_profile_id}/`;
                    friendLink.textContent = friend.friend_username;
                    friendLink.classList.add('friend-entry');
                    friendLink.id = `friend-${index}`;

                    friendsColumn.appendChild(friendLink);
                    friendsColumn.appendChild(document.createTextNode(', '));
                });
            } catch (error) {
                console.error('Error fetching Friendslist:', error);
            }
        }

        async function fetchAndAppendRequests() {
            const profileID = localStorage.getItem('kogamaProfileID');
            if (!profileID) {
                console.error('Profile ID not found in local storage.');
                return;
            }

            const requestsURL = `https://www.kogama.com/user/${profileID}/friend/requests/?page=1&count=1000`;

            try {
                const response = await fetch(requestsURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const responseData = await response.json();

                const sentRequests = [];
                const invitingRequests = [];

                responseData.data.forEach((request, index) => {
                    if (request.profile_id === parseInt(profileID)) {
                        sentRequests.push({
                            id: request.id,
                            friend_status: request.friend_status,
                            friend_profile_id: request.friend_profile_id,
                            friend_username: request.friend_username,
                            index: index
                        });
                    } else {
                        invitingRequests.push({
                            profile_id: request.profile_id,
                            profile_username: request.profile_username,
                            index: index
                        });
                    }
                });

                sentRequests.sort((a, b) => a.friend_username.localeCompare(b.friend_username));

                appendRequestsToList('SENT', sentRequests);
                appendRequestsToList('INVITING', invitingRequests);
            } catch (error) {
                console.error('Error fetching Requests:', error);
            }
        }

        function appendRequestsToList(listType, requests) {
            const listContainer = document.querySelector(`#${listType.toLowerCase()}List`);

            if (!listContainer) {
                console.error(`List container not found for ${listType} requests.`);
                return;
            }

            requests.forEach(request => {
                const requestLink = document.createElement('a');
                requestLink.classList.add(`${listType.toLowerCase()}-entry`);
                requestLink.id = `${listType.toLowerCase()}-${request.index}`;
                if (listType === 'INVITING') {
                    requestLink.href = `https://www.kogama.com/profile/${request.profile_id}/`;
                    requestLink.textContent = request.profile_username;
                } else {
                    requestLink.href = `https://www.kogama.com/profile/${request.friend_profile_id}/`;
                    requestLink.textContent = request.friend_username;
                }

                listContainer.appendChild(requestLink);
                listContainer.appendChild(document.createTextNode(', '));
            });
        }

       function filterEntries() {
    const searchInput = document.querySelector('#searchInput').value.toLowerCase();
    const friends = document.querySelectorAll('.friend-entry');
    const inviting = document.querySelectorAll('.inviting-entry');
    const sent = document.querySelectorAll('.sent-entry');

    friends.forEach(friend => {
        if (friend.textContent.toLowerCase().includes(searchInput)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });

    inviting.forEach(request => {
        if (request.textContent.toLowerCase().includes(searchInput)) {
            request.style.display = '';
        } else {
            request.style.display = 'none';
        }
    });

    sent.forEach(request => {
        if (request.textContent.toLowerCase().includes(searchInput)) {
            request.style.display = '';
        } else {
            request.style.display = 'none';
        }
    });

    hideUnnecessaryCommas();
}
        function hideUnnecessaryCommas() {
    const sections = ['friendsList', 'invitingList', 'sentList'];

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const links = section.querySelectorAll('a');
        const commas = section.childNodes;

        let lastVisibleLinkIndex = -1;
        commas.forEach((node, index) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === ',') {
                node.style.display = '';
                if (index - 1 > lastVisibleLinkIndex && links[index - 1].style.display === 'none') {
                    node.style.display = 'none';
                } else if (index + 1 < commas.length && links[index + 1] && links[index + 1].style.display === 'none') {
                    node.style.display = 'none';
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A' && node.style.display !== 'none') {
                lastVisibleLinkIndex = index;
            }
        });
    });
}
        function appendCustomUI() {
            const profileID = localStorage.getItem('kogamaProfileID');
            if (!profileID) {
                console.error('Profile ID not found in local storage.');
                return;
            }

            const customDiv = document.createElement('div');
            customDiv.id = 'frlscrape';
            customDiv.style.position = 'fixed';
            customDiv.style.top = '50%';
            customDiv.style.left = '50%';
            customDiv.style.transform = 'translate(-50%, -50%)';
            customDiv.style.zIndex = '9999';
            customDiv.style.width = '650px';
            customDiv.style.height = '400px';
            customDiv.style.display = 'flex';
            customDiv.style.flexDirection = 'column';
            customDiv.style.background = 'rgba(0, 0, 0, 0.9)';
            customDiv.style.backdropFilter = 'blur(21px)';
            customDiv.style.borderRadius = '10px';
            customDiv.style.padding = '10px';
            customDiv.style.color = '#fff';
            customDiv.style.overflowY = 'auto';
            customDiv.style.userSelect = 'none';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.id = 'searchInput';
            searchInput.placeholder = 'Looking for somebody?';
            searchInput.style.marginBottom = '10px';
            searchInput.style.backgroundColor = "#2222";
            searchInput.style.color = '#fff';
            searchInput.style.padding = '5px';
            searchInput.addEventListener('input', filterEntries);
            customDiv.appendChild(searchInput);

            const column1 = document.createElement('div');
            column1.id = 'friendsList';
            column1.style.flex = '1';
            column1.style.marginBottom = '20px';

            const friendsHeader = document.createElement('h2');
            friendsHeader.textContent = 'Friendslist';
            column1.appendChild(friendsHeader);

            customDiv.appendChild(column1);

            const column2 = document.createElement('div');
            column2.id = 'invitingList';
            column2.style.flex = '1';

            const invitingHeader = document.createElement('h2');
            invitingHeader.textContent = 'INVITING';
            column2.appendChild(invitingHeader);

            customDiv.appendChild(column2);

            const column3 = document.createElement('div');
            column3.id = 'sentList';
            column3.style.flex = '1';

            const sentHeader = document.createElement('h2');
            sentHeader.textContent = 'SENT';
            column3.appendChild(sentHeader);

            customDiv.appendChild(column3);

            document.body.appendChild(customDiv);

            fetchAndAppendFriends();
            fetchAndAppendRequests();

            document.addEventListener('click', function(event) {
                if (!customDiv.contains(event.target)) {
                    customDiv.remove();
                }
            });
        }

        storeProfileID();
        appendCustomUI();
    }

    runScriptUnderSpecificURLs();
})();




(function() {
    'use strict';


    GM_addStyle(`

    #searchInput::-webkit-input-placeholder {
    color: #fff;
 }
      .friend-entry {
    color: #FF69B4; /* lightmagenta */
    transform: scale(1);
    transition: 0.6s ease-in-out all;
  }
  .inviting-entry {
    color: #90EE90; /* lightgreen */
    transform: scale(1);
    transition: 0.6s ease-in-out all;
  }
  .sent-entry {
    color: #FFA500; /* orange */
    transform: scale(1);
    transition: 0.6s ease-in-out all;
  }
   .friend-entry:hover,
   .inviting-entry:hover,
   .sent-entry:hover {
         color: CEA2E8;
         transform: scale(1.1);
         text-shadow: 1px 0 7px #B640FC;
         transition: 0.6s ease-in-out all;
   }
        .custom-link {
            color: #90c288 !important; /* Change color to red */
            font-weight: italic; /* Make text bold */
            text-decoration: underline; /* Add underline */
        }
    `);


    const processedGameMentions = new Set();


    function extractUserID(mention) {
        return mention.substring(1);
    }


    function fetchUserProfile(userID, parentNode) {
        console.log(`Fetching profile for user ID: ${userID}`);
        const profileURL = `https://www.kogama.com/profile/${userID}/`;

        GM_xmlhttpRequest({
            method: "GET",
            url: profileURL,
            onload: function(response) {
                console.log(`Received response for user ID: ${userID}`);
                if (response.status === 200) {

                    const match = response.responseText.match(/{"user_id":\s*(\d+),\s*"username":\s*"([^"]+)"/);
                    if (match) {

                        const user_id = match[1];
                        const username = match[2];


                        const link = document.createElement('a');
                        link.href = profileURL;
                        link.textContent = `@${username}`;
                        link.classList.add('custom-link');


                        const regex = new RegExp(`@${userID}`, 'g');
                        parentNode.nodeValue = parentNode.nodeValue.replace(regex, '');
                        parentNode.parentNode.insertBefore(link, parentNode.nextSibling);


                        console.log(`Request sent to URL: ${profileURL}`);
                        console.log(`Fetched data: user_id: ${user_id}, username: ${username}`);
                    } else {
                        console.error(`JSON-like structure not found in response for user ID: ${userID}`);
                    }
                } else {
                    console.error(`Error fetching user profile for user ID: ${userID}. Status: ${response.status}`);
                    console.log("Response content:", response.responseText);
                }
            },
            onerror: function(error) {
                console.error(`Error fetching user profile for user ID: ${userID}`, error);
            }
        });
    }


    function fetchGameInfo(gameID, parentNode) {
        const gameURL = `https://www.kogama.com/games/play/${gameID}/`;

        GM_xmlhttpRequest({
            method: "GET",
            url: gameURL,
            onload: function(response) {
                if (response.status === 200) {

                    const match = response.responseText.match(/<title>([^<]+)<\/title>/);
                    if (match) {
                        let gameTitle = match[1];

                        gameTitle = gameTitle.replace(/ - KoGaMa.*$/, '');


                        const link = document.createElement('a');
                        link.href = gameURL;
                        link.textContent = gameTitle;
                        link.classList.add('custom-link');

                        const regex = new RegExp(`G${gameID}`, 'g');
                        parentNode.nodeValue = parentNode.nodeValue.replace(regex, '');
                        parentNode.parentNode.insertBefore(link, parentNode.nextSibling);

                    } else {
                    }
                } else {
                }
            },
            onerror: function(error) {
                
            }
        });
    }

    function findAndReplaceMentions(node) {
        const mentionRegex = /@(\d+)/;
        const gameMentionRegex = /G(\d+)/;
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "A") {
            for (const attr of node.attributes) {
                let match = mentionRegex.exec(attr.nodeValue);
                if (match !== null) {
                    const userID = match[1];
                    fetchUserProfile(userID, node);
                }
                match = gameMentionRegex.exec(attr.nodeValue);
                if (match !== null && !processedGameMentions.has(match[1])) {
                    const gameID = match[1];
                    fetchGameInfo(gameID, node);
                    processedGameMentions.add(gameID);
                }
            }
        }
        if (node.childNodes.length > 0) {
            for (const childNode of node.childNodes) {
                findAndReplaceMentions(childNode);
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            let match = mentionRegex.exec(node.nodeValue);
            if (match !== null) {
                const userID = match[1];
                fetchUserProfile(userID, node);
            }
            match = gameMentionRegex.exec(node.nodeValue);
            if (match !== null && !processedGameMentions.has(match[1])) {
                const gameID = match[1];
                fetchGameInfo(gameID, node);
                processedGameMentions.add(gameID);
            }
        }
    }


    function startScanning() {
        processedGameMentions.clear();
        findAndReplaceMentions(document.body);
        setTimeout(startScanning, 700);
    }


    if (document.readyState === 'complete') {
        startScanning();
    } else {
        window.addEventListener('load', startScanning);
    }
})();


(function() {
    'use strict';

    const emojiArray = {
        ":awoo:": "https://i.imgur.com/922iZ3g.png",
        ":ayaya:": "https://i.imgur.com/xay8Ihw.png",
        ":haah:": "https://i.imgur.com/j7RwTBt.png",
        ":haha:": "https://i.imgur.com/gqEk9fL.png",
        ":soi_smug:": "https://i.imgur.com/UK212Ao.png",
        ":junko_shook:": "https://i.imgur.com/Kg7yn6a.png",
        ":block_happy:": "https://i.imgur.com/Uo8ahxn.png",
        ":block_stylin:": "https://i.imgur.com/saI7R2F.png",
        ":sword_sad:": "https://i.imgur.com/q1mrOpK.png",
        ":sword_smirk:": "https://i.imgur.com/CAblXlZ.png",
        ":sword_yatta:": "https://i.imgur.com/Z5KAWmB.png",
        ":Acerbermad:": "https://i.imgur.com/6TasQhg.gif",
        ":Acerberisfine:": "https://i.imgur.com/H2bu8BM.gif",
        ":Acerberthink:": "https://i.imgur.com/nL56Iz1.gif",
        ":cerbersmug:": "https://i.imgur.com/AWb44VH.png",
        ":cerberdum:": "https://i.imgur.com/fV4nHCe.png",
        ":cerberded:": "https://i.imgur.com/8Tv4BRn.png",
        ":cerbersob:": "https://i.imgur.com/aL5lNnj.png",
        ":cerbercosy:": "https://i.imgur.com/yczvmt5.png",
        ":cerberpout:": "https://i.imgur.com/sF6APQ1.png",
        ":cerberwhot:": "https://i.imgur.com/vGecnjb.png",
        ":cerberlove:": "https://i.imgur.com/SEyIO3S.png",
        ":cerberlul:": "https://i.imgur.com/ugne7oK.png"
    };

    const emojiPickerDiv = document.createElement('div');
    emojiPickerDiv.id = 'emojiPicker';
    emojiPickerDiv.style.position = 'fixed';
    emojiPickerDiv.style.background = '#2f3136';
    emojiPickerDiv.style.border = '1px solid #ccc';
    emojiPickerDiv.style.padding = '10px';
    emojiPickerDiv.style.display = 'none';
    emojiPickerDiv.style.zIndex = '999999';
    emojiPickerDiv.style.maxHeight = '200px'; // Limiting height
    emojiPickerDiv.style.overflowY = 'auto'; // Adding scroll functionality
    document.body.appendChild(emojiPickerDiv);

    function updateEmojiPicker(input) {
        const inputValue = input.value;
        emojiPickerDiv.innerHTML = '';
        const filteredEmojis = Object.keys(emojiArray).filter(emoji => emoji.includes(inputValue));
        filteredEmojis.forEach(emoji => {
            const emojiContainer = document.createElement('div');
            emojiContainer.style.display = 'flex';
            emojiContainer.style.alignItems = 'center';
            emojiContainer.style.marginBottom = '5px';

            const img = document.createElement('img');
            img.src = emojiArray[emoji];
            img.title = emoji.substring(1, emoji.length - 1);
            img.alt = emoji;
            img.style.width = '20px';
            img.style.height = '20px';
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                const cursorPos = input.selectionStart;
                const textBeforeCursor = input.value.substring(0, cursorPos);
                const textAfterCursor = input.value.substring(cursorPos);
                input.value = textBeforeCursor + emoji + textAfterCursor;
                emojiPickerDiv.style.display = 'none';
                input.focus();
            });
            emojiContainer.appendChild(img);

            const emojiName = document.createElement('span');
            emojiName.textContent = emoji.substring(1, emoji.length - 1);
            emojiName.style.marginLeft = '5px';
            emojiName.style.color = '#ffffff';
            emojiContainer.appendChild(emojiName);

            emojiPickerDiv.appendChild(emojiContainer);
        });

        const inputRect = input.getBoundingClientRect();
        emojiPickerDiv.style.bottom = `${window.innerHeight - inputRect.top}px`; // Adjusted bottom position
        emojiPickerDiv.style.left = `${inputRect.left}px`;
        emojiPickerDiv.style.display = 'block';
    }

    function convertEmoji(text, emojiArray) {
        for (let emoji in emojiArray) {
            const regex = new RegExp(emoji.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
            text = text.replace(regex, `<img src="${emojiArray[emoji]}" alt="${emoji}" title="${emoji.substring(1, emoji.length - 1)}" style="width: 20px; height: 20px;">`);
        }
        return text;
    }

    function scanAndConvert(emojiArray) {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                const originalText = element.innerHTML;
                const convertedText = convertEmoji(originalText, emojiArray);
                if (originalText !== convertedText) {
                    element.innerHTML = convertedText;
                }
            }
        });

        // Convert emoji syntax within the specified React element
        const reactElement = document.querySelector('._1aUa_ [itemprop="description"]');
        if (reactElement) {
            const originalText = reactElement.innerHTML;
            const convertedText = convertEmoji(originalText, emojiArray);
            if (originalText !== convertedText) {
                reactElement.innerHTML = convertedText;
            }
        }
    }

    setInterval(() => {
        scanAndConvert(emojiArray);
    }, 700);

    document.addEventListener('input', function(event) {
        const input = event.target;
        const inputValue = input.value;

        if (inputValue.startsWith(':')) {
            updateEmojiPicker(input);
        } else {
            emojiPickerDiv.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        const target = event.target;

        if (!target.closest('#emojiPicker') && !target.closest('input')) {
            emojiPickerDiv.style.display = 'none';
        }
    });
})();

(function() {
    'use strict';

    var allowPaste = function(e) {
        e.stopImmediatePropagation();
        return true;
    };

    var handlePasted = function(event) {
        const clipboardData = (event.clipboardData || window.clipboardData).getData('text');

        // Are you really a link?
        if (clipboardData.startsWith('http://') || clipboardData.startsWith('https://')) {

            // Are you YouTube?
            if (clipboardData.includes('youtu.be') || clipboardData.includes('youtube.com')) {
                // YouTube? no deal
                document.execCommand('insertText', false, clipboardData);
            } else {
                // Not YouTube? deal
                const formattedLink = clipboardData.replace(/\./g, '%2E');
                document.execCommand('insertText', false, formattedLink);
            }

            event.preventDefault();
        }
    };

    document.addEventListener('paste', allowPaste, true);
    document.addEventListener('paste', handlePasted, true);
})();

(function() {
    'use strict';

    const profileId = window.location.pathname.split('/')[2];
    const requestUrl = `https://www.kogama.com/profile/${profileId}/`;

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const createdIndex = data.indexOf('"created":');
            const startIndex = data.indexOf('"', createdIndex + 10) + 1;
            const endIndex = data.indexOf('"', startIndex);
            const createdValue = data.substring(startIndex, endIndex);
            const createdDate = new Date(createdValue);
            const formattedDate = `${createdDate.getDate()} ${getMonthName(createdDate.getMonth())} ${createdDate.getFullYear()}, ${createdDate.getHours()}:${padZero(createdDate.getMinutes())}`;
            const targetElement = document.querySelector('._1jTCU ._20K92');
            if (targetElement) {
                targetElement.textContent = formattedDate;
            } else {
                console.error('Target element not found.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
})();


(function() {
    'use strict';

    function appendCustomButton() {
        const customButtonImageUrl = 'https://i.imgur.com/vQtwuy7.png';
        const targetElements = document.querySelectorAll('._2neko ._2eW3Y');
        targetElements.forEach(function(targetElement) {
            if (!targetElement.querySelector('.custom-button')) {
                const overlayDiv = document.createElement('div');
                overlayDiv.classList.add('overlay-div');
                overlayDiv.style.position = 'absolute';
                overlayDiv.style.top = '0';
                overlayDiv.style.left = '0';
                overlayDiv.style.width = '100%';
                overlayDiv.style.height = '100%';
                overlayDiv.style.zIndex = '9999';
                overlayDiv.style.pointerEvents = 'none';

                const customButton = document.createElement('button');
                customButton.classList.add('custom-button');
                customButton.style.position = 'absolute';
                customButton.style.top = '2px';
                customButton.style.right = '-5px';
                customButton.style.zIndex = '10000';
                customButton.style.background = 'transparent';
                customButton.style.pointerEvents = 'auto';
                customButton.innerHTML = '<img src="' + customButtonImageUrl + '" alt="Custom Button" width="32" height="32">';
                customButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const imgSrc = targetElement.querySelector('img').src;
                    displayPreview(imgSrc);
                });

                overlayDiv.appendChild(customButton);
                targetElement.appendChild(overlayDiv);
            }
        });
    }

    function displayPreview(imgSrc) {
        const darkLayer = document.createElement('div');
        darkLayer.classList.add('dark-layer');
        darkLayer.style.position = 'fixed';
        darkLayer.style.top = '0';
        darkLayer.style.left = '0';
        darkLayer.style.width = '100%';
        darkLayer.style.height = '100%';
        darkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        darkLayer.style.zIndex = '9998';

        document.body.appendChild(darkLayer);

        const previewContainer = document.createElement('div');
        previewContainer.classList.add('preview-container');
        previewContainer.style.position = 'fixed';
        previewContainer.style.top = '50%';
        previewContainer.style.left = '50%';
        previewContainer.style.transform = 'translate(-50%, -50%)';
        previewContainer.style.maxWidth = '90%';
        previewContainer.style.maxHeight = '90%';
        previewContainer.style.backgroundColor = 'transparent';
        previewContainer.style.zIndex = '9999';
        previewContainer.style.borderRadius = '5px';

        const previewImage = document.createElement('img');
        previewImage.src = imgSrc;
        previewImage.style.width = '100%';
        previewImage.style.height = 'auto';
        previewImage.style.borderRadius = '5px';

        previewContainer.appendChild(previewImage);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.position = 'absolute';
        buttonsContainer.style.bottom = '10px';
        buttonsContainer.style.left = '50%';
        buttonsContainer.style.transform = 'translateX(-50%)';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.alignItems = 'center';

        const copyLinkButton = document.createElement('button');
        copyLinkButton.textContent = 'Copy Link';
        copyLinkButton.style.marginBottom = '10px';
        copyLinkButton.addEventListener('click', function() {
            navigator.clipboard.writeText(imgSrc).then(function() {
                alert('Direct link copied to clipboard!');
            }, function() {
                alert('Failed to copy direct link.');
            });
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', function() {
            previewContainer.remove();
            darkLayer.remove();
        });

        buttonsContainer.appendChild(copyLinkButton);
        buttonsContainer.appendChild(closeButton);

        previewContainer.appendChild(buttonsContainer);

        document.body.appendChild(previewContainer);
    }

    appendCustomButton();

    setInterval(appendCustomButton, 1100);
})();


(function() {
    'use strict';

    GM_addStyle(`
        #mobile-page #error-404-page, #mobile-page #error-500-page, #mobile-page #error-disconnected-page { display: none; }
        ._3TORb { background: rgba(0, 0, 0, .14); }
        .MuiPaper-root { background-color: rgba(0, 0, 13, 0.14) !important;
             border-radius: 25px !important; }
        .jycgY ._1S6v0 ._3Wsxf .wXhWi ._23o8J { margin-left: 3px; }
        #mobile-page #profile-page .section-top .section-top-background { background-image: none !important; }
        .background-avatar { background-image: none !important; }
        ::-webkit-scrollbar { width: 1px; }
    `);

    applyGradientToElement(getSavedGradientSettings());

    if (window.location.href.endsWith("/gradient")) {
        const savedGradient = getSavedGradientSettings();
        let currentGradient = savedGradient;

        const editorContainer = document.createElement('div');
        editorContainer.id = 'gradient-editor';
        editorContainer.style.position = 'fixed';
        editorContainer.style.top = '50%';
        editorContainer.style.left = '50%';
        editorContainer.style.transform = 'translate(-50%, -50%)';
        editorContainer.style.zIndex = '10000';
        editorContainer.style.background = 'rgba(0, 0, 0, 0.4)';
        editorContainer.style.backdropFilter = 'blur(5px)';
        editorContainer.style.borderRadius = '13px';
        editorContainer.style.padding = '20px';
        editorContainer.style.boxShadow = '0 0 4px black';
        document.body.appendChild(editorContainer);

        const fixButton = createButton('Fix', fixGradientSettings);
        const copyButton = createButton('Copy Current Gradient', scrapeGradient);
        const startColorInput = createColorPicker('#ff0000', 'Start Color', updateGradient);
        const endColorInput = createColorPicker('#00ff00', 'End Color', updateGradient);
        const degreeInput = createNumberInput('45', 'Angle', updateGradient);
        const lengthInput = createRangeInput('100', 'Length', updateGradient);
        const customGradientInput = createTextInput('Your custom gradient...', updateCustomGradient);

        editorContainer.appendChild(fixButton);
        editorContainer.appendChild(copyButton);
        editorContainer.appendChild(startColorInput);
        editorContainer.appendChild(endColorInput);
        editorContainer.appendChild(degreeInput);
        editorContainer.appendChild(lengthInput);
        editorContainer.appendChild(customGradientInput);

        if (savedGradient) {
            const [startColor, endColor, degree, length] = parseGradient(savedGradient);
            startColorInput.querySelector('input').value = startColor;
            endColorInput.querySelector('input').value = endColor;
            degreeInput.querySelector('input').value = degree;
            lengthInput.querySelector('input').value = length;
        }

        function fixGradientSettings() {
            localStorage.removeItem('kogamaGradient');
            window.location.reload();
        }

        function createButton(text, onClick) {
            const button = document.createElement('button');
            button.textContent = text;
            button.addEventListener('click', onClick);
            button.style.marginTop = '10px';
            button.style.marginRight = '10px';
            button.style.padding = '5px 10px';
            button.style.borderRadius = '20px';
            button.style.bottom = '8px';
            button.style.position = 'relative';
            button.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            button.style.color = '#fff';
            button.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
            return button;
        }

        function createColorPicker(value, label, onChange) {
            const container = createInputContainer(label);
            const input = document.createElement('input');
            input.type = 'color';
            input.value = value;
            input.addEventListener('input', onChange);
            container.appendChild(input);
            return container;
        }

        function createNumberInput(value, label, onChange) {
            const container = createInputContainer(label);
            const input = document.createElement('input');
            input.type = 'number';
            input.value = value;
            input.addEventListener('input', onChange);
            container.appendChild(input);
            return container;
        }

        function createRangeInput(value, label, onChange) {
            const container = createInputContainer(label);
            const input = document.createElement('input');
            input.type = 'range';
            input.min = '0';
            input.max = '100';
            input.value = value;
            input.addEventListener('input', onChange);
            container.appendChild(input);
            return container;
        }

        function createTextInput(placeholder, onChange) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = placeholder;
            input.addEventListener('input', onChange);
            input.style.marginTop = '10px';
            input.style.padding = '5px';
            input.style.borderRadius = '10px';
            input.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            input.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            input.style.color = '#fff';
            return input;
        }

        function updateGradient() {
            const startColor = startColorInput.querySelector('input').value;
            const endColor = endColorInput.querySelector('input').value;
            const degree = degreeInput.querySelector('input').value;
            const length = lengthInput.querySelector('input').value;

            const gradient = `linear-gradient(${degree}deg, ${startColor}, ${endColor} ${length}%)`;

            applyGradientToElement(gradient);
            currentGradient = gradient;
            saveGradientSettings(gradient);
        }

        function updateCustomGradient() {
            const customGradientValue = customGradientInput.value.trim();
            if (validateGradient(customGradientValue)) {
                applyGradientToElement(customGradientValue);
                currentGradient = customGradientValue;
                saveGradientSettings(customGradientValue);
            }
        }

        function scrapeGradient() {
            navigator.clipboard.writeText(currentGradient)
                .then(() => alert('Gradient copied to clipboard!'))
                .catch(err => console.error('Failed to copy gradient: ', err));
        }

        function createInputContainer(label) {
            const container = document.createElement('div');
            container.style.marginBottom = '20px';
            container.innerHTML = `<strong>${label}:</strong>`;
            return container;
        }
    }

    function applyGradientToElement(gradient) {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        seasons.forEach(season => {
            const rootPageMobile = document.querySelector(`body#root-page-mobile.${season}`);
            if (rootPageMobile) {
                rootPageMobile.style.backgroundImage = gradient;
            }
        });
    }

    function saveGradientSettings(gradient) {
        localStorage.setItem('kogamaGradient', gradient);
    }

    function getSavedGradientSettings() {
        return localStorage.getItem('kogamaGradient');
    }

    function parseGradient(gradient) {
        const regex = /linear-gradient\((\d+)deg,\s*([^,]+),\s*([^)]+)\s+(\d+)%\)/;
        const matches = gradient.match(regex);

        if (matches) {
            const [, degree, startColor, endColor, length] = matches;
            return [startColor, endColor, degree, length];
        }

        return [];
    }

    function validateGradient(gradient) {
        const regex = /^linear-gradient\(\d+deg,\s*(#(?:[0-9a-fA-F]{3}){1,2}|rgb\(\d+\s*,\s*\d+\s*,\s*\d+\))\s*,\s*(#(?:[0-9a-fA-F]{3}){1,2}|rgb\(\d+\s*,\s*\d+\s*,\s*\d+\))\s+\d+%\)$/;
        return regex.test(gradient);
    }
})();



(function() {
    'use strict';

    function addCopyButton() {
        var descriptionDiv = document.querySelector('div[itemprop="description"]');

        if (descriptionDiv) {
            var copyButton = document.createElement('button');
            copyButton.textContent = 'Copy Description';
            copyButton.style.display = 'block';
            copyButton.style.marginTop = '10px';
            copyButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Transparent-like background color
            copyButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'; // Box shadow for glassy effect
            copyButton.style.backdropFilter = 'blur(10px)'; // Blur filter for the glassy effect
            copyButton.style.borderRadius = '8px'; // Border radius for rounded corners
            copyButton.style.marginBottom = '10px';

            // Add event listener for mouse enter event
copyButton.addEventListener('mouseenter', function() {
    // Darken the background color on hover
    copyButton.style.transition = 'background-color 0.3s ease-in-out'; // Smooth transition
    copyButton.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Darker background color
});

// Add event listener for mouse leave event
copyButton.addEventListener('mouseleave', function() {
    // Restore the original background color on mouse leave
    copyButton.style.transition = 'background-color 0.3s ease-in-out'; // Smooth transition
    copyButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Original background color
});

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


(function() {
    'use strict';

    // Function to execute after the DOM is fully loaded
    function init() {
        const profileId = window.location.pathname.split('/')[2];
        const requestUrl = `https://www.kogama.com/profile/${profileId}/`;

        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const createdIndex = data.indexOf('"created":');
                const startIndex = data.indexOf('"', createdIndex + 10) + 1;
                const endIndex = data.indexOf('"', startIndex);
                const createdValue = data.substring(startIndex, endIndex);
                const createdDate = new Date(createdValue);
                const formattedDate = `${createdDate.getDate()} ${getMonthName(createdDate.getMonth())} ${createdDate.getFullYear()}, ${createdDate.getHours()}:${padZero(createdDate.getMinutes())}`;
                const targetElement = document.querySelector('._1jTCU ._20K92');
                if (targetElement) {
                    targetElement.textContent = formattedDate;
                } else {
                    console.error('Target element not found.');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Execute the init function after DOM content is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Add a delay of 2 seconds before executing the init function
        setTimeout(init, 2000); // Adjust the delay time as needed (in milliseconds)
    });

    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
})();







(function() {
    'use strict';

    function getUsernameFromTitle() {
        const title = document.title;
        const username = title.split(' - ')[0];
        return username;
    }

    function getUserIDFromURL() {
        const userIDMatch = window.location.pathname.match(/\/profile\/([^/]+)\//);
        return userIDMatch ? userIDMatch[1] : null;
    }

    function getGameInfoFromURL() {
        const gameIDMatch = window.location.pathname.match(/\/games\/play\/([^/]+)\//);
        return gameIDMatch ? gameIDMatch[1] : null;
    }

    function setDocumentTitle() {
        const path = window.location.pathname;

        if (path.startsWith('/profile/')) {
            const username = getUsernameFromTitle();
            const userID = getUserIDFromURL();

            if (username && userID) {
                let newTitle = `${username} (${userID})`;

                // Check if the user ID is already in the title
                if (!document.title.includes(`(${userID})`)) {
                    document.title = newTitle;
                }
            }
        } else if (path.startsWith('/games/')) {
            const gameID = getGameInfoFromURL();

            if (gameID) {
                const title = document.title;
                const gameTitle = title.split(' - ')[0].trim();

                // Check if the game ID is already in the title
                if (!document.title.includes(`(${gameID})`)) {
                    document.title = `${gameTitle} (${gameID})`;
                }
            } else {
                document.title = 'Games';
            }
        } else if (path.startsWith('/build/')) {
            // Handle build page
            const title = document.title;
            if (path.split('/').length === 3) {
                document.title = 'Build';
            } else {
                const buildTitle = title.split(' - ')[0].trim();
                document.title = buildTitle;
            }
        } else if (path.startsWith('/marketplace/avatar/')) {
            // Handle avatar marketplace page
            const title = document.title;
            if (!title.includes('(Avatar)')) {
                document.title = `${title.split(' - ')[0].trim()} (Avatar)`;
            }
        } else if (path.startsWith('/marketplace/model/')) {
            // Handle model marketplace page
            const title = document.title;
            if (!title.includes('(Model)')) {
                document.title = `${title.split(' - ')[0].trim()} (Model)`;
            }
        } else if (path.startsWith('/marketplace/')) {
            const title = document.title;
            // Check if there is a subdirectory after "/marketplace/"
            if (path.split('/').length > 3) {
                // Handle specific marketplace pages
                document.title = title.split(' - ')[0].trim();
            } else {
                // Handle general marketplace page
                document.title = 'Shop';
            }
        } else if (path.startsWith('/news/')) {
            document.title = 'News';
        } else if (path.startsWith('/leaderboard/')) {
            document.title = 'Leaderboard';
        } else {
            document.title = 'KoGaMa';
        }
    }

    setDocumentTitle();

    window.addEventListener('popstate', setDocumentTitle);

    window.addEventListener('load', setDocumentTitle);
})();

// REGEX
(function() {
    'use strict';



    function addMarkdownFormatting(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/# (.*?)\n/g, '<h1>$1</h1>');
        text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');
        text = text.replace(/__(.*?)__/g, '<u>$1</u>');
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank">' + title + '</a>';
            }
        });
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');

        return text;
    }

    function formatMarkdownForElement(element) {
        if (element) {
            var formattedText = addMarkdownFormatting(element.innerHTML);
            element.innerHTML = formattedText;
        }
    }

    function checkForChanges() {
        var allElements = document.querySelectorAll('body *:not(script)');
        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                formatMarkdownForElement(element);
            }
        }

        var targetElement = document.querySelector('#description-extend .text');
        formatMarkdownForElement(targetElement);

        setTimeout(checkForChanges, 500);
    }

    window.addEventListener('load', checkForChanges);

})();

{setTimeout(() => {
const ConsoleStyle = Object.freeze({
    HEADING: "background-color:#d25858;font-size:70px;font-weight:bold;color:white;",
    NORMAL : "font-size:20px;",
    URGENT : "font-size:25px;font-weight:bold;color:red;",
    INVITE : "color: transparent;text-decoration:underline;font-weight:bold;font-size:20px;background: linear-gradient(to bottom, #865cb5, #ff69b4);-webkit-background-clip: text;background-clip: text;"
});

   console.log(`%c Chill, Cowboy! `,    ConsoleStyle.HEADING);
        console.log("%c" + "If someone told you to copy/paste something here, it's likely you're being scammed.",     ConsoleStyle.NORMAL);
        console.log("%c" + "Pasting anything in here could give attackers access to your KoGaMa account.",    ConsoleStyle.URGENT);
        console.log("%c" + "Unless you know exactly what you're doing, close this window and stay safe.",  ConsoleStyle.NORMAL);
        console.log("%c" + "You might want to consider reporting the user who told you to open it.", ConsoleStyle.NORMAL);
        console.log("%c" + "However, if you are aware of what you are doing, consider hitting me up on @simonvhs", ConsoleStyle.INVITE);
}, "2300")
}
(async function() {
    'use strict';

    const waitForElement = async (selector) => {
        while (!document.querySelector(selector)) {
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
        return document.querySelector(selector);
    };

    const InsertBeforeLoad = async () => {
        try {
            const DESCRIPTION_ELEMENT = await waitForElement('div._9smi2 > div.MuiPaper-root._1rJI8.MuiPaper-rounded > div._1aUa_');
            const DESCRIPTION_TEXT = DESCRIPTION_ELEMENT.textContent; // Using textContent instead of innerHTML
            const BACKGROUND_AVATAR = document.querySelector('._33DXe');
            const BACKGROUND_SECTION = document.querySelector('._33DXe');
            const BODY_ELEMENT = document.querySelector('body#root-page-mobile');

            // Fix REGEX
            const BACKGROUND_REGEXP = /(?:\|\|)?Background:\s*(\d+)(?:,\s*filter:\s*(light|dark|blur|none|rain))?;?(?:\|\|)?/i;
            const GRADIENT_REGEXP = /linear-gradient\((?:\d+deg, )?(#[0-9a-fA-F]{6}, #[0-9a-fA-F]{6}(?: \d+%)?)\)/i;
            const match = BACKGROUND_REGEXP.exec(DESCRIPTION_TEXT);
            const gradientMatch = GRADIENT_REGEXP.exec(DESCRIPTION_TEXT);

            if (match && typeof match == 'object') {
                const gameId = match[1];
                const embedUrl = `https://www.kogama.com/games/play/${gameId}/embed`;
                console.log("%cFetched embed URL:", "color: blue", embedUrl);

                const imageSrc = await fetchImageSource(gameId);

                BACKGROUND_AVATAR.style.transition = 'opacity 0.3s ease-in';
                BACKGROUND_AVATAR.style.opacity = '0';

                BACKGROUND_SECTION.style.transition = 'opacity 0.3s ease-in';
                BACKGROUND_SECTION.style.opacity = '0';

                setTimeout(() => {
                    BACKGROUND_AVATAR.style.opacity = '1';
                    BACKGROUND_SECTION.style.opacity = '1';
                }, 1000);

                BACKGROUND_SECTION.style.backgroundImage = `url("${imageSrc}")`;

                switch (match[2]) {
                    case 'blur':
                        BACKGROUND_AVATAR.style.filter = 'none';
                        BACKGROUND_SECTION.style.filter = 'blur(5px)';
                        break;
                    case 'none':
                        BACKGROUND_AVATAR.style.opacity = 'unset';
                        BACKGROUND_AVATAR.style.filter = 'none';
                        BACKGROUND_SECTION.style.filter = 'none';
                        break;
                    case 'dark':
                        BACKGROUND_SECTION.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${imageSrc}")`;
                        break;
                    case 'light':
                        BACKGROUND_SECTION.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url("${imageSrc}")`;
                        break;
                    case 'rain':
                        BACKGROUND_SECTION.style.backgroundImage = `url("${imageSrc}")`;
                        applyRainEffect();
                        break;
                }
            }

            if (gradientMatch && typeof gradientMatch == 'object') {
                const gradient = gradientMatch[0];
                BODY_ELEMENT.setAttribute('style', `background-image: ${gradient} !important; transition: background-image 0.721s ease-in;`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    async function fetchImageSource(gameId) {
        try {
            const url = `https://www.kogama.com/games/play/${gameId}/embed`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: ${response.status}`);
            }

            const htmlText = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlText;

            // Locate input with large image
            const inputElement = tempDiv.querySelector('li.large input.pure-input');

            // steal the value
            const kogstaticUrl = inputElement.value;

            // log to console to make sure it works - debug runs..
            console.log('Fetched Kogstatic URL:', kogstaticUrl);

            return kogstaticUrl;
        } catch (error) {
            throw new Error(`Error fetching image source: ${error.message}`);
        }
    }

    function applyRainEffect() {
        // Target elements for rain overlay
        const targetElements = [
            document.querySelector('._13UrL ._23KvS'),
            document.querySelector('._13UrL ._23KvS ._33DXe')
        ];

        targetElements.forEach(element => {
            if (element) {
                // Create rain effect overlay
                const rainOverlay = document.createElement('div');
                rainOverlay.style.position = 'absolute';
                rainOverlay.style.top = '0';
                rainOverlay.style.left = '0';
                rainOverlay.style.width = '100%';
                rainOverlay.style.height = '100%';
                rainOverlay.style.pointerEvents = 'none';
                rainOverlay.style.zIndex = '2';
                rainOverlay.style.overflow = 'hidden';
                element.appendChild(rainOverlay);

                // Create rain effect
                const numDrops = 100;  // Increase number of drops for denser effect
                for (let i = 0; i < numDrops; i++) {
                    const drop = document.createElement('div');
                    drop.className = 'rain-drop';
                    drop.style.position = 'absolute';
                    drop.style.background = 'rgba(255, 255, 255, 0.8)';  // More opaque
                    drop.style.width = '3px';  // Wider drops
                    drop.style.height = '15px';  // Longer drops
                    drop.style.bottom = `${Math.random() * 100}%`;
                    drop.style.left = `${Math.random() * 100}%`;
                    drop.style.animation = `fall ${Math.random() * 1 + 1}s linear infinite`;
                    rainOverlay.appendChild(drop);
                }

                // Add keyframes for rain animation
                const styleSheet = document.createElement("style");
                styleSheet.type = "text/css";
                styleSheet.innerText = `
                    @keyframes fall {
                        to {
                            transform: translateY(100vh);
                        }
                    }
                    .rain-drop {
                        z-index: 2;
                    }
                `;
                document.head.appendChild(styleSheet);
            }
        });
    }

    InsertBeforeLoad();
})();

(function() {
    'use strict';
    function createElement(tag, attributes, ...children) {
        const element = document.createElement(tag);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        for (let child of children) {
            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        }
        return element;
    }
    function removeElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.remove();
        }
    }
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removeElement('#login-button');
                removeElement('#react-ingame-modal');
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    function checkAndAddCustomLogin() {
        const loginButton = document.querySelector('#login-button');
        if (loginButton) {
            const metaNav = document.querySelector('#meta-nav');
            if (metaNav) {
                loginButton.parentElement.remove();
                const customLoginButton = createElement('button', {
                    id: 'custom-login-button',
                    class: 'login-button text',
                    'aria-label': 'Custom Login'
                }, 'Login');
                const signupButton = document.querySelector('#signup-button');
                metaNav.insertBefore(createElement('li', { class: 'login' }, customLoginButton), signupButton.parentElement);
                customLoginButton.addEventListener('click', () => {
                    if (document.querySelector('#custom-login-form')) return;

                    const usernameInput = createElement('input', {
                        type: 'text',
                        id: 'custom-username',
                        placeholder: 'Username',
                        style: 'background: #444; color: #fff; border: 1px solid #555; padding: 10px; margin-bottom: 10px; width: 80%;'
                    });

                    const passwordInput = createElement('input', {
                        type: 'password',
                        id: 'custom-password',
                        placeholder: 'Password',
                        style: 'background: #444; color: #fff; border: 1px solid #555; padding: 10px; margin-bottom: 10px; width: 80%;'
                    });

                    const errorDisplay = createElement('div', {
                        id: 'custom-login-error',
                        style: 'color: red; margin-top: 10px; display: none;'
                    });

                    const loginForm = createElement('div', {
                        id: 'custom-login-form',
                        style: 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #333; padding: 20px; border: 1px solid #555; border-radius: 8px; width: 400px; height: 200px; text-align: center; display: flex; flex-direction: row; align-items: center; justify-content: space-around;'
                    },
                        createElement('div', { id: 'last-accounts', style: 'color: #fff; margin-right: 20px; flex: 1; max-width: 150px; text-align: left;' }),
                        createElement('div', { style: 'flex: 2;' },
                            usernameInput,
                            passwordInput,
                            createElement('button', {
                                id: 'custom-login-submit',
                                class: 'login-button text',
                                style: 'background: #555; color: #fff; border: none; padding: 10px 20px; cursor: pointer;'
                            }, 'Login'),
                            errorDisplay
                        )
                    );

                    document.body.appendChild(loginForm);
                    document.addEventListener('click', (event) => {
                        const form = document.querySelector('#custom-login-form');
                        if (form && !form.contains(event.target) && event.target !== customLoginButton) {
                            form.remove();
                        }
                    });
                    document.querySelector('#custom-login-submit').addEventListener('click', () => {
                        const username = usernameInput.value;
                        const password = passwordInput.value;
                        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
                        const existingAccountIndex = accounts.findIndex(acc => acc.username === username && acc.password === password);
                        if (existingAccountIndex !== -1) {
                            const [existingAccount] = accounts.splice(existingAccountIndex, 1);
                            accounts.push(existingAccount);
                        } else {
                            const duplicateIndex = accounts.findIndex(acc => acc.username === username);
                            if (duplicateIndex !== -1) {
                                accounts.splice(duplicateIndex, 1);
                            }
                            accounts.push({ username, password });
                            if (accounts.length > 4) accounts.shift();
                            localStorage.setItem('accounts', JSON.stringify(accounts));
                            displayLastAccounts();
                        }
                        fetch('https://www.kogama.com/auth/login/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ username, password })
                        })
                        .then(response => {
                            console.log('Response status:', response.status);
                            if (response.status === 200) {
                                window.location.href = 'https://www.kogama.com/profile/me';
                            } else {
                                errorDisplay.style.display = 'block';
                                errorDisplay.textContent = 'Login failed.';
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            errorDisplay.style.display = 'block';
                            errorDisplay.textContent = 'Network error. Please try again later.';
                        });
                    });
                    function displayLastAccounts() {
                        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
                        const lastAccountsDiv = document.querySelector('#last-accounts');
                        lastAccountsDiv.innerHTML = '';
                        accounts.forEach(account => {
                            const accountDiv = createElement('div', { style: 'cursor: pointer; margin-bottom: 5px;' }, `${account.username}`);
                            accountDiv.addEventListener('click', () => {
                                usernameInput.value = account.username;
                                passwordInput.value = account.password;
                                document.querySelector('#custom-login-submit').click();
                            });
                            lastAccountsDiv.appendChild(accountDiv);
                        });
                    }
                    displayLastAccounts();
                });
            }
        }
    }


    const loginObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                checkAndAddCustomLogin();
            }
        }
    });

    loginObserver.observe(document.body, { childList: true, subtree: true });
    checkAndAddCustomLogin();
})();


(function() {
    'use strict';


    function fixFormatting() {
        var elements = document.querySelectorAll('*');
        elements.forEach(function(element) {
            var textNodes = element.childNodes;
            textNodes.forEach(function(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.nodeValue = node.nodeValue.replace(/&amp;#39;/g, "'");
                }
            });
        });
    }


    setInterval(fixFormatting, 500);
})();
// COMPACT MENU
    // Function to remove elements by class
function removeElementsByClass(className){
    var elements = document.querySelectorAll(className);
    elements.forEach(function(element) {
        element.remove();
    });
}

// Remove elements on page load
window.addEventListener('load', function() {
    removeElementsByClass('.news');
    removeElementsByClass('.subscription');
    removeElementsByClass('.purchase');

    // Setup observer after page load
    var observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                removeElementsByClass('.news');
                removeElementsByClass('.subscription');
                removeElementsByClass('.purchase');
            }
        });
    });

    var targetNode = document.body;
    var config = { childList: true, subtree: true };

    observer.observe(targetNode, config);
});

// Function to inject CSS
const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
};
(function() {
    'use strict';

    const encodedUID = 'MTc3NjkyODk=';

    function decodeBase64(encodedStr) {
        return atob(encodedStr);
    }

    function CheckWindow() {
        const profileURL = `https://www.kogama.com/profile/${decodeBase64(encodedUID)}/`;
        return window.location.href === profileURL;
    }

    function InjectVariety() {
        const css = `
            .UA3TP._2bUqU[style*="transform: none"]::before {
                content: '';
                width: 40px;
                height: 40px;
                background: url("https://i.imgur.com/hfnYocD.png") center/cover;
                transform: translate(-4px, -2px);
                z-index: 99999;
                position: absolute;
                pointer-events: none;
            }
        `;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    if (CheckWindow()) {
        InjectVariety();
    }
})();
