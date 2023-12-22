// ==UserScript==
// @name         PrivateGameTab
// @namespace    github.com/zombieaztro
// @version      2.0
// @description  Define your custom games tab.
// @author       zombieaztro
// @match        https://www.kogama.com/games/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const mobilePageContent = document.querySelector('#mobile-page .content-content');
    if (mobilePageContent) {
        mobilePageContent.style.display = 'none';
    }

    const elementsList = [
        { imageSrc: 'https://www.kogstatic.com/gen_cache/93/9f/939ff8169cf949abbb621ac82870215a_600x240.jpg', title: '> WAR 4 < ', creator: 'opnfeniks', content: '#FAV', link: 'https://www.kogama.com/games/play/2593313/' },
        { imageSrc: 'https://www.kogstatic.com/gen_cache/2e/42/2e420947-da3c-40c0-8e63-858c0c38cf7e_600x240.jpg', title: 'G4 | Versión de Br (Rail)', creator: 'Amoreii-', content: '#1V1', link: 'https://www.kogama.com/games/play/9618799/' },
        { imageSrc: 'https://www.kogstatic.com/gen_cache/d5/03/d503bbec-2fc4-4b9e-a922-b16d83cf12b9_600x240.jpg', title: '|The Parkour| (212Lvls)', creator: '-_Chrupcio_-', content: '#Relaxation', link: 'https://www.kogama.com/games/play/7307232/' },
        { imageSrc: 'https://www.kogstatic.com/gen_cache/e3/32/e3326930-b04a-4a91-8493-daa8fbabbe14_600x240.jpg', title: 'Ƹ̵̡Ӝ̵̨̄Ʒ| Just a parkour |Ƹ̵̡Ӝ̵̨̄Ʒ', creator: 'Marcel', content: '#Relaxation', link: 'https://www.kogama.com/games/play/7853864/' },
        { imageSrc: 'https://www.kogstatic.com/gen_cache/4f/fd/4ffd674d-974e-4423-9f5c-20f3194021df_600x240.jpg', title: 'Mech-Hard', creator: '_Kelim_', content: '#Relaxation', link: 'https://www.kogama.com/games/play/6068850/' },
        { imageSrc: 'https://www.kogstatic.com/gen_cache/ae/7c/ae7c18f4-eae5-4a76-86db-da9562a12f21_600x240.jpg', title: 'g', creator: 'Marcel', content: '#funny', link: 'https://www.kogama.com/games/play/10381736/' },
    ];

    const customDiv = document.createElement('div');
    customDiv.style.position = 'fixed';
    customDiv.style.top = '50%';
    customDiv.style.left = '50%';
    customDiv.style.transform = 'translate(-50%, -50%)';
    customDiv.style.backgroundColor = 'transparent';
    customDiv.style.padding = '30px';
    customDiv.style.zIndex = '1000';
    customDiv.style.width = '100%';
    customDiv.style.height = '100%';

    const centeredList = document.createElement('div');
    centeredList.style.position = 'absolute';
    centeredList.style.top = '15%';
    centeredList.style.left = '14%';
    centeredList.style.display = 'grid';
    centeredList.style.gridTemplateColumns = 'repeat(2, 1fr)';
    centeredList.style.gap = '50px';

    elementsList.forEach(elementData => {
        const linkElement = document.createElement('a');
        linkElement.href = elementData.link;
        linkElement.target = '_blank';

        const element = document.createElement('div');
        element.style.borderRadius = '13px';
        element.style.marginBottom = '15px';
        element.style.padding = '10px';
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.backgroundImage = `url(${elementData.imageSrc})`;
        element.style.backgroundSize = 'cover';
        element.style.boxShadow = '0 0 3px black';
        element.style.color = '#ffffff';
        element.style.width = '400px';
        element.style.height = '129px';
        element.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.5)';
        element.style.transition = 'transform 0.3s ease-in-out, z-index 0.3s ease-in-out';

        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.3)';
            element.style.zIndex = '1';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.zIndex = '0';
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
        centeredList.appendChild(linkElement);
    });

    customDiv.appendChild(centeredList);

    const specifiedElement = document.querySelector('#root-page-mobile #content.authenticated #content-container #main-content');
    if (specifiedElement) {
        specifiedElement.appendChild(customDiv);
    } else {
        document.body.appendChild(customDiv);
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
