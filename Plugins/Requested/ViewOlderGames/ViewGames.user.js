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
// SEARCH GAMES
(function () {
    'use strict';
  function isKogamaGamesURL() {
        return window.location.href.startsWith('https://www.kogama.com/games/');
    }


    if (!isKogamaGamesURL()) {
        return;
    }

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
            background-color: #2FB953;
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
        #customMenu {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 10px;
            display: none;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
        }
        #customMenu label {
            color: white;
        }
        #customMenu button {
            cursor: pointer;
            background-color: black;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
        }
        #customMenu input {
            padding: 5px;
            border-radius: 5px;
        }
    `);

    let gameViewer;
    let openButton;
    let closeButton;
    let overlay;
    let customMenu;
    let searchOptionRadio;
    let nameInput;
    let categoryPicker;
    let pageNumberInput;
    let confirmButton;

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

        customMenu = document.createElement('div');
        customMenu.id = 'customMenu';
        document.body.appendChild(customMenu);

        searchOptionRadio = createRadio('searchOption', [
            { value: 'byName', label: 'Search by Name' },
            { value: 'byCategory', label: 'Search by Category' },
        ]);
        customMenu.appendChild(searchOptionRadio);

        nameInput = createInput('nameInput', 'Game Title');
        customMenu.appendChild(nameInput);

        categoryPicker = createSelect('categoryPicker', [
            { value: 'new', label: 'New' },
            { value: 'popular', label: 'Popular' },
        ]);
        customMenu.appendChild(categoryPicker);

        pageNumberInput = createInput('pageNumberInput', 'Page Number');
        customMenu.appendChild(pageNumberInput);

        confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.addEventListener('click', confirmSearch);
        customMenu.appendChild(confirmButton);
    }

    function createRadio(name, options) {
        const radioGroup = document.createElement('div');

        options.forEach((option) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = name;
            radio.value = option.value;
            radio.id = `${name}-${option.value}`;
            radio.addEventListener('change', updateSearchOption);

            const radioLabel = document.createElement('label');
            radioLabel.textContent = option.label;
            radioLabel.htmlFor = radio.id;

            radioGroup.appendChild(radio);
            radioGroup.appendChild(radioLabel);
        });

        return radioGroup;
    }

    function updateSearchOption() {
        const isSearchByName = searchOptionRadio.querySelector('#searchOption-byName').checked;
        nameInput.style.display = isSearchByName ? 'block' : 'none';
        categoryPicker.style.display = isSearchByName ? 'none' : 'block';
    }

    function createInput(id, placeholder) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = id;
        input.placeholder = placeholder;

        return input;
    }

    function createSelect(id, options) {
        const select = document.createElement('select');
        select.id = id;

        options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.label;
            select.appendChild(optionElement);
        });

        return select;
    }

    function createOpenButton() {
        openButton = document.createElement('button');
        openButton.id = 'openButton';
        openButton.textContent = 'SEARCH';

        openButton.addEventListener('click', openGameViewer);
        document.body.appendChild(openButton);
    }

    function openGameViewer() {
        customMenu.style.display = 'flex';
        overlay.style.display = 'block';
    }

    function confirmSearch() {
        const isSearchByName = searchOptionRadio.querySelector('#searchOption-byName').checked;

        if (isSearchByName) {
            const gameTitle = nameInput.value;
            const pageNumber = pageNumberInput.value;
            sendSearchByNameRequest(gameTitle, pageNumber);
        } else {
            const category = categoryPicker.value;
            const pageNumber = pageNumberInput.value;
            sendCategoryRequest(category, pageNumber);
        }

        closeCustomMenu();
    }

    function closeCustomMenu() {
        customMenu.style.display = 'none';
        overlay.style.display = 'none';
        gameViewer.style.display = 'none';
    }

    function sendCategoryRequest(category, pageNumber) {
        const url = `https://www.kogama.com/game/category/${category}/?page=${pageNumber}&count=24`;

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

    function sendSearchByNameRequest(gameTitle, pageNumber) {
        const url = `https://www.kogama.com/game/search/?page=${pageNumber}&count=24&order_by=new&q=${encodeURIComponent(gameTitle)}`;

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
    gameViewer.innerHTML = '';

    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameItem = document.createElement('div');
        gameItem.className = 'gameItem';

        const img = document.createElement('img');
        img.src = game.image_medium;
        img.alt = game.name;

        const name = document.createElement('a');
        name.href = `https://www.kogama.com/games/play/${game.id}/`;
        name.textContent = game.name;
        name.target = '_blank';

        gameItem.appendChild(img);
        gameItem.appendChild(name);

        gameViewer.appendChild(gameItem);
    }

    gameViewer.style.display = 'flex';
    overlay.style.display = 'block';
}

    function closeGameViewer(event) {
        if (event && event.target.id === 'overlay') {
            closeCustomMenu();
        }
    }


    createGameViewer();
    createOpenButton();
})();

