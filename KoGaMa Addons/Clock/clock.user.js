// ==UserScript==
// @name         KoGaMa Clock
// @namespace    discord/@simonvhs
// @version      0.4
// @description  A comfy clock to watch the hour as you waste your lifetime.
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // MONONOKI BEST FONT <333
    GM_addStyle('@import url("https://raw.githubusercontent.com/madmalik/mononoki/master/css/mononoki.css");');


    const clockContainer = document.createElement('div');
    clockContainer.style.position = 'fixed';
    clockContainer.style.bottom = '20px';
    clockContainer.style.left = '50%';
    clockContainer.style.transform = 'translateX(-50%)';
    clockContainer.style.zIndex = '999';
    clockContainer.style.background = 'rgba(0, 0, 0, 0.7)';
    clockContainer.style.borderRadius = '25px';
    clockContainer.style.padding = '32px';
    clockContainer.style.boxShadow = '0 0 5px rgba(141, 134, 134, 0.5)';
    clockContainer.style.color = '#fff';
    clockContainer.style.fontFamily = 'Mononoki, monospace';
    clockContainer.style.textAlign = 'center';
    clockContainer.style.textShadow = '0 0 6px rgba(255, 255, 255, 1)';
    clockContainer.style.backdropFilter = 'blur(10px)';


    const timeElement = document.createElement('div');
    const dateElement = document.createElement('div');


    timeElement.style.fontSize = '24px';
    timeElement.style.fontWeight = 'bold';


    clockContainer.appendChild(timeElement);
    clockContainer.appendChild(dateElement);


    document.body.appendChild(clockContainer);


    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[now.getMonth()];
        const day = now.getDate().toString();
        const year = now.getFullYear();
        const dayOfWeek = getDayOfWeek(now.getDay());


        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        dateElement.textContent = `${month} ${day}, ${year} - ${dayOfWeek}`;
    }


    updateClock();


    setInterval(updateClock, 1000);


    function getDayOfWeek(dayIndex) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[dayIndex];
    }
})();
