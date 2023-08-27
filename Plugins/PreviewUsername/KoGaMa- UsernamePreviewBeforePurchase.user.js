// ==UserScript==
// @name         KoGaMa: UsernamePreviewBeforePurchase
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  Make it simpler to check whether the username fits your liking!
// @author       Simon
// @match        https://www.kogama.com/profile/*
// @icon         https://i.pinimg.com/564x/2d/d8/21/2dd821169b9cd9427a787124c98c3a61.jpg
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  function createChangePlaceholderWindow() {
    const windowBox = document.createElement('div');
    windowBox.style.position = 'fixed';
    windowBox.style.top = '50%';
    windowBox.style.left = '50%';
    windowBox.style.transform = 'translate(-50%, -50%)';
    windowBox.style.backgroundColor = '#0d0d0d';
    windowBox.style.padding = '20px';
    windowBox.style.borderRadius = '10px';
    windowBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    windowBox.style.zIndex = '9999';

    const usernameInput = document.createElement('div');
    usernameInput.style.position = 'relative';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = '   Preview Username Input';
    inputField.style.width = '100%';
    inputField.style.backgroundColor = '#565359';
    inputField.style.color = '#fff';
    inputField.style.borderRadius = '12px';
    inputField.style.marginBottom = '10px';
    inputField.style.padding = '8px'; // Added padding to the input field
    inputField.style.paddingRight = '35px'; // Adjusted to accommodate the icon

    const infoIcon = document.createElement('span');
    infoIcon.innerHTML = '❓';
    infoIcon.style.position = 'absolute';
    infoIcon.style.top = '50%';
    infoIcon.style.right = '10px'; // Adjusted right padding for the icon
    infoIcon.style.transform = 'translateY(-50%)';
    infoIcon.style.cursor = 'pointer';
    infoIcon.title = 'Hover over this icon for helpful information.';
    infoIcon.addEventListener('mouseover', () => {
      alert('Enter a new username preview in the text field. This preview will be displayed when you hover over your username.');
    });

    usernameInput.appendChild(inputField);
    inputField.appendChild(infoIcon);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginRight = '10px';
    closeButton.style.borderRadius = '15px';
    closeButton.style.backgroundColor = '#63081f';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(windowBox);
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.marginRight = '10px';
    resetButton.style.borderRadius = '15px';
    resetButton.style.backgroundColor = '#753545';
    resetButton.addEventListener('click', () => {
      localStorage.removeItem('customUsername');
      window.location.reload(); // Refresh the page
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.borderRadius = '15px';
    saveButton.style.backgroundColor = '#538a4d';
    saveButton.addEventListener('click', () => {
      const newPlaceholder = inputField.value;
      if (newPlaceholder) {
        const usernameLink = document.querySelector('h1 a.tool-tip');
        if (usernameLink) {
          usernameLink.setAttribute('title', newPlaceholder);
          localStorage.setItem('customUsername', newPlaceholder);
          usernameLink.textContent = newPlaceholder;
        }
      }
      document.body.removeChild(windowBox);
    });

    windowBox.appendChild(usernameInput);
    windowBox.appendChild(closeButton);
    windowBox.appendChild(resetButton);
    windowBox.appendChild(saveButton);

    document.body.appendChild(windowBox);
  }

  const butterflyButton = document.createElement('div');
  butterflyButton.innerHTML = 'Username Preview';
  butterflyButton.style.position = 'absolute';
  butterflyButton.style.top = '20%';
  butterflyButton.style.right = '230px';
  butterflyButton.style.fontSize = '14px';
  butterflyButton.style.borderRadius = '14px';
  butterflyButton.style.backgroundColor = '#4278f5';
  butterflyButton.style.color = 'white';
  butterflyButton.style.padding = '8px 12px';
  butterflyButton.style.cursor = 'pointer';
  butterflyButton.style.zIndex = '999';
  butterflyButton.style.boxShadow = '0 0 10px #2261f5';
  butterflyButton.style.transition = 'transform 0.3s, box-shadow 0.3s';

  butterflyButton.addEventListener('click', () => {
    createChangePlaceholderWindow();
  });

  butterflyButton.addEventListener('mouseover', () => {
    butterflyButton.style.transform = 'scale(1.1)';
    butterflyButton.style.boxShadow = '0 0 20px #2261f5';
  });

  butterflyButton.addEventListener('mouseout', () => {
    butterflyButton.style.transform = 'scale(1)';
    butterflyButton.style.boxShadow = '0 0 10px #2261f5';
  });

  const sectionTop = document.querySelector('#mobile-page #profile-page .section-top');
  if (sectionTop) {
    sectionTop.appendChild(butterflyButton);
  }

  // Check if there is a custom username saved in local storage
  const savedUsername = localStorage.getItem('customUsername');
  if (savedUsername) {
    const usernameLink = document.querySelector('h1 a.tool-tip');
    if (usernameLink) {
      usernameLink.setAttribute('title', savedUsername);
      usernameLink.textContent = savedUsername;
    }
  }
})();