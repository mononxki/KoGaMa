// ==UserScript==
// @name         Clock
// @namespace    http://tampermonkey.net/
// @version      1.3.1
// @description  Clock ticking
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kogama.com
// @grant        none
// ==/UserScript==


// Time styled better by aoxu xoxo

(function() {
    'use strict';
    var clockDiv = document.createElement('div');
    clockDiv.id = 'clock24';
    clockDiv.className = 'clock24';
    document.body.appendChild(clockDiv);

    // Update the clock every second
    setInterval(updateClock, 1000);

    function updateClock() {
        var now = new Date();
        var hour = padZero(now.getHours());
        var minute = padZero(now.getMinutes());
        var day = getFormattedDay(now.getDate());
        var month = getMonthName(now.getMonth());
        var dayOfWeek = getDayOfWeek(now.getDay());

        clockDiv.innerHTML = `
            <span class="hour">${hour}:${minute}</span>
            <span class="date">${day} of ${month}</span>
            <span class="dayOfWeek">${dayOfWeek}</span>
        `;
    }

    function padZero(number) {
        return number.toString().padStart(2, '0');
    }

    function getFormattedDay(day) {
        var lastDigit = day % 10;
        var suffix = '';

        if (lastDigit === 1 && day !== 11) {
            suffix = 'st';
        } else if (lastDigit === 2 && day !== 12) {
            suffix = 'nd';
        } else if (lastDigit === 3 && day !== 13) {
            suffix = 'rd';
        } else {
            suffix = 'th';
        }

        return day + '<sup>' + suffix + '</sup>';
    }

    function getMonthName(monthIndex) {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[monthIndex];
    }

    function getDayOfWeek(dayIndex) {
        var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayOfWeek[dayIndex];
    }

    var clockStyles = `
        #clock24 {
            position: fixed;
            top: 23px;
            left: 1320px;
            width: 230px;
            transform: translateY(-50%);
            padding: 10px;
            border-radius: 25px;
            border: 0px solid #fff;
            box-shadow: rgb(255, 5, 155);
            transition: left 0.5s;
            z-index: 9999;
            display: inline-block;
        }

        #clock24:hover {
            animation: borderAnimation 5s infinite;
        }

        @keyframes borderAnimation {
            0% {
                border-color: rgb(255, 0, 0);
            }
            0.1% {
                border-color: rgb(0, 255, 0);
            }
            0.1% {
                border-color: rgb(0, 0, 255);
            }
            0.1% {
                border-color: rgb(255, 0, 0);
            }
        }

        #clock24 .hour {
            font-size: 20px;
            font-weight: bold;
            color: #f5d3ed;
            text-shadow: 0 0 4px #fff;
            display: block; /* Added to make hour span take full width */
        }

        #clock24 .date {
            font-size: 10px;
            color: #f5d3ed;
            text-shadow: 0 0 4px #fff;
            margin-top: 5px;
        }

        #clock24 .dayOfWeek {
            font-size: 10px;
            color: #f5d3ed;
            text-shadow: 0 0 4px #fff;
        }

        #clock24 .date sup {
            font-size: 10px;
        }
    `;

    var styleElement = document.createElement('style');
    styleElement.innerHTML = clockStyles;
    document.head.appendChild(styleElement);
})();
