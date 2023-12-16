// ==UserScript==
// @name         KoGaMa View Friends
// @namespace    github.com/2facvd
// @version      1.1
// @description  Temporary fix for Friends' page causing ERROR 500.
// @author       2FACVD (Simon)
// @match        https://www.kogama.com/profile/*/friends/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  function createBlurLayer() {
    const blurLayer = document.createElement('div');
    blurLayer.id = 'blur-layer';
    blurLayer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9998;
      backdrop-filter: blur(5px);
    `;

    document.body.appendChild(blurLayer);
    return blurLayer;
  }

  function createMetadataBox() {
    const metadataBox = document.createElement('div');
    metadataBox.id = 'metadata-box';
    metadataBox.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #090909;
      color: #fff;
      padding: 20px;
      box-shadow: 0 0 3px #924F4F;
      border-radius: 13px;
      width: 900px;
      max-height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    const metadataHeader = document.createElement('h2');
    metadataHeader.textContent = 'M E T A - D A T A';
    metadataHeader.style.letterSpacing = '8px';
    metadataBox.appendChild(metadataHeader);

    const metadataContent = document.createElement('div');
    metadataContent.className = 'metadata-content';
    metadataContent.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    `;
    metadataBox.appendChild(metadataContent);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
      background-color: #782828;
      color: #000;
      border-radius: 9px;
      box-shadow: 0 0 4px #985151;
      border: none;
      padding: 8px;
      margin-top: 10px;
      cursor: pointer;
    `;
    closeButton.addEventListener('click', () => {
      metadataBox.remove();
      document.getElementById('blur-layer').remove();
    });
    metadataBox.appendChild(closeButton);

    document.body.appendChild(metadataBox);
    return metadataContent;
  }

  function fetchAndDisplayFriendMetadata() {
    const userId = window.location.pathname.split('/')[2];

    fetch(`https://www.kogama.com/user/${userId}/friend/?count=510`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const blurLayer = createBlurLayer();
      const metadataContent = createMetadataBox();

      const simplifiedData = {
        data: data.data.map(friend => ({
          friend_profile_id: friend.friend_profile_id,
          friend_username: friend.friend_username
        }))
      };

      simplifiedData.data.forEach((friend, index) => {
        const metadataItem = document.createElement('div');
        const userLink = document.createElement('a');
        userLink.href = `https://www.kogama.com/profile/${friend.friend_profile_id}`;
        userLink.textContent = friend.friend_username;
        userLink.style.cssText = `
          text-decoration: none;
          cursor: pointer;
          padding: 2px;
          border-radius: 8px;
          text-align: center;
          margin: 5px;
          display: inline-block;
          color: #fff;
          background: linear-gradient(90deg, #8B0000, #FF0000, #DC143C);
          background-clip: text;
          -webkit-background-clip: text;
          transition: background-size 0.7s ease-in-out, text-shadow 0.7s ease-in-out;
        `;

        userLink.addEventListener('mouseenter', () => {
          userLink.style.backgroundSize = '300% 100%';
          userLink.style.textShadow = '0px 0px 15px rgba(255, 255, 255, 0.8)';
        });

        userLink.addEventListener('mouseleave', () => {
          userLink.style.backgroundSize = '100% 100%';
          userLink.style.textShadow = 'none';
        });

        metadataItem.appendChild(userLink);
        metadataContent.appendChild(metadataItem);
      });

      document.title = `Friend Metadata - ${userId}`;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  GM_addStyle(`
    ::-webkit-scrollbar {
      width: 1px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  `);

  fetchAndDisplayFriendMetadata();
})();
