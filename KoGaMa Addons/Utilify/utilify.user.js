// ==UserScript==
// @name         Utilify: KoGaMa
// @namespace    discord/@simonvhs
// @version      1.9.3
// @description  KoGaMa Utility addon that adds a wide variety of features such as cleaner title tabs, bring back copy pasting and text formatting (bold, italic, links, etc.) as well as fix 'Disallow URL Input'.
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// @match        https://www.kogama.com/profile/*
// @match        https://www.kogama.com/games/*
// @match        https://www.kogama.com/build/*
// @match        https://www.kogama.com/marketplace/model/*
// @match        https://www.kogama.com/marketplace/avatar/*
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==




  // CURRENT FEATURES:
  // - User Backgrounds
  // - Allow Paste
  // - Better Titles
  // - Console Warning
  // - Compact Menu
  // - Fix Tylda syntax
  // - RichText
  // - Preview Marketplace Images
  // - Edit Website Gradient
  // - Steal Description
  // - KoGaMaBuddy emojis
  // CURRENTLY BROKEN:
  //  * Allow URL input  ( It can be used as a separate script along main one, will work properly. )
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
        ":sword_yatta:": "https://i.imgur.com/Z5KAWmB.png"
        // Add more emojis as needed
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
        ._3TORb { background: rgba(0, 0, 0, 0.4); }
        .MuiPaper-root { background-color: rgba(0, 0, 13, 0.15) !important;
            backdrop-filter: blur(10px); border-radius: 25px !important; }
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

    function getUserInfoFromHTML() {
        const usernameElement = document.querySelector('.username h1');
        if (usernameElement) {
            const username = usernameElement.textContent.trim();
            return { username };
        }
        return null;
    }

    function getProfileIDFromURL() {
        const profileIDMatch = window.location.pathname.match(/\/profile\/([^/]+)\//);
        return profileIDMatch ? profileIDMatch[1] : null;
    }

    function getGameInfoFromURL() {
        const gameTitleElement = document.querySelector('.game-title');
        if (gameTitleElement) {
            const gameTitle = gameTitleElement.textContent.trim();
            const gameIDMatch = window.location.pathname.match(/\/games\/play\/([^/]+)\//);
            const gameID = gameIDMatch ? gameIDMatch[1] : null;
            return { gameTitle, gameID };
        }
        return null;
    }

    function getBuildInfoFromURL() {
        const modeElement = document.querySelector('.project-information .display h2');
        if (modeElement) {
            const mode = modeElement.textContent.trim();
            return { mode };
        }
        return null;
    }

    function getModelInfoFromURL() {
        const modelTitleElement = document.querySelector('.product-header .page-header');
        if (modelTitleElement) {
            const modelTitle = modelTitleElement.textContent.trim();
            return { modelTitle };
        }
        return null;
    }

    function getAvatarInfoFromURL() {
        const avatarTitleElement = document.querySelector('.product-header .page-header');
        if (avatarTitleElement) {
            const avatarTitle = avatarTitleElement.textContent.trim();
            return { avatarTitle };
        }
        return null;
    }

    function isPlayingGame() {
        return window.location.pathname.startsWith('/games/play/');
    }

    function setDocumentTitle() {
        const path = window.location.pathname;

        if (path.startsWith('/profile/')) {
            const userInfo = getUserInfoFromHTML();
            const profileID = getProfileIDFromURL();

            if (userInfo && profileID) {
                const { username } = userInfo;
                document.title = `(U:${profileID}) ${username}`;
            }
        } else if (path.startsWith('/games/')) {
            if (isPlayingGame()) {
                const gameInfo = getGameInfoFromURL();
                if (gameInfo) {
                    const { gameTitle, gameID } = gameInfo;
                    document.title = `(G:${gameID}) ${gameTitle}`;
                }
            } else {
                document.title = 'Games';
            }
        } else if (path.startsWith('/build/')) {
            const buildInfo = getBuildInfoFromURL();
            if (buildInfo) {
                const { mode } = buildInfo;
                document.title = `(Project) ${mode}`;
            } else {
                document.title = 'Build';
            }
        } else if (path.startsWith('/marketplace/model/')) {
            const modelInfo = getModelInfoFromURL();
            if (modelInfo) {
                const { modelTitle } = modelInfo;
                document.title = `(Model) ${modelTitle}`;
            }
        } else if (path.startsWith('/marketplace/avatar/')) {
            const avatarInfo = getAvatarInfoFromURL();
            if (avatarInfo) {
                const { avatarTitle } = avatarInfo;
                document.title = `(Avatar) ${avatarTitle}`;
            }
        } else {
            document.title = 'Marketplace';
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

            // Fix REGEX
            const BACKGROUND_REGEXP = /(?:\|\|)?Background:\s*(\d+)(?:,\s*filter:\s*(light|dark|blur|none))?;?(?:\|\|)?/i;
            const match = BACKGROUND_REGEXP.exec(DESCRIPTION_TEXT);

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


                BACKGROUND_SECTION.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${imageSrc}")`;

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
                }
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

    InsertBeforeLoad();
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

