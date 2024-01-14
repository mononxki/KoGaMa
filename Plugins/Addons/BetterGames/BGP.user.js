// ==UserScript==
// @name         KoGaMa: Minimal Gamelist
// @namespace    github.com/zombieaztro
// @version      2.4
// @description  Define your custom games tab.
// @author       zombieaztro
// @match        https://www.kogama.com/games/
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_addStyle(`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
* { font-family: 'Comfortaa', sans-serif; }
`);

// COMPACT GAMES
(function() {
    'use strict';
  function isKogamaGamesURL() {
        // Check if the URL matches exactly 'https://www.kogama.com/games/'
        return window.location.href === 'https://www.kogama.com/games/';
    }

    if (!isKogamaGamesURL()) {
        return;
    }

    const mobilePageContent = document.querySelector('#mobile-page .content-content');
    if (mobilePageContent) {
        mobilePageContent.style.display = 'none';
    }

    function fetchPlainText(url) {
        return fetch(url)
            .then(response => response.text());
    }

    fetchPlainText('https://raw.githubusercontent.com/zombieaztro/KoGaMa/main/Plugins/Addons/BetterGames/JSON/main.json').then(text => {
        const elementsList = JSON.parse(text);

        const customDiv = document.createElement('div');
        customDiv.style.position = 'fixed';
        customDiv.style.top = '80%';
        customDiv.style.left = '56%';
        customDiv.style.transform = 'translate(-50%, -50%)';
        customDiv.style.backgroundColor = 'transparent';
        customDiv.style.padding = '30px';
        customDiv.style.zIndex = '1000';
        customDiv.style.width = '100%';
        customDiv.style.height = '100%';

        const columnContainer = document.createElement('div');
        columnContainer.style.display = 'flex';
        columnContainer.style.justifyContent = 'space-between';
        columnContainer.style.flexWrap = 'none';
        columnContainer.style.gap = '33px';
        columnContainer.style.maxWidth = '1015px';

        const sortedGames = {};

        elementsList.forEach(elementData => {
            const contentTags = elementData.content.split(' ');
            contentTags.forEach(tag => {
                if (!sortedGames[tag]) {
                    sortedGames[tag] = [];
                }
                sortedGames[tag].push(elementData);
            });
        });

        Object.keys(sortedGames).forEach(tag => {
            const column = document.createElement('div');
            column.style.display = 'flex';
            column.style.flexDirection = 'column';
            column.style.marginBottom = '10px';

            sortedGames[tag].forEach(game => {
                createGameEntry(game, column);
            });

            columnContainer.appendChild(column);
        });

        customDiv.appendChild(columnContainer);

        const specifiedElement = document.querySelector('#root-page-mobile #content.authenticated #content-container #main-content');
        if (specifiedElement) {
            specifiedElement.appendChild(customDiv);
        } else {
            document.body.appendChild(customDiv);
        }
    });

    function createGameEntry(elementData, parentElement) {
        const linkElement = document.createElement('a');
        linkElement.href = elementData.link;
        linkElement.target = '_blank';

        const element = document.createElement('div');
        element.style.borderRadius = '13px';
        element.style.marginBottom = '15px';
        element.style.padding = '10px';
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${elementData.imageSrc})`;
        element.style.backgroundSize = 'cover';
        element.style.boxShadow = '0 0 3px #2E9E58';
        element.style.color = '#ffffff';
        element.style.width = '400px';
        element.style.height = '129px';
        element.style.textShadow = '0 0 2px #fff';
        element.style.transition = 'transform 0.3s ease-in-out, z-index 0.3s ease-in-out';

        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.3)';
            element.style.zIndex = '99999';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.zIndex = '1';
        });

        const textDiv = document.createElement('div');
        textDiv.style.marginTop = '10px';
        textDiv.style.position = 'relative';

        element.appendChild(textDiv);

        const titleDiv = document.createElement('div');
        titleDiv.style.display = 'flex';
        titleDiv.style.flexDirection = 'column';
        textDiv.appendChild(titleDiv);

        const title = document.createElement('div');
        title.textContent = elementData.title;
        title.style.fontWeight = 'bold';
        titleDiv.appendChild(title);

        const buttonLocal = createButton('https://i.imgur.com/8OVyoMk.png', () => {
            window.location.href = elementData.link + '?local=1';
        });
        buttonLocal.style.borderRadius = '10px';
        buttonLocal.style.position = 'absolute';
        buttonLocal.style.bottom = '0';
        buttonLocal.style.right = '0';
        titleDiv.appendChild(buttonLocal);

        const creator = document.createElement('div');
        creator.textContent = elementData.creator;
        textDiv.appendChild(creator);

        const content = document.createElement('div');
        content.textContent = elementData.content;
        textDiv.appendChild(content);

        const buttonW = createButton('https://i.imgur.com/SaTQ4Pm.png', () => {
            window.location.href = elementData.link + '?webgl=1';
        });
        buttonW.style.position = 'absolute';
        buttonW.style.bottom = '0';
        buttonW.style.right = '40px';
        textDiv.appendChild(buttonW);

        const buttonL = createButton('https://i.imgur.com/KLoHal8.png', () => {
            window.location.href = elementData.link + '?standalone=2';
        });
        buttonL.style.position = 'absolute';
        buttonL.style.bottom = '0';
        buttonL.style.right = '80px';
        textDiv.appendChild(buttonL);

        linkElement.appendChild(element);
        parentElement.appendChild(linkElement);
    }

    function createButton(iconUrl, clickEvent) {
        const button = document.createElement('div');
        button.style.width = '32px';
        button.style.height = '32px';
        button.style.borderRadius = '50%';
        button.style.backgroundImage = `url('${iconUrl}')`;
        button.style.backgroundSize = 'cover';
        button.style.cursor = 'pointer';
        button.addEventListener('click', clickEvent);
        return button;
    }
})();


// COMPACT MENU
    function removeElementsByClass(className){
        var elements = document.querySelectorAll(className);
        elements.forEach(function(element) {
            element.remove();
        });
    }


    window.addEventListener('load', function() {

        removeElementsByClass('.news');
        removeElementsByClass('.subscription');
        removeElementsByClass('.purchase');
    });


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



const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}
