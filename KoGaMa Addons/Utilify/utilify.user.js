// ==UserScript==
// @name         Utilify: KoGaMa
// @namespace    discord/@simonvhs
// @version      1.5
// @description  KoGaMa Utility addon that adds a wide variety of features such as cleaner title tabs, bring back copy pasting and text formatting (bold, italic, links, etc.) as well as fix 'Disallow URL Input'.
// @author       ⛧ sim
// @match        https://www.kogama.com/profile/*
// @match        https://www.kogama.com/games/*
// @match        https://www.kogama.com/build/*
// @match        https://www.kogama.com/marketplace/model/*
// @match        https://www.kogama.com/marketplace/avatar/*
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

// CURRENT FEATURES:
  // - User Backgrounds
  // - Allow Paste
  // - Allow URL
  // - Better Titles
  // - Console Warning
  // - Compact Menu
  // - Fix Tylda syntax
  // - RichText
  // THIS FEATURE IS CURRENTLY UNAVAILABLE:
  // - Steal Description

(function() {
    'use strict';

    const profileId = window.location.pathname.split('/')[2];
    const requestUrl = `https://www.kogama.com/profile/${profileId}/`;

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const createdIndex = data.indexOf('"created":');
            const startIndex = data.indexOf('"', createdIndex + 10) + 1;
            const endIndex = data.indexOf('"', startIndex);
            const createdValue = data.substring(startIndex, endIndex);
            const createdDate = new Date(createdValue);
            const formattedDate = `${createdDate.getDate()} ${getMonthName(createdDate.getMonth())} ${createdDate.getFullYear()}, ${createdDate.getHours()}:${padZero(createdDate.getMinutes())}`;
            const targetElement = document.querySelector('._1jTCU ._20K92');
            if (targetElement) {
                targetElement.textContent = formattedDate;
            } else {
                console.error('Target element not found.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
})();






  (function() {
    'use strict';

    function getUserInfoFromHTML() {
        const usernameElement = document.querySelector('.username h1');
        if (usernameElement) {
            const username = usernameElement.textContent.trim();
            return { username };
        }
        return null;
    }

    function getProfileIDFromURL() {
        const profileIDMatch = window.location.pathname.match(/\/profile\/([^/]+)\//);
        return profileIDMatch ? profileIDMatch[1] : null;
    }

    function getGameInfoFromURL() {
        const gameTitleElement = document.querySelector('.game-title');
        if (gameTitleElement) {
            const gameTitle = gameTitleElement.textContent.trim();
            const gameIDMatch = window.location.pathname.match(/\/games\/play\/([^/]+)\//);
            const gameID = gameIDMatch ? gameIDMatch[1] : null;
            return { gameTitle, gameID };
        }
        return null;
    }

    function getBuildInfoFromURL() {
        const modeElement = document.querySelector('.project-information .display h2');
        if (modeElement) {
            const mode = modeElement.textContent.trim();
            return { mode };
        }
        return null;
    }

    function getModelInfoFromURL() {
        const modelTitleElement = document.querySelector('.product-header .page-header');
        if (modelTitleElement) {
            const modelTitle = modelTitleElement.textContent.trim();
            return { modelTitle };
        }
        return null;
    }

    function getAvatarInfoFromURL() {
        const avatarTitleElement = document.querySelector('.product-header .page-header');
        if (avatarTitleElement) {
            const avatarTitle = avatarTitleElement.textContent.trim();
            return { avatarTitle };
        }
        return null;
    }

    function isPlayingGame() {
        return window.location.pathname.startsWith('/games/play/');
    }

    function setDocumentTitle() {
        const path = window.location.pathname;

        if (path.startsWith('/profile/')) {
            const userInfo = getUserInfoFromHTML();
            const profileID = getProfileIDFromURL();

            if (userInfo && profileID) {
                const { username } = userInfo;
                document.title = `(U:${profileID}) ${username}`;
            }
        } else if (path.startsWith('/games/')) {
            if (isPlayingGame()) {
                const gameInfo = getGameInfoFromURL();
                if (gameInfo) {
                    const { gameTitle, gameID } = gameInfo;
                    document.title = `(G:${gameID}) ${gameTitle}`;
                }
            } else {
                document.title = 'Games';
            }
        } else if (path.startsWith('/build/')) {
            const buildInfo = getBuildInfoFromURL();
            if (buildInfo) {
                const { mode } = buildInfo;
                document.title = `(Project) ${mode}`;
            } else {
                document.title = 'Build';
            }
        } else if (path.startsWith('/marketplace/model/')) {
            const modelInfo = getModelInfoFromURL();
            if (modelInfo) {
                const { modelTitle } = modelInfo;
                document.title = `(Model) ${modelTitle}`;
            }
        } else if (path.startsWith('/marketplace/avatar/')) {
            const avatarInfo = getAvatarInfoFromURL();
            if (avatarInfo) {
                const { avatarTitle } = avatarInfo;
                document.title = `(Avatar) ${avatarTitle}`;
            }
        } else {
            document.title = 'Marketplace';
        }
    }

    setDocumentTitle();

    window.addEventListener('popstate', setDocumentTitle);

    window.addEventListener('load', setDocumentTitle);
})();
 // Disable Anti-paste listener.
(function() {
    var allowPaste = function(e){
   e.stopImmediatePropagation();
   return true;
 };
 document.addEventListener('paste', allowPaste, true);
 })();
 // Allow URL Input.
 (function() {
    'use strict';

    document.addEventListener('paste', function(event) {

        const clipboardData = (event.clipboardData || window.clipboardData).getData('text');


        if (clipboardData.startsWith('http://') || clipboardData.startsWith('https://')) {

            const formattedLink = clipboardData.replace(/\./g, '%2E');


            document.execCommand('insertText', false, formattedLink);


            event.preventDefault();
        }
    });
})();

// REGEX
(function() {
    'use strict';



    function addMarkdownFormatting(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/# (.*?)\n/g, '<h1>$1</h1>');
        text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');
        text = text.replace(/__(.*?)__/g, '<u>$1</u>');
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank">' + title + '</a>';
            }
        });
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');

        return text;
    }

    function formatMarkdownForElement(element) {
        if (element) {
            var formattedText = addMarkdownFormatting(element.innerHTML);
            element.innerHTML = formattedText;
        }
    }

    function checkForChanges() {
        var allElements = document.querySelectorAll('body *:not(script)');
        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                formatMarkdownForElement(element);
            }
        }

        var targetElement = document.querySelector('#description-extend .text');
        formatMarkdownForElement(targetElement);

        setTimeout(checkForChanges, 500);
    }

    window.addEventListener('load', checkForChanges);

})();

