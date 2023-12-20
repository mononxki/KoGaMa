// ==UserScript==
// @name          KoGaMa Addon: Butterfly Mouse Trail
// @namespace    https://github.com/LowOnGravity
// @version      1.4
// @description  A simple script that adds mouse trail to your mouse
// @author      zombieaztro
// @match       https://www.kogama.com/*
// @grant        GM_addStyle
// ==/UserScript==
(function() {
  'use strict';

  const catUrl = 'https://i.imgur.com/oyyd3QI.gif';
  const flowerUrl = 'https://i.imgur.com/ci1GKmF.png';
  const catWidth = 80;
  const catHeight = 80;
  const flowerSize = 32;
  const flowerOffset = flowerSize / 2;
  const delay = 60;

  // create cat image
  const catImg = document.createElement('img');
  catImg.src = catUrl;
  catImg.style.width = `${catWidth}px`;
  catImg.style.height = `${catHeight}px`;
  catImg.style.position = 'fixed';
  catImg.style.zIndex = '99999';
  catImg.style.pointerEvents = 'none';

  // create flower image
  const flowerImg = document.createElement('img');
  flowerImg.src = flowerUrl;
  flowerImg.style.width = `${flowerSize}px`;
  flowerImg.style.height = `${flowerSize}px`;
  flowerImg.style.position = 'fixed';
  flowerImg.style.zIndex = '9999';
  flowerImg.style.pointerEvents = 'none';

  // add cat and flower to page
  document.body.appendChild(catImg);
  document.body.appendChild(flowerImg);

  // move cat and flower on mouse move
  document.addEventListener('mousemove', e => {
    // calculate cat position with a delay
    const catX = e.clientX - catWidth / 2;
    const catY = e.clientY - catHeight / 2;
    setTimeout(() => {
      catImg.style.left = `${catX}px`;
      catImg.style.top = `${catY}px`;
    }, delay);

    // set flower position to cursor position with a delay
    const flowerX = e.clientX - flowerOffset;
    const flowerY = e.clientY - flowerOffset;
    setTimeout(() => {
      flowerImg.style.left = `${flowerX}px`;
      flowerImg.style.top = `${flowerY}px`;
    }, delay);

    // calculate distance between cursor and flower
    const dx = flowerX - e.clientX;
    const dy = flowerY - e.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
  });

     // hide cursor
  document.documentElement.style.cursor = 'none';


  // add CSS animation to flower
  GM_addStyle(`img[src="${flowerUrl}"] {
    animation-name: custom-cursor-animation;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    pointer-events: none;
  }
  @keyframes custom-cursor-animation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }`);

})();
