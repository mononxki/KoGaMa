// ==UserScript==
// @name         KoGaMa PopUp Widget
// @namespace    github.com/zombieaztro
// @version      0.6
// @description  Add a very compact and stylish bar with custom icons to the page
// @author       zombieaztro
// @match        https://www.kogama.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

   
    const widgetContainer = document.createElement('div');
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = '10px';
    widgetContainer.style.left = '50%';
    widgetContainer.style.transform = 'translateX(-50%)';
    widgetContainer.style.width = '130px';
    widgetContainer.style.backgroundColor = '#333';
    widgetContainer.style.padding = '5px';
    widgetContainer.style.borderRadius = '10px';
    widgetContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    widgetContainer.style.display = 'flex';
    widgetContainer.style.justifyContent = 'space-around';
    widgetContainer.style.zIndex = '9999'; 

    const applyHoverEffect = (element) => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 10px rgba(255, 255, 255, 1)';
            element.style.filter = 'brightness(1.2)';
            element.style.borderRadius = '50%';
            element.style.transform = 'scale(1.2)';
            element.style.zIndex = '2';
        });

        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            element.style.filter = 'brightness(1)';
            element.style.transform = 'scale(1)';
            element.style.zIndex = '1';
        });
    };

    const openWidget = (link) => {
        
        const widgetWindow = window.open(link, 'widgetWindow', 'width=800,height=600,resizable=yes,scrollbars=yes');
        if (widgetWindow) {
            
            widgetWindow.focus();
        }
    };

    const widgets = [
        { icon: 'https://i.imgur.com/mow0ufg.png', tooltip: 'Spotify', link: 'https://spotify.com' },
        { icon: 'https://i.imgur.com/exClhCz.png', tooltip: 'Discord', link: 'https://discord.com/channels/@me' },
        { icon: 'https://i.imgur.com/tD0tzGA.png', tooltip: 'ChatGPT', link: 'https://chat.openai.com' },
        // Add more widgets as needed
    ];

    
    widgets.forEach(widget => {
        const widgetElement = document.createElement('div');
        widgetElement.title = widget.tooltip;
        widgetElement.style.cursor = 'pointer';
        widgetElement.style.textAlign = 'center';

        const iconElement = document.createElement('img');
        iconElement.src = widget.icon;
        iconElement.width = 32;
        iconElement.height = 32;

        widgetElement.appendChild(iconElement);
        widgetContainer.appendChild(widgetElement);

      
        applyHoverEffect(widgetElement);
        widgetElement.addEventListener('click', () => openWidget(widget.link));
    });

   
    document.body.appendChild(widgetContainer);
})();
