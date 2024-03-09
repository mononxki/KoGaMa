// ==UserScript==
// @name         Improved AutoPurchase
// @namespace    discord/@simonvhs
// @version        1.1
// @description  Automatically mass purchase marketplace objects.
// @author      ⛧ sim
// @match        https://www.kogama.com/*
// @icon         https://i.pinimg.com/564x/ad/83/19/ad83199abc62dd15d7251a40ecd6c3c4.jpg
// @grant        GM_addStyle
// ==/UserScript==
(function() {
  'use strict';

  GM_addStyle(`
    #gearButton {
      position: fixed;
      top: 50%;
      left: 0;
      z-index: 999999999;
      background-color: #363636;
      border: 1px solid #ccc;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }

    #menuBox {
      position: fixed;
      top: 50%;
      left: 19%;
      transform: translate(-100%, -50%);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #0d0d0d;
      border: 1px solid #ccc;
      border-radius: 15px;
      padding: 10px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    #menuBox #loopCountInput {
      flex: 1 0 100%;
      margin-bottom: 10px;
    }

    #menuBox #priceDisplay {
      flex: 1 0 100%;
      margin-top: 10px;
      color: #bf4955;
    }

    #menuBox input,
    #menuBox select,
    #menuBox button {
      display: block;
      margin-bottom: 10px;
      width: 100%;
      padding: 5px;
      background-color: #383838;
      border-radius: 8px;
      border: none;
      color: #fff;
      text-shadow: 0 0 1px #fff;

    }

    #menuBox button {
      background-color: #572d33;
      color: #fff;
      text-shadow: 0 0 2px #fff;
      box-shadow: 0 0 2px #ad5a66;
      border: none;
      cursor: pointer;
    }

    #menuBox button:hover {
      background-color: #d1364c;
      box-shadow: 0 0 4px #b80d65;
      text-shadow: 0 0 2px #4953bf;
        transition: 0.5s;
    }

    #logWindow {
      position: fixed;
      top: 87%;
      left: 0%;
      transform: translate(0, -50%);
      background-color: #0d0d0d;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 10px;
      width: 300px;
      max-height: 300px;
      overflow-y: auto;
    }
    ::-webkit-scrollbar {
    width: 1px;
    }
  `);

  const gearButton = document.createElement('div');
  gearButton.id = 'gearButton';
  gearButton.textContent = '⚙️';

  const menuBox = document.createElement('div');
  menuBox.id = 'menuBox';
  menuBox.style.display = 'none';

  const idInput = document.createElement('input');
  idInput.setAttribute('type', 'text');
  idInput.placeholder = 'Object ID';

  const dropdownMenu = document.createElement('select');
  const option1 = document.createElement('option');
  option1.text = 'AVATAR';
  dropdownMenu.add(option1);
  const option2 = document.createElement('option');
  option2.text = 'MODEL';
  dropdownMenu.add(option2);
  dropdownMenu.placeholder = 'SELECT CREATION';

  const loopCountInput = document.createElement('input');
  loopCountInput.setAttribute('type', 'number');
  loopCountInput.placeholder = 'Amount of Loops:';

  const startButton = document.createElement('button');
  startButton.textContent = 'START';

  const stopButton = document.createElement('button');
  stopButton.textContent = 'STOP';

  const priceDisplay = document.createElement('div');
  priceDisplay.style.color = '#bf4955';
  priceDisplay.style.marginTop = '10px';
     priceDisplay.style.marginBottom = '10px';
  priceDisplay.textContent = 'Gold Required: ';

  const logWindow = document.createElement('div');
  logWindow.id = 'logWindow';

  menuBox.appendChild(idInput);
  menuBox.appendChild(dropdownMenu);
  menuBox.appendChild(priceDisplay);
  menuBox.appendChild(loopCountInput);
  menuBox.appendChild(startButton);
  menuBox.appendChild(stopButton);

  document.body.appendChild(gearButton);
  document.body.appendChild(menuBox);
  document.body.appendChild(logWindow);

  function openMenu() {
    menuBox.style.display = 'block';
  }

  function closeMenu() {
    menuBox.style.display = 'none';
  }

  gearButton.addEventListener('click', function() {
    if (menuBox.style.display === 'block') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  let ongoingRequest = null;
  let isRunning = false;

  function handleAvatarChoice(avatarID, loopCount) {
    let count = 0;

    function purchaseWithDelay() {
      if (!isRunning) return;
      log('Request sent for AVATAR');

      fetch(`https://www.kogama.com/model/market/a-${avatarID}/purchase/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => {
          if (response.ok) {
            log('Purchase successful for AVATAR');
          } else {
            console.error('Purchase failed:', response.status);
          }
        })
        .catch(error => {
          console.error('Purchase failed:', error);
        })
        .finally(() => {
          count++;
          if (count < loopCount && isRunning) {
            ongoingRequest = setTimeout(purchaseWithDelay, 30000);
          } else {
            isRunning = false;
          }
        });
    }

    isRunning = true;
    purchaseWithDelay();
  }

  function handleModelChoice(modelID, loopCount) {
    let count = 0;

    function purchaseWithDelay() {
      if (!isRunning) return;
      log('Request sent for MODEL');

      fetch(`https://www.kogama.com/model/market/i-${modelID}/purchase/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => {
          if (response.ok) {
            log('Purchase successful for MODEL');
          } else {
            console.error('Purchase failed:', response.status);
          }
        })
        .catch(error => {
          console.error('Purchase failed:', error);
        })
        .finally(() => {
          count++;
          if (count < loopCount && isRunning) {
            ongoingRequest = setTimeout(purchaseWithDelay, 30000);
          } else {
            isRunning = false;
          }
        });
    }

    isRunning = true;
    purchaseWithDelay();
  }

  function startPurchase() {
    const loopCount = parseInt(loopCountInput.value) || 1;
    const selectedOption = dropdownMenu.value;

    if (selectedOption === 'AVATAR') {
      const avatarID = idInput.value;
      handleAvatarChoice(avatarID, loopCount);
    } else if (selectedOption === 'MODEL') {
      const modelID = idInput.value;
      handleModelChoice(modelID, loopCount);
    } else {
      console.error('Invalid selection');
    }
  }

  function stopPurchase() {
    clearTimeout(ongoingRequest);
    isRunning = false;
    log('Purchase stopped');
  }

  startButton.addEventListener('click', startPurchase);
  stopButton.addEventListener('click', stopPurchase);

  function log(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `${timestamp}: ${message}`;
    console.log(logMessage);

    const logEntry = document.createElement('div');
    logEntry.textContent = logMessage;
    logWindow.appendChild(logEntry);
    logWindow.scrollTop = logWindow.scrollHeight;
  }

  // Function to update the price display continuously
  function updatePrice() {
    const loopCount = parseInt(loopCountInput.value) || 0;
    const selectedOption = dropdownMenu.value;
    let price;

    if (loopCount === 0) {
      price = 0;
    } else if (selectedOption === 'AVATAR') {
      price = loopCount * 140;
    } else if (selectedOption === 'MODEL') {
      price = loopCount * 10;
    } else {
      console.error('Invalid selection');
      return;
    }

    priceDisplay.textContent = `Gold Required: ${price}`;
  }

  loopCountInput.addEventListener('input', updatePrice);
  dropdownMenu.addEventListener('change', updatePrice);
  updatePrice();
})();
