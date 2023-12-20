// ==UserScript==
// @name         Dynamic Games
// @namespace    github.com/2facvd
// @version      1.1
// @description  Sillyyyy
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add styles for hover effects with smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        #mobile-page .games-list .game-item {
            transition: opacity 0.5s, transform 0.5s, filter 0.5s;
            position: relative;
            z-index: 1;
        }

        #mobile-page .games-list .game-item:hover {
            opacity: 1 !important;
            transform: scale(1.3) !important;
            filter: blur(0);
            z-index: 2 !important;
        }

        #mobile-page .games-list .game-item {
            opacity: 1;
            z-index: 1;
            filter: blur(0);
        }

        #mobile-page .games-list:hover .game-item:not(:hover) {
            opacity: 0.4;
            transform: scale(0.9);
            filter: blur(9px);
            z-index: 1;
        }

        #mobile-page .games-list .game-item:hover .game-name-stats {
            background-color: rgba(0, 0, 0, 0.5) !important;
            box-shadow: none !important;
            -webkit-box-shadow: none !important;
            text-shadow: 0 0 3px #fff !important;
        }

        #mobile-page .games-list .game-item .game-name-stats {
            transition: background-color 0.5s, box-shadow 0.5s, -webkit-box-shadow 0.5s, text-shadow 0.5s;
            background-color: rgba(0, 0, 0, 0.5) !important;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) !important;
            -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) !important;
            text-shadow: none !important;
            backdrop-filter: blur(3px) !important;
        }

        #mobile-page .games-list .game-item .icon-heart:before,
        #mobile-page .games-list .game-item .icon-gamepad:before {
            transition: color 0.5s;
            color: #F67F7F !important;
        }
    `;
    document.head.appendChild(style);

    // Add event listeners to handle hover effects with smooth transitions
    const specifiedItem = document.querySelector('#mobile-page .games-list .game-item'); // Specify the element to trigger the effects
    let originalListOpacity = ''; // Variable to store the original opacity of the list

    specifiedItem.addEventListener('mouseenter', () => {
        // Store the original opacity of the list on hover
        originalListOpacity = document.querySelector('#mobile-page .games-list').style.opacity;

        // Increase opacity, scale, and remove blur for the specified item
        specifiedItem.style.opacity = '1';
        specifiedItem.style.transform = 'scale(1.3)';
        specifiedItem.style.filter = 'blur(0)';
        specifiedItem.style.zIndex = '2';

        // Lower opacity, scale, and add blur to other items on hover
        document.querySelector('#mobile-page .games-list').style.opacity = '0.4';
    });

    document.querySelector('#mobile-page .games-list').addEventListener('mouseleave', () => {
        // Restore default styles on mouse leave
        specifiedItem.style.opacity = '';
        specifiedItem.style.transform = '';
        specifiedItem.style.filter = '';
        specifiedItem.style.zIndex = '';

        // Restore the original opacity of the list on hover out
        document.querySelector('#mobile-page .games-list').style.opacity = originalListOpacity;
    });
})();
