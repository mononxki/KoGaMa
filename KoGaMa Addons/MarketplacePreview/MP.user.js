// ==UserScript==
// @name         Marketplace Preview V2
// @namespace    discord/@simonvhs
// @version      1.2
// @description  Easily preview marketplace image.
// @author      ⛧ sim
// @match        https://www.kogama.com/marketplace/*
// @match        https://www.kogama.com/profile/*/marketplace/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    function appendCustomButton() {
        const customButtonImageUrl = 'https://i.imgur.com/vQtwuy7.png';
        const targetElements = document.querySelectorAll('._2neko ._2eW3Y');
        targetElements.forEach(function(targetElement) {
            if (!targetElement.querySelector('.custom-button')) {
                const overlayDiv = document.createElement('div');
                overlayDiv.classList.add('overlay-div');
                overlayDiv.style.position = 'absolute';
                overlayDiv.style.top = '0';
                overlayDiv.style.left = '0';
                overlayDiv.style.width = '100%';
                overlayDiv.style.height = '100%';
                overlayDiv.style.zIndex = '9999';
                overlayDiv.style.pointerEvents = 'none';

                const customButton = document.createElement('button');
                customButton.classList.add('custom-button');
                customButton.style.position = 'absolute';
                customButton.style.top = '2px';
                customButton.style.right = '-5px';
                customButton.style.zIndex = '10000';
                customButton.style.background = 'transparent';
                customButton.style.pointerEvents = 'auto';
                customButton.innerHTML = '<img src="' + customButtonImageUrl + '" alt="Custom Button" width="32" height="32">';
                customButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const imgSrc = targetElement.querySelector('img').src;
                    displayPreview(imgSrc);
                });

                overlayDiv.appendChild(customButton);
                targetElement.appendChild(overlayDiv);
            }
        });
    }

    function displayPreview(imgSrc) {
        const darkLayer = document.createElement('div');
        darkLayer.classList.add('dark-layer');
        darkLayer.style.position = 'fixed';
        darkLayer.style.top = '0';
        darkLayer.style.left = '0';
        darkLayer.style.width = '100%';
        darkLayer.style.height = '100%';
        darkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        darkLayer.style.zIndex = '9998';

        document.body.appendChild(darkLayer);

        const previewContainer = document.createElement('div');
        previewContainer.classList.add('preview-container');
        previewContainer.style.position = 'fixed';
        previewContainer.style.top = '50%';
        previewContainer.style.left = '50%';
        previewContainer.style.transform = 'translate(-50%, -50%)';
        previewContainer.style.maxWidth = '90%';
        previewContainer.style.maxHeight = '90%';
        previewContainer.style.backgroundColor = 'transparent';
        previewContainer.style.zIndex = '9999';
        previewContainer.style.borderRadius = '5px';

        const previewImage = document.createElement('img');
        previewImage.src = imgSrc;
        previewImage.style.width = '100%';
        previewImage.style.height = 'auto';
        previewImage.style.borderRadius = '5px';

        previewContainer.appendChild(previewImage);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.position = 'absolute';
        buttonsContainer.style.bottom = '10px';
        buttonsContainer.style.left = '50%';
        buttonsContainer.style.transform = 'translateX(-50%)';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.alignItems = 'center';

        const copyLinkButton = document.createElement('button');
        copyLinkButton.textContent = 'Copy Link';
        copyLinkButton.style.marginBottom = '10px';
        copyLinkButton.addEventListener('click', function() {
            navigator.clipboard.writeText(imgSrc).then(function() {
                alert('Direct link copied to clipboard!');
            }, function() {
                alert('Failed to copy direct link.');
            });
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', function() {
            previewContainer.remove();
            darkLayer.remove();
        });

        buttonsContainer.appendChild(copyLinkButton);
        buttonsContainer.appendChild(closeButton);

        previewContainer.appendChild(buttonsContainer);

        document.body.appendChild(previewContainer);
    }

    appendCustomButton();

    setInterval(appendCustomButton, 1100);
})();
