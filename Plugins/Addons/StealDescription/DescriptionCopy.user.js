// ==UserScript==
// @name        CopyDescription
// @namespace    github.com/xymine
// @version      1.8
// @description  Helps to edit/steal descriptions x.x
// @author      zombieaztro
// @match        https://www.kogama.com/profile/*
// @icon        https://i.pinimg.com/564x/1b/e3/a6/1be3a6045b79857f195b9419e8423cc7.jpg
// @grant        none
// ==/UserScript==

    function addCopyButtonToBio() {
        const bioHeader = document.querySelector('.description-container h2.header');
        if (!bioHeader) return;

        const bioText = document.querySelector('.description-container .text');
        if (!bioText) return;

        const imgurImageUrl = 'https://i.imgur.com/KvzzqBF.png';

        const copyButton = createImgurButton(imgurImageUrl, function() {
            const textToCopy = bioText.innerText;
            copyToClipboard(textToCopy);
            showNotification('Bio copied successfully!');
        });

        bioHeader.appendChild(copyButton);

        bioHeader.addEventListener('mouseover', function() {
            copyButton.style.opacity = '1';
        });

        bioHeader.addEventListener('mouseout', function() {
            copyButton.style.opacity = '0';
        });
    }


    function createImgurButton(imgurImageUrl, clickAction) {
        const copyButton = document.createElement('img');
        copyButton.src = imgurImageUrl;
        copyButton.style.width = '24px';
        copyButton.style.height = '24px';
        copyButton.style.marginRight = '10px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.opacity = '0.4';
        copyButton.style.transition = 'opacity 0.6s';
        copyButton.style.verticalAlign = 'middle';
        copyButton.addEventListener('click', clickAction);

        return copyButton;
    }


    function copyToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '10px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '8px 16px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '9999';
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 2000);
    }

    addCopyButtonToBio();
