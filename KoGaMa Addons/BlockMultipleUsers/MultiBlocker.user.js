// ==UserScript==
// @name         KGM: Block Multiple Users
// @namespace    discord/@simonvhs
// @version      1.3.7
// @description  Block Multiple users with ease.
// @author      ⛧ sim
// @match        https://www.kogama.com/profile/*
// @icon         https://i.pinimg.com/564x/c3/33/95/c333950546c1c7f4f5086d39ab622685.jpg
// @grant        none
// ==/UserScript==
// REQUESTED BY A COUPLE > WAR 4 < PLAYERS.

(function() {
    'use strict';

    let blockBoxVisible = false;

    function toggleBlockBox() {
        const blockBox = document.getElementById('kogama-block-box');
        blockBoxVisible = !blockBoxVisible;
        blockBox.style.display = blockBoxVisible ? 'block' : 'none';

        const consoleBox = document.getElementById('kogama-console');
        consoleBox.style.display = blockBoxVisible ? 'block' : 'none'; // 
    }


    function createBlockBox() {
        const blockBox = document.createElement('div');
        blockBox.id = 'kogama-block-box';
        blockBox.style.position = 'fixed';
        blockBox.style.background = '#0f0f0f';
        blockBox.style.bottom = '20px';
        blockBox.style.left = '20px';
         blockBox.style.border = '1px solid #b86e9a';
        blockBox.style.borderRadius= '25px';
        blockBox.style.padding = '10px';
        blockBox.style.borderRadius = '8px';
        blockBox.style.zIndex = '9999';
        blockBox.style.display = 'none';
        blockBox.style.width = '250px';

        const userIdInput = document.createElement('input');
        userIdInput.type = 'text';
        userIdInput.placeholder = 'Your User ID';
        userIdInput.style.marginBottom = '10px';
        userIdInput.style.background = '#242324';
        userIdInput.style.color = '#fff';
        userIdInput.style.width = '100%';

        const profileIdInput = document.createElement('textarea');
        profileIdInput.placeholder = 'Profile IDs (comma-separated)';
        profileIdInput.style.marginBottom = '10px';
        profileIdInput.style.color = '#fff';
        profileIdInput.style.width = '100%';
        profileIdInput.style.background = '#242324';
        profileIdInput.style.resize = 'vertical';

        const blockButton = document.createElement('button');
        blockButton.innerText = 'BLOCK';
        blockButton.style.background = '#f0bb2b';
        blockButton.style.border = 'none';
        blockButton.style.padding = '8px 16px';
        blockButton.style.borderRadius = '4px';
        blockButton.style.cursor = 'pointer';
        blockButton.style.width = '100%';

        blockButton.addEventListener('click', async () => {
            const userId = userIdInput.value;
            const profileIds = profileIdInput.value.split(',').map(id => id.trim());

            for (const profileId of profileIds) {
                await blockUserWithDelay(userId, profileId, 2000);
            }

            const consoleBox = document.getElementById('kogama-console');
            const logEntry = document.createElement('div');
            logEntry.style.color = '#87ace8';
            logEntry.textContent = 'Blocking process finished.';
            consoleBox.appendChild(logEntry);
        });

        blockBox.appendChild(userIdInput);
        blockBox.appendChild(profileIdInput);
        blockBox.appendChild(blockButton);
        document.body.appendChild(blockBox);
    }

    async function blockUserWithDelay(userId, profileId, delay) {
        await new Promise((resolve) => setTimeout(resolve, delay));

        const response = await fetch(`/user/${userId}/block/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Csrf-Token': ''
            },
            body: JSON.stringify({
                profile_id: profileId
            })
        });

        const consoleBox = document.getElementById('kogama-console');
        const logEntry = document.createElement('div');
        logEntry.style.color = response.ok ? '#aaf57f' : '#991f29';
        logEntry.textContent = response.ok
            ? `Blocked user with profile ID: ${profileId}`
            : `Error blocking user with profile ID: ${profileId}`;

        consoleBox.appendChild(logEntry);
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }

    function createGearButton() {
        const gearButton = document.createElement('div');
        gearButton.id = 'kogama-gear-button';
        gearButton.style.position = 'fixed';
        gearButton.style.bottom = '20px';
        gearButton.style.left = '20px';
        gearButton.style.background = '#f0bb2b'; //
        gearButton.style.color = '#fff'; //
        gearButton.style.padding = '10px'; //
        gearButton.style.borderRadius = '50%'; // Make it round
        gearButton.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)'; //
        gearButton.style.zIndex = '9998';
        gearButton.style.cursor = 'pointer';
        gearButton.innerHTML = '&#9881;'; // Gear icon

        gearButton.addEventListener('click', () => {
            toggleBlockBox();
        });

        document.body.appendChild(gearButton);
    }

    function createConsole() {
        const consoleBox = document.createElement('div');
        consoleBox.id = 'kogama-console';
        consoleBox.style.position = 'fixed';
        consoleBox.style.top = '800px'; // 
        consoleBox.style.left = '20px'; //
        consoleBox.style.background = '#0f0f0f';
        consoleBox.style.color = '#000';
        consoleBox.style.padding = '10px';
        consoleBox.style.borderRadius = '8px';
        consoleBox.style.zIndex = '9998';
        consoleBox.style.display = 'none';
        consoleBox.style.width = '250px';
        consoleBox.style.maxHeight = '200px';
        consoleBox.style.overflowY = 'auto';
        consoleBox.style.border = '1px solid #b86e9a'; //
        consoleBox.style.borderRadius= '25px';

        document.body.appendChild(consoleBox);
    }

    createBlockBox();
    createGearButton();
    createConsole();
})();