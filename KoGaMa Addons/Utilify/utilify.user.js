// ==UserScript==
// @name         Utilify: KoGaMa
// @namespace    discord/@simonvhs
// @version      1.4
// @description  KoGaMa Utility addon that adds a wide variety of features such as cleaner title tabs, bring back copy pasting and text formatting (bold, italic, links, etc.) as well as fix 'Disallow URL Input'.
// @author       ⛧ sim
// @match        https://www.kogama.com/profile/*
// @match        https://www.kogama.com/games/*
// @match        https://www.kogama.com/build/*
// @match        https://www.kogama.com/marketplace/model/*
// @match        https://www.kogama.com/marketplace/avatar/*
// @grant        GM_setClipboard
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
  // - Steal Description

(function() {
    'use strict';


    function copyTextToClipboard(text) {
        var tempTextArea = document.createElement("textarea");
        tempTextArea.style.position = "absolute";
        tempTextArea.style.left = "-9999px";
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        tempTextArea.setSelectionRange(0, text.length);

        document.execCommand("copy");

        document.body.removeChild(tempTextArea);
    }
        function displayNotification(message, isSuccess) {
        var notification = document.createElement("div");
        notification.style.position = "fixed";
        notification.style.top = "50%";
        notification.style.left = "50%";
        notification.style.transform = "translate(-50%, -50%)";
        notification.style.padding = "10px";
        notification.style.backgroundColor = isSuccess ? "green" : "red";
        notification.style.color = "white";
        notification.style.fontSize = "16px";
        notification.style.borderRadius = "5px";
        notification.style.zIndex = "9999";
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(function(){
            document.body.removeChild(notification);
        }, 2000);
    }

    document.addEventListener('DOMContentLoaded', function() {

        var bioContainer = document.querySelector("#mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container");
        if (bioContainer) {

            var copyButton = document.createElement("button");
            copyButton.textContent = "Copy";
            copyButton.style.position = "absolute";
            copyButton.style.top = "10px";
            copyButton.style.left = "50px";
            copyButton.style.fontSize = "12px";
            copyButton.style.backgroundColor = "transparent";
            copyButton.style.textShadow = "0 0 3px #fff";
            copyButton.style.cursor = "pointer";
            copyButton.style.opacity = "0";
            copyButton.style.transition = "opacity 0.5s";
            bioContainer.appendChild(copyButton); // Append to the bio container

            // Fade in the copy button
            setTimeout(function(){
                copyButton.style.opacity = "1";
            }, 10);


            copyButton.addEventListener("click", function(){

                var descriptionText = bioContainer.querySelector(".text").textContent.trim();


                copyTextToClipboard(descriptionText);


                displayNotification("Text copied to clipboard", true);
            });


            bioContainer.addEventListener("mouseenter", function(){

                copyButton.style.opacity = "1";
            });
            bioContainer.addEventListener("mouseleave", function(){

                copyButton.style.opacity = "0";
            });
        }
    });
})();
document.addEventListener('DOMContentLoaded', function () {
    var miniProfile = document.getElementById('react-ingame-mini-profile');
    if (miniProfile) {
        miniProfile.style.display = 'none';
    }
});



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
    URGENT : "font-size:25px;font-weight:bold;color:red;"
});

   console.log(`%c Chill, Cowboy! `,    ConsoleStyle.HEADING);
        console.log("%c" + "If someone told you to copy/paste something here, it's likely you're being scammed.",     ConsoleStyle.NORMAL);
        console.log("%c" + "Pasting anything in here could give attackers access to your KoGaMa account.",    ConsoleStyle.URGENT);
        console.log("%c" + "Unless you know exactly what you're doing, close this window and stay safe.",  ConsoleStyle.NORMAL);
        console.log("%c" + "You might want to consider reporting the user who told you to open it.", ConsoleStyle.NORMAL);
}, "2300")
}
const InsertBeforeLoad = async () => {
  const DESCRIPTION_TEXT = document.querySelector('#description-extend > div > div.text').innerHTML;
  const BACKGROUND_AVATAR = document.querySelector('.background-avatar');
  const BACKGROUND_SECTION = document.querySelector('.section-top-background');
  const BACKGROUND_REGEXP = /background:\s*(\d+)(?:,\s*filter:\s*(light|dark|blur|none))?;/i;
  const BACKGROUND_DETAILS = BACKGROUND_REGEXP.exec(DESCRIPTION_TEXT);

  if (typeof BACKGROUND_DETAILS == 'object') {
    try {
      const gameId = BACKGROUND_DETAILS[1];
      const imageSrc = await fetchImageSource(gameId);


      BACKGROUND_AVATAR.style.transition = 'opacity 0.3s ease-in';
      BACKGROUND_AVATAR.style.opacity = '0';

      BACKGROUND_SECTION.style.transition = 'opacity 0.3s ease-in';
      BACKGROUND_SECTION.style.opacity = '0';


      setTimeout(() => {
        BACKGROUND_AVATAR.style.opacity = '1';
        BACKGROUND_SECTION.style.opacity = '1';
      }, 1000);

      BACKGROUND_AVATAR.style.backgroundImage = `url(${imageSrc})`;

      switch (BACKGROUND_DETAILS[2]) {
        case 'blur':
          BACKGROUND_AVATAR.style.filter = 'none';
          BACKGROUND_SECTION.style.filter = 'blur(5px)';
          break;
        case 'none':
          BACKGROUND_AVATAR.style.opacity = 'unset';
          BACKGROUND_AVATAR.style.filter = 'none';
          BACKGROUND_SECTION.style.backgroundImage = 'none';
          BACKGROUND_SECTION.style.filter = 'none';
          break;
        case 'dark':
          BACKGROUND_SECTION.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imageSrc})`;
          break;
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
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

    const imageSrc = tempDiv.querySelector('li.large img').getAttribute('src');
    return imageSrc;
  } catch (error) {
    throw new Error(`Error fetching image source: ${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', InsertBeforeLoad);

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
}


