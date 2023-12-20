(function () {
  'use strict';

  GM_addStyle(`
      ::-webkit-scrollbar {
        width: 1px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

#kogamaPopup {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 9999;
background-color: #2b2b2b;
border: 1px solid #698276;
border-radius: 23px;
color: #fff;
padding: 10px;
max-height: 400px;
overflow-y: auto;
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
transition: all ease-in-out 0.8s;
}
#kogamaPopup:hover {
box-shadow: 0 0 15px black;
}

#kogamaPopup a {
text-decoration: none;
color: #fff;
cursor: pointer;
display: inline-block;
padding: 8px;
position: relative;
overflow: hidden;
transition: all  0.8s ease-in-out;
}

#kogamaPopup a::before {
content: "";
position: absolute;
left: 50%;
bottom: 0;
width: 0;
height: 2px;
background: #698276; /* Change the color to your desired underline color */
transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
transform-origin: center;
}

#kogamaPopup a:hover {
background: #303030;
box-shadow: 0 -1px 1px #fff;
border-radius: 13px;
}

#kogamaPopup a:hover::before {
width: 100%;
left: 0;
}



      #kogamaCloseBtn {
          text-align: center;
          margin-top: 10px;
          position: fixed;
          top: 75%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000; /* Adjusted z-index */
      }

      #kogamaCloseBtn button {
          padding: 8px;
          background-color: #698276;
          color: #fff;
          border: none;
          border-radius: 13px;
          cursor: pointer;
          transition: all ease-in-out 0.7s;
          width: 150px; /* Adjusted width */
      }

      #kogamaCloseBtn button:hover {
          background-color: #697082;
          box-shadow: 0 0 15px black;
      }

      #darkLayer {
          position: fixed;t
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          display: none;
      }

      .warning {
          color: red;
          margin-top: 10px;
      }

      #dropdownContainer {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000; /* Adjusted z-index */
      }

      #pageDropdown {
          width: 150px; /* Adjusted width */
          text-align: center; /* Center the text */
      }
  `);

  function createPopup() {
      const popup = document.createElement('div');
      popup.id = 'kogamaPopup';

      document.body.appendChild(popup);
  }

  function createDarkLayer() {
      const darkLayer = document.createElement('div');
      darkLayer.id = 'darkLayer';

      document.body.appendChild(darkLayer);
  }

  function showDarkLayer() {
      const darkLayer = document.getElementById('darkLayer');

      if (darkLayer) {
          darkLayer.style.display = 'block';
      }
  }

  function hideDarkLayer() {
      const darkLayer = document.getElementById('darkLayer');

      if (darkLayer) {
          darkLayer.style.display = 'none';
      }
  }

  function addPageDropdown(pageCount) {
      const dropdownContainer = document.createElement('div');
      dropdownContainer.id = 'dropdownContainer';
      document.body.appendChild(dropdownContainer);

      const dropdown = document.createElement('select');
      dropdown.id = 'pageDropdown';
      dropdown.addEventListener('change', (event) => {
          const selectedPage = event.target.value;
          clearPopupContent();
          fetchData(selectedPage);
      });

      for (let page = 1; page <= pageCount; page++) {
          const option = document.createElement('option');
          option.value = page;
          option.textContent = `${page}`;
          dropdown.appendChild(option);
      }

      dropdownContainer.appendChild(dropdown);
  }

  function addGameToPopup(gameName, gameHref) {
      const popup = document.getElementById('kogamaPopup');

      if (popup) {
          const gameLink = document.createElement('a');
          gameLink.href = `https://www.kogama.com${gameHref}`;
          gameLink.textContent = gameName;

          const listItem = document.createElement('div');
          listItem.appendChild(gameLink);
          listItem.style.marginBottom = '8px';

          popup.appendChild(listItem);
      }
  }

  function clearPopupContent() {
      const popup = document.getElementById('kogamaPopup');

      if (popup) {
          while (popup.firstChild) {
              popup.removeChild(popup.firstChild);
          }
      }
  }

  function addCloseButton() {
      const closeBtnContainer = document.createElement('div');
      closeBtnContainer.id = 'kogamaCloseBtn';
      document.body.appendChild(closeBtnContainer);

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', () => {
          const popup = document.getElementById('kogamaPopup');
          if (popup) {
              popup.style.display = 'none';
              hideDarkLayer();
          }
      });

      closeBtnContainer.appendChild(closeButton);
  }

  function displayWarning(page) {
      const popup = document.getElementById('kogamaPopup');

      if (popup) {
          const warning = document.createElement('div');
          warning.textContent = `⚠️: Unable to connect to page ${page}.`;
          warning.classList.add('warning');

          popup.appendChild(warning);
      }
  }

  function getPageCount() {
      const paginator = document.querySelector('.paginator');
      if (paginator) {
          const pageLinks = paginator.querySelectorAll('li a');
          return pageLinks.length;
      }
      return 1; // default to 1 page if paginator is not found
  }

  async function fetchData(page) {
      try {
          const response = await fetch(`https://www.kogama.com/build/?page=${page}&count=12`);
          const data = await response.text();

          const tempElement = document.createElement('div');
          tempElement.innerHTML = data;

          const projectListSection = tempElement.querySelector('section.project-list');

          if (projectListSection) {
              const gameItems = projectListSection.querySelectorAll('li.game-item');

              gameItems.forEach((gameItem) => {
                  const gameName = gameItem.querySelector('.game-name').textContent.trim();
                  const gameHref = gameItem.querySelector('a').getAttribute('href');

                  addGameToPopup(`${gameName}`, gameHref);
              });
          } else {
              displayWarning(page);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
          displayWarning(page);
      }
  }

  async function fetchAllData() {
      createPopup();
      createDarkLayer();
      showDarkLayer();

      const pageCount = getPageCount();
      addPageDropdown(pageCount);

      const selectedPage = document.getElementById('pageDropdown').value;
      await fetchData(selectedPage);

      addCloseButton();
  }

  fetchAllData();
})();