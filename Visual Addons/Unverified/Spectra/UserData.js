(function() {
    'use strict';

    const userID = window.location.pathname.split('/profile/')[1].split('/')[0];

    GM_addStyle(`
        .expand-button {
            background-color: #55555559;
            color: #636363;
            background-image: none;
            border-radius: 13px;
            transition: color 0.6s, box-shadow 0.6s;
            position: relative;
            top: 50%;
            left: 170%;
            transform: translateY(310%);
            text-align: left; /* Align the text to the left */
            padding: 10px 20px;
            cursor: pointer;
            border: none;
        }
        .expand-button:hover {
            color: #db4b4b; /* Text color on hover */
            background-image: none;
            box-shadow: 0 0 7px #b33030; /* Box shadow on hover */
        }
        .expandable-container {
            display: inline-block;
            position: relative;
            vertical-align: top;
        }
        .expandable-element {
            display: none;
            margin-top: 145px;


        }
        .expandable-element.expanded {
            display: block;
            animation: expandAnimation 0.5s ease;
            left: 255px;
            position: relative;
        }
        .expandable-button {
            display: block;
            background-color: #55555559;
            color: #db4b4b;
            border-radius: 13px;
            padding: 5px 10px;
            margin-top: 11px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            box-shadow: 0 0 7px #b33030;
        }
        @keyframes expandAnimation {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `);


    const expandableContainer = document.createElement('div');
    expandableContainer.className = 'expandable-container';


    const expandButton = document.createElement('button');
    expandButton.className = 'expand-button';
    expandButton.innerText = 'User Creations';
    expandButton.addEventListener('click', () => {
        expandableElement.classList.toggle('expanded');
    });


    const expandableElement = document.createElement('div');
    expandableElement.className = 'expandable-element';


    const buttons = [
        { text: 'Friends', href: `https://www.kogama.com/profile/${userID}/friends` },
        { text: 'Avatars', href: `https://www.kogama.com/profile/${userID}/avatars` },
        { text: 'Games', href: `https://www.kogama.com/profile/${userID}/games/` },
        { text: 'Models', href: `https://www.kogama.com/profile/${userID}/marketplace/model` },
        { text: 'Avatar Shop', href: `https://www.kogama.com/profile/${userID}/marketplace/` },
    ];

    buttons.forEach(buttonInfo => {
        const button = document.createElement('a');
        button.className = 'expandable-button';
        button.innerText = buttonInfo.text;
        button.href = buttonInfo.href;
        button.target = '_blank';
        expandableElement.appendChild(button);
    });


    const section = document.querySelector('#mobile-page #profile-page .section-top');
    expandableContainer.appendChild(expandButton);
    expandableContainer.appendChild(expandableElement);
    section.appendChild(expandableContainer);
})();