// ==UserScript==
// @name         Refresh ClientData
// @namespace    github.com/xymine
// @version      1.2.1
// @description  Simple script to refresh site-data cookies.
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon         https://i.pinimg.com/564x/e9/9b/85/e99b85949582be711313b8abedbe4a94.jpg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to clear localStorage
    function clearLocalStorage() {
        localStorage.clear();
        console.log('cleared.');
    }

    // Create the button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Refresh Data';
    clearButton.style.position = 'fixed';
    clearButton.style.bottom = '10px';
    clearButton.style.left = '10px';
    clearButton.style.zIndex = '9999';
    clearButton.addEventListener('click', () => {
        clearLocalStorage();
        location.reload();
    });


    document.body.appendChild(clearButton);


    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '50px';
        notification.style.left = '10px';
        notification.style.padding = '10px';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        notification.style.color = 'white';
        notification.style.zIndex = '9999';
        document.body.appendChild(notification);


        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }


    setTimeout(() => {
        showNotification('Data has been updated & refreshed.');
    }, 2000);
})();