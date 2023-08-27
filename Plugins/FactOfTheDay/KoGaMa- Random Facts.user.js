// ==UserScript==
// @name         KoGaMa: Random Facts
// @namespace    github.com/xymine
// @version      0.2.6
// @description  Random facts, a bit scuffed but works.
// @author       Simon
// @match        https://www.kogama.com/*
// @icon         https://i.pinimg.com/564x/08/c1/4a/08c14ae40bb28bb4a694ad589bf40086.jpg
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function () {
  'use strict';
// Function to fetch the facts from the .txt file
async function fetchFacts() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/xymine/KoGaMaAddonBag/main/JS%20Snippets/FactOfTheDay/facts/facts.txt');
    if (!response.ok) {
      throw new Error('Failed to fetch the facts.');
    }
    const data = await response.text();
    const facts = data.split('\n').filter(fact => fact.trim() !== '');
    return facts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to get a random fact from the facts array
function getRandomFact(facts) {
  const randomIndex = Math.floor(Math.random() * facts.length);
  return facts[randomIndex];
}

// Function to handle button click and display the random fact popup
async function onButtonClick() {
  try {
    const facts = await fetchFacts();
    const factOfTheDay = getRandomFact(facts);
    createRandomFactPopup(factOfTheDay);
  } catch (error) {
    console.error(error);
  }
}
// Function to get the current date in the format "YYYY-MM-DD"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to get the "Fact of the Day" from local storage or fetch a new one
async function getFactOfTheDay() {
  const currentDate = getCurrentDate();
  const storedFact = localStorage.getItem('factOfTheDay');

  if (storedFact && JSON.parse(storedFact).date === currentDate) {
    // Use the stored fact if it's from the same day
    return JSON.parse(storedFact).fact;
  } else {
    // Fetch new facts and set a random fact as the "Fact of the Day"
    const facts = await fetchFacts();
    const randomIndex = Math.floor(Math.random() * facts.length);
    const factOfTheDay = facts[randomIndex];
    const factObject = { date: currentDate, fact: factOfTheDay };
    localStorage.setItem('factOfTheDay', JSON.stringify(factObject));
    return factOfTheDay;
  }
}


// Function to create the random fact popup
function createRandomFactPopup(fact) {
  const overlay = document.createElement('div');
  overlay.id = 'random-fact-overlay';
  document.body.appendChild(overlay);

  const popup = document.createElement('div');
  popup.id = 'random-fact-popup';
  overlay.appendChild(popup);

  const closeBtn = document.createElement('span');
  closeBtn.id = 'random-fact-close-btn';
  closeBtn.innerText = 'X';
  closeBtn.onclick = () => {
    overlay.style.display = 'none';
    document.getElementById('random-fact-popup').remove();
  };
  popup.appendChild(closeBtn);

  const factText = document.createElement('div');
  factText.id = 'random-fact-text';
  factText.innerText = fact;
  popup.appendChild(factText);

  overlay.style.display = 'block';
}





// Function to add the button to the page
function addRandomFactButton() {
  const button = document.createElement('button');
  button.id = 'random-fact-button';
  button.innerHTML = '<img src="https://i.imgur.com/Ji5YBDx.png" alt="Open Book" style="width: 20px; height: 20px; display: block; margin: 0 auto;">';
  button.onclick = onButtonClick;
  document.body.appendChild(button);
}
// Add CSS styles for the button and overlay
GM_addStyle(`
   #random-fact-button {
     position: fixed;
     top: 7px; /* Adjust top position as needed */
     right: 370px; /* Adjust right position as needed */
     z-index: 9999;
     background-color: #ffffff;
     border: 1px solid #ccc;
     border-radius: 25px;
     padding: 5px;
     cursor: pointer;
   }

  #random-fact-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
    z-index: 9998;
    display: none;
  }

  #random-fact-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 230px;
    transform: translate(-50%, -50%);
    background-color: #856352;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #1a1a1a;
    border-radius: 25px;
    padding: 20px;
    z-index: 9999;
  }

  #random-fact-close-btn {
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
  }

  #random-fact-text {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
`);

addRandomFactButton();
})();
