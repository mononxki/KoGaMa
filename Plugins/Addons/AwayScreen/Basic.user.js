// ==UserScript==
// @name         KoGaMa: Snowfall AwayScreen
// @namespace    github.com/xymine
// @version      3.0
// @description  A simple and cute protection from family members whenever you're away x.x
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon        https://i.pinimg.com/736x/89/30/36/8930365652708bf242aac7aa0211dfe2.jpg
// @grant    GM_addStyle
// ==/UserScript==
 
(function() {
    'use strict';
 
 
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(74, 74, 73, 0.24)'; // Transparent-like 
    overlay.style.backdropFilter = 'blur(10px)'; // Apply backdrop filter for blur effect
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.zIndex = '9999999999'; // Ensure the overlay is on top
    overlay.style.pointerEvents = 'none'; // Allows clicks to pass through the overlay
    document.body.appendChild(overlay);
 
    // Create the snowfall effect
    var flakes = 90;
    var flakeElements = [];
 
 
    function createSnowflake() {
        var flake = document.createElement('div');
        flake.className = 'flake';
        flake.style.left = Math.random() * 100 + "%";
        flake.style.animationDelay = Math.random() * 10 + "s"; // Randomize animation delay
        document.body.appendChild(flake);
        return flake;
    }
 
t
    function startSnowfall() {
        for (var i = 0; i < flakes; i++) {
            var flake = createSnowflake();
            flakeElements.push(flake);
        }
    }
 
    // Function to handle mouse movement detection
    var mouseTimer;
    function startMouseTimer() {
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(function() {
            overlay.style.opacity = '1';
            startSnowfall();
        }, 4000);
    }
 
    // Event listener for mouse movement
    document.addEventListener('mousemove', function() {
        overlay.style.opacity = '0';
        startMouseTimer();
    });
 
    // Initial setup
    overlay.style.opacity = '0';
    startMouseTimer();
 
    // Add CSS styles for snowflakes
    GM_addStyle('.flake { position: fixed; top: -10px; left: 0; width: 2px; height: 2px; background-color: #FFF; pointer-events: none; z-index: 9999999999; animation: snowfall 10s linear infinite; }');
    GM_addStyle('@keyframes snowfall { 0% { transform: translateY(-10px); } 100% { transform: translateY(100vh); } }');
})();