{setTimeout(() => {
const ConsoleStyle = Object.freeze({
    HEADING: "background-color:#d25858;font-size:70px;font-weight:bold;color:white;",
    NORMAL : "font-size:20px;",
    URGENT : "font-size:25px;font-weight:bold;color:red;",
    INVITE : "color: transparent;text-decoration:underline;font-weight:bold;font-size:20px;background: linear-gradient(to bottom, #865cb5, #ff69b4);-webkit-background-clip: text;background-clip: text;"
});

   console.log(`%c Chill, Cowboy! `,    ConsoleStyle.HEADING);
        console.log("%c" + "If someone told you to copy/paste something here, it's likely you're being scammed.",     ConsoleStyle.NORMAL);
        console.log("%c" + "Pasting anything in here could give attackers access to your KoGaMa account.",    ConsoleStyle.URGENT);
        console.log("%c" + "Unless you know exactly what you're doing, close this window and stay safe.",  ConsoleStyle.NORMAL);
        console.log("%c" + "You might want to consider reporting the user who told you to open it.", ConsoleStyle.NORMAL);
        console.log("%c" + "However, if you are aware of what you are doing, consider hitting me up on @simonvhs", ConsoleStyle.INVITE);
}, "2300")
}
(async function() {
    'use strict';

    const waitForElement = async (selector) => {
        while (!document.querySelector(selector)) {
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
        return document.querySelector(selector);
    };

    const InsertBeforeLoad = async () => {
        try {
            const DESCRIPTION_ELEMENT = await waitForElement('div._9smi2 > div.MuiPaper-root._1rJI8.MuiPaper-rounded > div._1aUa_');
            const DESCRIPTION_TEXT = DESCRIPTION_ELEMENT.textContent; // Using textContent instead of innerHTML
            const BACKGROUND_AVATAR = document.querySelector('._33DXe');
            const BACKGROUND_SECTION = document.querySelector('._33DXe');

            // Fix REGEX
            const BACKGROUND_REGEXP = /(?:\|\|)?Background:\s*(\d+)(?:,\s*filter:\s*(light|dark|blur|none))?;?(?:\|\|)?/i;
            const match = BACKGROUND_REGEXP.exec(DESCRIPTION_TEXT);

            if (match && typeof match == 'object') {
                const gameId = match[1];
                const embedUrl = `https://www.kogama.com/games/play/${gameId}/embed`;
                console.log("%cFetched embed URL:", "color: blue", embedUrl);

                const imageSrc = await fetchImageSource(gameId);

                BACKGROUND_AVATAR.style.transition = 'opacity 0.3s ease-in';
                BACKGROUND_AVATAR.style.opacity = '0';

                BACKGROUND_SECTION.style.transition = 'opacity 0.3s ease-in';
                BACKGROUND_SECTION.style.opacity = '0';

                setTimeout(() => {
                    BACKGROUND_AVATAR.style.opacity = '1';
                    BACKGROUND_SECTION.style.opacity = '1';
                }, 1000);


                BACKGROUND_SECTION.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${imageSrc}")`;

                switch (match[2]) {
                    case 'blur':
                        BACKGROUND_AVATAR.style.filter = 'none';
                        BACKGROUND_SECTION.style.filter = 'blur(5px)';
                        break;
                    case 'none':
                        BACKGROUND_AVATAR.style.opacity = 'unset';
                        BACKGROUND_AVATAR.style.filter = 'none';

                        BACKGROUND_SECTION.style.filter = 'none';
                        break;
                    case 'dark':
                        BACKGROUND_SECTION.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${imageSrc}")`;
                        break;
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    async function fetchImageSource(gameId) {
        try {
            const url = `https://www.kogama.com/games/play/${gameId}/embed`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: ${response.status}`);
            }

            const htmlText = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlText;

            // Locate input with large image
            const inputElement = tempDiv.querySelector('li.large input.pure-input');

            // steal the value
            const kogstaticUrl = inputElement.value;

            // log to console to make sure it works - debug runs..
            console.log('Fetched Kogstatic URL:', kogstaticUrl);

            return kogstaticUrl;
        } catch (error) {
            throw new Error(`Error fetching image source: ${error.message}`);
        }
    }

    InsertBeforeLoad();
})();


(function() {
    'use strict';


    function fixFormatting() {
        var elements = document.querySelectorAll('*');
        elements.forEach(function(element) {
            var textNodes = element.childNodes;
            textNodes.forEach(function(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.nodeValue = node.nodeValue.replace(/&amp;#39;/g, "'");
                }
            });
        });
    }


    setInterval(fixFormatting, 500);
})();
// COMPACT MENU
    function removeElementsByClass(className){
        var elements = document.querySelectorAll(className);
        elements.forEach(function(element) {
            element.remove();
        });
    }


    window.addEventListener('load', function() {

        removeElementsByClass('.news');
        removeElementsByClass('.subscription');
        removeElementsByClass('.purchase');
    });


    var observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {

                removeElementsByClass('.news');
                removeElementsByClass('.subscription');
                removeElementsByClass('.purchase');
            }
        });
    });


    var targetNode = document.body;
    var config = { childList: true, subtree: true };


    observer.observe(targetNode, config);



const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
};

