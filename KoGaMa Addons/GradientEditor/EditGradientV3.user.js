// ==UserScript==
// @name         KoGaMa Gradient Editor
// @namespace    discord/@simonvhs
// @version      2.3
// @description  Easily edit linear background theme for the website.
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// @grant        GM_addStyle
// ==/UserScript==


GM_addStyle(`
    #mobile-page #error-404-page, #mobile-page #error-500-page, #mobile-page #error-disconnected-page { display: none; }
    ._3TORb { background: rgba(0, 0, 0, 0.4); }
    .MuiPaper-root { background-color: rgba(0, 0, 13, 0.15) !important;
        backdrop-filter: blur(10px); border-radius: 25px !important; }
    .jycgY ._1S6v0 ._3Wsxf .wXhWi ._23o8J { margin-left: 3px; }
    #mobile-page #profile-page .section-top .section-top-background { background-image: none !important; }
    .background-avatar { background-image: none !important; }
    ::-webkit-scrollbar { width: 1px; }
`);

// Apply gradient CSS everywhere
applyGradientToElement(getSavedGradientSettings());

if (window.location.href.endsWith("/gradient")) {
    (function () {
        'use strict';

        document.title = "Gradient Editor Settings"; // Set your custom title here

        const savedGradient = getSavedGradientSettings();
        let currentGradient = savedGradient;

        const editorContainer = document.createElement('div');
        editorContainer.id = 'gradient-editor';
        editorContainer.style.position = 'fixed';
        editorContainer.style.top = '50%';
        editorContainer.style.left = '50%';
        editorContainer.style.transform = 'translate(-50%, -50%)';
        editorContainer.style.zIndex = '10000';
        editorContainer.style.background = 'rgba(0, 0, 0, 0.4)';
        editorContainer.style.backdropFilter = 'blur(5px)';
        editorContainer.style.borderRadius = '13px';
        editorContainer.style.padding = '20px';
        editorContainer.style.boxShadow = '0 0 4px black';
        document.body.appendChild(editorContainer);

        const fixButton = createButton('Fix', fixGradientSettings);
        const copyButton = createButton('Copy Current Gradient', scrapeGradient);

        const startColorInput = createColorPicker('#ff0000', 'Start Color', updateGradient);
        const endColorInput = createColorPicker('#00ff00', 'End Color', updateGradient);
        const degreeInput = createNumberInput('45', 'Angle', updateGradient);
        const lengthInput = createRangeInput('100', 'Length', updateGradient);
        const customGradientInput = createTextInput('Your custom gradient...', updateCustomGradient);

        editorContainer.appendChild(fixButton);
        editorContainer.appendChild(copyButton);
        editorContainer.appendChild(startColorInput);
        editorContainer.appendChild(endColorInput);
        editorContainer.appendChild(degreeInput);
        editorContainer.appendChild(lengthInput);
        editorContainer.appendChild(customGradientInput);

        // Set initial values for color selectors, angle, and length inputs
        if (savedGradient) {
            const [startColor, endColor, degree, length] = parseGradient(savedGradient);
            startColorInput.querySelector('input').value = startColor;
            endColorInput.querySelector('input').value = endColor;
            degreeInput.querySelector('input').value = degree;
            lengthInput.querySelector('input').value = length;
        }

        function fixGradientSettings() {
            localStorage.removeItem('kogamaGradient');
            window.location.reload();
        }

        function createButton(text, onClick) {
            const button = document.createElement('button');
            button.textContent = text;
            button.addEventListener('click', onClick);
            button.style.marginTop = '10px';
            button.style.marginRight = '10px';
            button.style.padding = '5px 10px';
            button.style.borderRadius = '20px';
            button.style.bottom = '8px';
            button.style.position = 'relative';
            button.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            button.style.color = '#fff';
            button.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
            return button;
        }

        function createColorPicker(value, label, onChange) {
            const container = createInputContainer(label);
            const input = document.createElement('input');
            input.type = 'color';
            input.value = value;
            input.addEventListener('input', onChange);
            container.appendChild(input);
            return container;
        }

        function createNumberInput(value, label, onChange) {
            const container = createInputContainer(label);
            const input = document.createElement('input');
            input.type = 'number';
            input.value = value;
            input.addEventListener('input', onChange);
            container.appendChild(input);
            return container;
        }

        function createRangeInput(value, label, onChange) {
            const container = createInputContainer(label);
            const input = document.createElement('input');
            input.type = 'range';
            input.min = '0';
            input.max = '100';
            input.value = value;
            input.addEventListener('input', onChange);
            container.appendChild(input);
            return container;
        }

        function createTextInput(placeholder, onChange) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = placeholder;
            input.addEventListener('input', onChange);
            input.style.marginTop = '10px';
            input.style.padding = '5px';
            input.style.borderRadius = '10px';
            input.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            input.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            input.style.color = '#fff';
            return input;
        }

        function updateGradient() {
            const startColor = startColorInput.querySelector('input').value;
            const endColor = endColorInput.querySelector('input').value;
            const degree = degreeInput.querySelector('input').value;
            const length = lengthInput.querySelector('input').value;

            const gradient = `linear-gradient(${degree}deg, ${startColor}, ${endColor} ${length}%)`;

            applyGradientToElement(gradient);
            currentGradient = gradient;
            saveGradientSettings(gradient);
        }

        function updateCustomGradient() {
            const customGradientValue = customGradientInput.value.trim();
            if (validateGradient(customGradientValue)) {
                applyGradientToElement(customGradientValue);
                currentGradient = customGradientValue;
                saveGradientSettings(customGradientValue);
            }
        }

        function scrapeGradient() {
            navigator.clipboard.writeText(currentGradient)
                .then(() => alert('Gradient copied to clipboard!'))
                .catch(err => console.error('Failed to copy gradient: ', err));
        }

        function createInputContainer(label) {
            const container = document.createElement('div');
            container.style.marginBottom = '20px';
            container.innerHTML = `<strong>${label}:</strong>`;
            return container;
        }
    })();
}

function applyGradientToElement(gradient) {
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    seasons.forEach(season => {
        const rootPageMobile = document.querySelector(`body#root-page-mobile.${season}`);
        if (rootPageMobile) {
            rootPageMobile.style.backgroundImage = gradient;
        }
    });
}

function saveGradientSettings(gradient) {
    localStorage.setItem('kogamaGradient', gradient);
}

function getSavedGradientSettings() {
    return localStorage.getItem('kogamaGradient');
}

function parseGradient(gradient) {
    const regex = /linear-gradient\((\d+)deg,\s*([^,]+),\s*([^)]+)\s+(\d+)%\)/;
    const matches = gradient.match(regex);

    if (matches) {
        const [, degree, startColor, endColor, length] = matches;
        return [startColor, endColor, degree, length];
    }

    return [];
}

function validateGradient(gradient) {
    const regex = /^linear-gradient\(\d+deg,\s*(#(?:[0-9a-fA-F]{3}){1,2}|rgb\(\d+\s*,\s*\d+\s*,\s*\d+\))\s*,\s*(#(?:[0-9a-fA-F]{3}){1,2}|rgb\(\d+\s*,\s*\d+\s*,\s*\d+\))\s+\d+%\)$/;
    return regex.test(gradient);
}
