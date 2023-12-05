// ==UserScript==
// @name         PageNAmount
// @namespace    github.com/2facvd
// @version      1.4
// @description  Makes it easier to exist.
// @author       Simon
// @match        https://www.kogama.com/marketplace/avatar/*
// @match        https://www.kogama.com/marketplace/avatar-popular/*
// @match        https://www.kogama.com/marketplace/model-popular/*
// @match        https://www.kogama.com/marketplace/model/*
// @match        https://www.kogama.com/build/*
// @match        https://www.kogama.com/profile/*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const isMarketplaceAvatarPage = window.location.href.includes('https://www.kogama.com/marketplace/avatar/');
    const isMarketplacePopularAvatarPage = window.location.href.includes('https://www.kogama.com/marketplace/avatar-popular/');
    const isMarketplacePopularModelPage = window.location.href.includes('https://www.kogama.com/marketplace/model-popular/');
    const isMarketplaceModelPage = window.location.href.includes('https://www.kogama.com/marketplace/model/');
    const isBuildPage = window.location.href.includes('https://www.kogama.com/build/');
    const isProfilePage = window.location.href.includes('https://www.kogama.com/profile/');

    if (!(isMarketplaceAvatarPage || isMarketplacePopularAvatarPage || isMarketplacePopularModelPage || isMarketplaceModelPage || isBuildPage || isProfilePage)) {

        return;
    }

    const menuContainer = document.createElement('div');
    menuContainer.id = 'kogamaMenu';
    document.body.appendChild(menuContainer);

    GM_addStyle(`
        #kogamaMenu {
            position: fixed;
            bottom: 10px;
            left: -32px;
            background-color: black;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 0 3px #fff;
            z-index: 9999;
            opacity: 0.5;
            transition: all 0.3s ease-in-out;
            transform: scale(1);
        }

        #kogamaMenu:hover {
            opacity: 1;
            box-shadow: 0 0 7px #fff;
            transform: scale(1.1);
            left: 10px;
        }

        .sliderLabel {
            margin-bottom: 5px;
            color: #fff;
        }

        input[type="range"] {
            width: 100%;
            margin-bottom: 10px;
            background-color: #333;
            border: 1px solid #444;
            border-radius: 5px;
        }

        input[type="range"]:hover {
            background-color: #555;
        }

        .sliderValue {
            text-align: center;
            color: #fff;
        }
    `);

    const amountSliderRange = isMarketplaceAvatarPage || isMarketplacePopularModelPage || isBuildPage ? [10, 40] : (isProfilePage ? [0, 0] : [1, 120]);
    const amountSlider = createSlider('Amount', amountSliderRange[0], amountSliderRange[1], 'amount');

    let pageSliderRange;
    if (isMarketplaceAvatarPage || isMarketplacePopularAvatarPage || isBuildPage) {
        pageSliderRange = [1, 350];
    } else if (isMarketplacePopularModelPage || isMarketplaceModelPage || isProfilePage) {
        pageSliderRange = [1, isProfilePage ? 10 : 50];
    } else {
        pageSliderRange = [1, 50];
    }

    const pageSlider = createSlider('Page', pageSliderRange[0], pageSliderRange[1], 'page');

    amountSlider.slider.value = localStorage.getItem('amountSlider') || amountSliderRange[0];
    pageSlider.slider.value = localStorage.getItem('pageSlider') || pageSliderRange[0];

    menuContainer.appendChild(amountSlider.label);
    menuContainer.appendChild(amountSlider.slider);
    menuContainer.appendChild(pageSlider.label);
    menuContainer.appendChild(pageSlider.slider);

    const amountValueDisplay = createValueDisplay(amountSlider.slider);
    const pageValueDisplay = createValueDisplay(pageSlider.slider);
    menuContainer.appendChild(amountValueDisplay);
    menuContainer.appendChild(pageValueDisplay);

    amountSlider.slider.addEventListener('change', () => {
        localStorage.setItem('amountSlider', amountSlider.slider.value);
        amountValueDisplay.textContent = `Amount: ${amountSlider.slider.value}`;
        updatePageURL();
        refreshPage();
    });

    pageSlider.slider.addEventListener('change', () => {
        localStorage.setItem('pageSlider', pageSlider.slider.value);
        pageValueDisplay.textContent = `Page: ${pageSlider.slider.value}`;
        updatePageURL();
        refreshPage();
    });

    function createSlider(labelText, min, max, id) {
        const sliderContainer = document.createElement('div');

        const label = document.createElement('div');
        label.textContent = labelText;
        label.classList.add('sliderLabel');

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.id = id;

        sliderContainer.appendChild(label);
        sliderContainer.appendChild(slider);

        return { label, slider };
    }

    function createValueDisplay(slider) {
        const valueDisplay = document.createElement('div');
        valueDisplay.classList.add('sliderValue');
        valueDisplay.textContent = `${slider.id.charAt(0).toUpperCase() + slider.id.slice(1)}: ${slider.value}`;
        return valueDisplay;
    }

    function updatePageURL() {

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', pageSlider.slider.value);
        currentUrl.searchParams.set('count', amountSlider.slider.value);
        history.replaceState({}, document.title, currentUrl.toString());
    }

    function refreshPage() {

        window.location.reload();
    }
})();