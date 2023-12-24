// ==UserScript==
// @name         KogaMaFilter
// @namespace    github.com/zombieaztro
// @version      1.3.1
// @description  These people need to chill man!
// @author       zombieaztro
// @match        https://www.kogama.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    let inappropriateWords = {};

    function blurInappropriateContent() {

        document.querySelectorAll('.MuiPaper-root.wXhWi.MuiPaper-outlined.MuiPaper-rounded').forEach(element => {

            const textContent = element.textContent.toLowerCase().replace(/\s/g, '');

            if (!element.classList.contains('filtered-content')) {
                let isContentBlocked = false;

                Object.keys(inappropriateWords).forEach(word => {
                    const lowerCaseWord = word.toLowerCase().replace(/\s/g, '');
                    const upperCaseWord = word.toUpperCase();

                    if (textContent.includes(lowerCaseWord) || textContent.includes(upperCaseWord)) {

                        isContentBlocked = true;
                    }
                });

                if (isContentBlocked) {

                    element.style.transition = 'filter 0.3s';
                    element.style.filter = 'blur(13px) brightness(0.8)';

                    element.style.borderRadius = '7px';

                    const blockedTextContainer = document.createElement('div');
                    blockedTextContainer.classList.add('blocked-text-container');
                    blockedTextContainer.style.position = 'absolute';
                    blockedTextContainer.style.top = '55%';
                    blockedTextContainer.style.left = '33%';
                    blockedTextContainer.style.transform = 'translate(-50%, -50%)';
                    blockedTextContainer.style.fontSize = '18px';
                    blockedTextContainer.style.color = 'white';
                    blockedTextContainer.style.textAlign = 'center';
                    blockedTextContainer.style.textShadow = '2px 2px 4px #fff';
                    blockedTextContainer.textContent = 'This content violates the terms of service agreement.';

                    element.parentNode.appendChild(blockedTextContainer);

                    element.classList.add('filtered-content');
                }
            }
        });
    }

    async function fetchInappropriateWords() {
        try {
            const response = await fetch(inappropriateWordsURL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching inappropriate words:', error);
            return {};
        }
    }

    const inappropriateWordsURL = 'https://raw.githubusercontent.com/zombieaztro/KoGaMa/main/Plugins/Addons/RelaxComments/JSON/badpeople.json';

    setInterval(() => {
        fetchInappropriateWords().then(data => {

            inappropriateWords = data;

            blurInappropriateContent();
        });
    }, 1110);

})();
