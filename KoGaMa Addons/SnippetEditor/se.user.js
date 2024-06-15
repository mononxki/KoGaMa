// ==UserScript==
// @name         Snippet Editor
// @namespace    https://www.aethar.net/
// @version      3.0
// @description  Adds a CSS and JavaScript injector to the website, including handling @import statements by fetching and applying the CSS content directly.
// @author       Simon
// @match        https://www.kogama.com/*
// @icon         https://i.imgur.com/hG5QwIl.gif
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const openEditorButton = document.createElement('img');
    openEditorButton.src = 'https://i.imgur.com/g7ionvQ.png';
    openEditorButton.style.position = 'absolute';
    openEditorButton.style.bottom = '10px';
    openEditorButton.style.right = '18%';
    openEditorButton.style.zIndex = '9999';
    openEditorButton.style.width = '32px';
    openEditorButton.style.height = '32px';
    document.querySelector('.pageheader-inner').appendChild(openEditorButton);

    const editorContainer = document.createElement('div');
    editorContainer.style.display = 'none';
    editorContainer.style.position = 'fixed';
    editorContainer.style.top = '50px';
    editorContainer.style.left = '50px';
    editorContainer.style.width = '400px';
    editorContainer.style.height = '400px';
    editorContainer.style.backgroundColor = '#333';
    editorContainer.style.color = '#fff';
    editorContainer.style.zIndex = '10000';
    editorContainer.style.border = '1px solid #444';
    editorContainer.style.borderRadius = '5px';
    editorContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    editorContainer.style.padding = '10px';
    editorContainer.style.fontFamily = 'monospace';
    editorContainer.style.resize = 'both';
    editorContainer.style.overflow = 'auto';
    document.body.appendChild(editorContainer);

    const titleBar = document.createElement('div');
    titleBar.style.display = 'flex';
    titleBar.style.alignItems = 'center';
    titleBar.style.justifyContent = 'space-between';
    titleBar.style.marginBottom = '10px';
    titleBar.style.cursor = 'move';
    editorContainer.appendChild(titleBar);

    const iconUrl = 'https://i.imgur.com/hG5QwIl.gif';
    const icon = document.createElement('img');
    icon.src = iconUrl;
    icon.style.width = '20px';
    icon.style.height = '20px';
    titleBar.appendChild(icon);

    const titleText = document.createElement('div');
    titleText.textContent = 'Snippet Editor';
    titleText.style.fontSize = '18px';
    titleText.style.fontWeight = 'bold';
    titleBar.appendChild(titleText);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.backgroundColor = '#444';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    titleBar.appendChild(closeButton);

    closeButton.addEventListener('click', function() {
        editorContainer.style.display = 'none';
    });

    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.marginBottom = '10px';
    editorContainer.appendChild(tabsContainer);

    const cssTab = document.createElement('button');
    cssTab.textContent = 'CSS';
    cssTab.style.flex = '1';
    cssTab.style.backgroundColor = '#444';
    cssTab.style.color = '#fff';
    cssTab.style.border = 'none';
    cssTab.style.cursor = 'pointer';
    cssTab.style.padding = '5px';
    tabsContainer.appendChild(cssTab);

    const jsTab = document.createElement('button');
    jsTab.textContent = 'JS';
    jsTab.style.flex = '1';
    jsTab.style.backgroundColor = '#555';
    jsTab.style.color = '#fff';
    jsTab.style.border = 'none';
    jsTab.style.cursor = 'pointer';
    jsTab.style.padding = '5px';
    tabsContainer.appendChild(jsTab);

    const textArea = document.createElement('textarea');
    textArea.style.width = '100%';
    textArea.style.height = '200px';
    textArea.style.backgroundColor = '#222';
    textArea.style.color = '#fff';
    textArea.style.border = 'none';
    textArea.style.resize = 'none';
    textArea.style.padding = '5px';
    editorContainer.appendChild(textArea);

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.style.backgroundColor = '#444';
    applyButton.style.color = '#fff';
    applyButton.style.border = 'none';
    applyButton.style.cursor = 'pointer';
    applyButton.style.marginRight = '5px';
    editorContainer.appendChild(applyButton);

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download to File';
    downloadButton.style.backgroundColor = '#444';
    downloadButton.style.color = '#fff';
    downloadButton.style.border = 'none';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.marginRight = '5px';
    editorContainer.appendChild(downloadButton);

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.backgroundColor = '#444';
    resetButton.style.color = '#fff';
    resetButton.style.border = 'none';
    resetButton.style.cursor = 'pointer';
    editorContainer.appendChild(resetButton);

    let currentMode = 'css'; // Current mode can be 'css' or 'js'

    function switchToCSS() {
        currentMode = 'css';
        cssTab.style.backgroundColor = '#444';
        jsTab.style.backgroundColor = '#555';
        const savedCSS = localStorage.getItem('kogamaCSS') || '';
        textArea.value = savedCSS;
    }

    function switchToJS() {
        currentMode = 'js';
        cssTab.style.backgroundColor = '#555';
        jsTab.style.backgroundColor = '#444';
        const savedJS = localStorage.getItem('kogamaJS') || '';
        textArea.value = savedJS;
    }

    async function applyStylesAndScripts() {
        if (currentMode === 'css') {
            const css = textArea.value;
            localStorage.setItem('kogamaCSS', css);
            await applyCSS(css);
        } else if (currentMode === 'js') {
            const js = textArea.value;
            localStorage.setItem('kogamaJS', js);
            applyJS(js);
        }
    }

    async function fetchCSS(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSS from ${url}`);
        }
        return response.text();
    }

    async function applyCSS(css) {
        let styleElement = document.getElementById('kogamaCustomStyles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'kogamaCustomStyles';
            document.head.appendChild(styleElement);
        }

        const imports = css.match(/@import\s+url\(['"]?([^'"]+)['"]?\);/g) || [];
        const importUrls = imports.map(i => i.match(/@import\s+url\(['"]?([^'"]+)['"]?\);/)[1]);
        const otherCss = css.replace(/@import\s+url\(['"]?([^'"]+)['"]?\);/g, '');

        let importedCss = '';
        for (const url of importUrls) {
            try {
                importedCss += await fetchCSS(url) + '\n';
            } catch (e) {
                console.error(e);
            }
        }

        styleElement.innerHTML = importedCss + '\n' + otherCss;
    }

    function applyJS(js) {
        let scriptElement = document.getElementById('kogamaCustomScripts');
        if (!scriptElement) {
            scriptElement = document.createElement('script');
            scriptElement.id = 'kogamaCustomScripts';
            document.body.appendChild(scriptElement);
        }
        scriptElement.innerHTML = js;
    }

    function downloadContent() {
        const content = textArea.value;
        const blob = new Blob([content], { type: currentMode === 'css' ? 'text/css' : 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentMode === 'css' ? 'styles.css' : 'script.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function resetContent() {
        if (currentMode === 'css') {
            localStorage.removeItem('kogamaCSS');
            textArea.value = '';
            applyCSS('');
        } else if (currentMode === 'js') {
            localStorage.removeItem('kogamaJS');
            textArea.value = '';
            applyJS('');
        }
        location.reload();
    }

    window.addEventListener('load', async function() {
        const savedCSS = localStorage.getItem('kogamaCSS');
        if (savedCSS) {
            textArea.value = savedCSS;
            await applyCSS(savedCSS);
        }
        const savedJS = localStorage.getItem('kogamaJS');
        if (savedJS) {
            textArea.value = savedJS;
            applyJS(savedJS);
        }
    });

    applyButton.addEventListener('click', applyStylesAndScripts);
    downloadButton.addEventListener('click', downloadContent);
    resetButton.addEventListener('click', resetContent);
    cssTab.addEventListener('click', switchToCSS);
    jsTab.addEventListener('click', switchToJS);

    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - editorContainer.offsetLeft;
        offsetY = e.clientY - editorContainer.offsetTop;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            editorContainer.style.left = `${e.clientX - offsetX}px`;
            editorContainer.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    openEditorButton.addEventListener('click', function() {
        editorContainer.style.display = 'block';
    });

    const savedCSS = localStorage.getItem('kogamaCSS');
    if (savedCSS) {
        textArea.value = savedCSS;
        applyCSS(savedCSS);
    }

})();
