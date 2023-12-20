// ==UserScript==
// @name        KoGaMa Custom Notes
// @namespace    github.com/2facvd
// @version      1.3.6
// @description  UserNotes
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    function createCustomButton(username) {
        const button = document.createElement('button');
        button.innerText = '+';
        button.className = 'custom-note-button';
        button.style.position = 'absolute';
        button.style.top = '15px';
        button.style.right = '8px';
        button.style.borderRadius = '9px';
        button.style.boxShadow = '0 0 3px #fff';
        button.style.backgroundColor = '#121212';

        button.addEventListener('click', () => openNoteWindow(username));

        return button;
    }

    function openNoteWindow(username) {
        const note = prompt('Enter your note:');
        if (note !== null) {
            saveNote(username, note);
            displayNotes();
        }
    }

    function saveNote(username, note) {
        GM_setValue(username, note);
    }

    function displayNotes() {
        const allUsernames = document.querySelectorAll('._3zDi-');
        allUsernames.forEach(usernameElement => {
            const username = usernameElement.textContent.trim();
            const note = GM_getValue(username);
            if (note) {
                const noteElement = document.createElement('div');
                const shortenedNote = note.length > 20 ? note.substring(0, 20) + '...' : note;
                noteElement.innerText = `Note: ${shortenedNote}`;
                noteElement.className = 'custom-note-text';
                noteElement.style.color = '#b8b8b8';
                noteElement.style.fontWeight = '300';
                noteElement.style.fontSize = '14px';

                noteElement.addEventListener('mouseover', () => {
                    noteElement.title = note;
                });

                usernameElement.parentNode.appendChild(noteElement);
            }
        });
    }

    function addButtonAndNotesToElements() {
        const targetElements = document.querySelectorAll('._3TORb ._1lvYU');

        targetElements.forEach(element => {
            const usernameElement = element.querySelector('._3zDi-');
            if (usernameElement) {
                const customButton = createCustomButton(usernameElement.textContent.trim());
                element.style.position = 'relative';
                element.appendChild(customButton);
            }
        });

        displayNotes();
    }

    window.addEventListener('load', addButtonAndNotesToElements);
})();