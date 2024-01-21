// ==UserScript==
// @name         KoGaMa Clean Titles
// @namespace    github.com/deeformed
// @version      1.7
// @description  Clean up document titles that are displayed for more compact usage.
// @author       Simon
// @match        https://www.kogama.com/profile/*
// @match        https://www.kogama.com/games/*
// @match        https://www.kogama.com/build/*
// @match        https://www.kogama.com/marketplace/model/*
// @match        https://www.kogama.com/marketplace/avatar/*
// @grant        none
// ==/UserScript==

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
