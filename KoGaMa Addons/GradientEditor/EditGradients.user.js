// ==UserScript==
// @name         KoGaMa Gradient Editor
// @namespace    discord/@simonvhs
// @version      1.3
// @description  Easily edit linear background theme for the website.
// @author       ⛧ sim
// @match        https://www.kogama.com/*
// @grant        GM_addStyle
// ==/UserScript==
// SCRIPT REQUESTED BY AGLORYKON.


GM_addStyle(`
  ._3TORb { background: rgba(0, 0, 0, 0.4); }
`);
 
(function () {
  'use strict';
 
  const gradientButton = document.createElement('button');
  gradientButton.innerHTML = '🌈 Gradient Editor';
  gradientButton.style.position = 'fixed';
  gradientButton.style.bottom = '0';
  gradientButton.style.left = '0';
  gradientButton.style.zIndex = '9999';
  gradientButton.style.background = 'rgba(0, 0, 0, 0.4)';
  gradientButton.style.textShadow = '0 0 3px #fff';
  gradientButton.style.boxShadow = '0 0 6px #000';
  gradientButton.style.backdropFilter = 'blur(5px)';
  gradientButton.style.borderRadius = '0 13px 0 0';
  document.body.appendChild(gradientButton);
 
  function openGradientEditor() {
    const editorContainer = document.createElement('div');
    editorContainer.style.position = 'fixed';
    editorContainer.style.bottom = '10px';
    editorContainer.style.left = '10px';
    editorContainer.style.zIndex = '10000';
 
    editorContainer.style.background = 'rgba(0, 0, 0, 0.4)';
    editorContainer.style.backdropFilter = 'blur(5px)';
    editorContainer.style.borderRadius = '13px';
    editorContainer.style.padding = '10px';
    editorContainer.style.boxShadow = '0 0 4px black';
 
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'Close';
    closeBtn.style.marginTop = '10px';
    closeBtn.style.borderRadius = '32px';
    closeBtn.style.textShadow = '0 0 3px #fff';
    closeBtn.style.backgroundColor = 'transparent';
    closeBtn.style.boxShadow = '0 0 6px #fff';
    closeBtn.style.backdropFilter = 'blur(5px)';
    closeBtn.addEventListener('click', closeGradientEditor);
 
    editorContainer.appendChild(closeBtn);
 
    const startColorInput = createColorPicker('#ff0000', 'Start Color', updateGradient);
    const endColorInput = createColorPicker('#00ff00', 'End Color', updateGradient);
    const degreeInput = createNumberInput('45', 'Angle', updateGradient);
    const lengthInput = createRangeInput('100', 'Length', updateGradient);
 
    editorContainer.appendChild(startColorInput);
    editorContainer.appendChild(endColorInput);
    editorContainer.appendChild(degreeInput);
    editorContainer.appendChild(lengthInput);
 
    document.body.appendChild(editorContainer);
 
 
    const savedGradient = getSavedGradientSettings();
    if (savedGradient) {
      const [startColor, endColor, degree, length] = parseGradient(savedGradient);
      startColorInput.querySelector('input').value = startColor;
      endColorInput.querySelector('input').value = endColor;
      degreeInput.querySelector('input').value = degree;
      lengthInput.querySelector('input').value = length;
      updateGradient();
    }
 
    function closeGradientEditor() {
      document.body.removeChild(editorContainer);
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
 
    function createInputContainer(label) {
      const container = document.createElement('div');
      container.style.marginBottom = '10px';
      container.innerHTML = `<strong>${label}:</strong>`;
      return container;
    }
 
    function updateGradient() {
      const startColor = startColorInput.querySelector('input').value;
      const endColor = endColorInput.querySelector('input').value;
      const degree = degreeInput.querySelector('input').value;
      const length = lengthInput.querySelector('input').value;
 
      const gradient = `linear-gradient(${degree}deg, ${startColor}, ${endColor} ${length}%)`;
 
      applyGradientToElement(gradient);
      saveGradientSettings(gradient);
    }
  }
 
  gradientButton.addEventListener('click', openGradientEditor);
 
 
  const savedGradient = getSavedGradientSettings();
  if (savedGradient) {
    applyGradientToElement(savedGradient);
  }
 
  function applyGradientToElement(gradient) {
    const rootPageMobile = document.querySelector('body#root-page-mobile.winter');
    rootPageMobile.style.backgroundImage = gradient;
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
})();
