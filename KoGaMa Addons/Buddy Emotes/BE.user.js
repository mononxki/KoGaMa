// ==UserScript==
// @name         KoGaMaBuddy Emotes
// @namespace    discord/@simonvhs
// @version      0.4
// @description  Emojis recovered :3
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// ==/UserScript==

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
        // space for more emojis
    };

    const emojiPickerDiv = document.createElement('div');
    emojiPickerDiv.id = 'emojiPicker';
    emojiPickerDiv.style.position = 'fixed';
    emojiPickerDiv.style.background = '#2f3136';
    emojiPickerDiv.style.border = '1px solid #ccc';
    emojiPickerDiv.style.padding = '10px';
    emojiPickerDiv.style.display = 'none';
    emojiPickerDiv.style.zIndex = '999999';
    emojiPickerDiv.style.maxHeight = '200px';
    emojiPickerDiv.style.overflowY = 'auto';
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
        emojiPickerDiv.style.bottom = `${window.innerHeight - inputRect.top}px`; // go to top please
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
