// ==UserScript==
// @name         View Older Games
// @namespace   justfindme
// @version      1.2
// @description  kogama is not a good website, i think.
// @author       Simon
// @match        https://www.kogama.com/games/new/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        #gameViewer {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border-radius: 13px;
            color: white;
            z-index: 9999;
            max-width: 800px;
            max-height: 500px;
            overflow: auto;
            display: none;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: space-between;
            align-content: start;
        }
        .gameItem {
            width: calc(50% - 5px);
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 10px;
        }
        .gameItem img {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .gameItem a {
            flex: 1;
            color: white;
            text-decoration: none;
            text-align: center;
            margin-top: 10px;
        }
        #closeButton {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: white;
            background: none;
            border: none;
            font-size: 20px;
        }
        #openButton {
            position: fixed;
            bottom: 10px;
            left: 10px;
            z-index: 9999;
            cursor: pointer;
            background-color: black;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
        }
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            z-index: 9998;
        }
    `);

    let gameViewer;
    let openButton;
    let closeButton;
    let overlay;

    function createGameViewer() {
        gameViewer = document.createElement('div');
        gameViewer.id = 'gameViewer';
        document.body.appendChild(gameViewer);

        closeButton = document.createElement('button');
        closeButton.id = 'closeButton';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', closeGameViewer);
        gameViewer.appendChild(closeButton);

        overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.addEventListener('click', closeGameViewer);
        document.body.appendChild(overlay);
    }

    function createOpenButton() {
        openButton = document.createElement('button');
        openButton.id = 'openButton';
        openButton.textContent = 'Open Kogama Game Viewer';
        openButton.addEventListener('click', openGameViewer);
        document.body.appendChild(openButton);
    }

    function openGameViewer() {
        overlay.style.display = 'block';
        gameViewer.style.display = 'flex';

        const pageNumber = prompt('Enter the page number:', '1');

        if (!pageNumber || isNaN(pageNumber)) {
            console.error('Invalid page number. Exiting script.');
            closeGameViewer();
            return;
        }

        const url = `https://www.kogama.com/game/category/new/?page=${pageNumber}&count=24`;

        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function (response) {
                const gameData = JSON.parse(response.responseText);
                displayGames(gameData.data);
            },
            onerror: function (error) {
                console.error('Error fetching game data:', error);
            },
        });
    }

    function displayGames(games) {
        gameViewer.innerHTML = ''; // Clear previous content

        for (let i = 0; i < games.length; i++) {
            const game = games[i];
            const gameItem = document.createElement('div');
            gameItem.className = 'gameItem';

            const img = document.createElement('img');
            img.src = game.images.medium;
            img.alt = game.name;

            const name = document.createElement('a');
            name.href = `https://www.kogama.com/games/play/${game.id}/`;
            name.textContent = game.name;
            name.target = '_blank';

            gameItem.appendChild(img);
            gameItem.appendChild(name);

            gameViewer.appendChild(gameItem);
        }
    }

    function closeGameViewer() {
        overlay.style.display = 'none';
        gameViewer.style.display = 'none';
    }

    // Initialize the script
    createGameViewer();
    createOpenButton();
})();
