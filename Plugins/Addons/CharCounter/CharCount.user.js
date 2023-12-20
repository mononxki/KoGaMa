// ==UserScript==
// @name         KoGaMa: SimpleCharCounter
// @namespace    github.com/xymine
// @version      0.5.1
// @description  I need something to do with my life.
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon         https://i.pinimg.com/736x/a6/00/0e/a6000e10cc768ce5fd2ad208811b083b.jpg
// @grant        none
// ==/UserScript==
function addCharacterCounter(textField) {
  const textareaElements = document.querySelectorAll(textField.selector);

  textareaElements.forEach(textareaElement => {
    const existingCounterElement = textareaElement.nextElementSibling;

    if (!existingCounterElement) {
      const counterElement = document.createElement('span');
      counterElement.textContent = textField.maxCharacters.toString();
      counterElement.style.display = 'block';
      counterElement.style.color = 'grey';
      counterElement.style.marginTop = '5px';
      textareaElement.parentNode.insertBefore(counterElement, textareaElement.nextSibling);

      textareaElement.addEventListener('input', () => updateCharacterCounter(textField, textareaElement, counterElement));
    }
  });
}

function updateCharacterCounter(textField, textareaElement, counterElement) {
  const remainingCharacters = textField.maxCharacters - textareaElement.value.length;
  counterElement.textContent = remainingCharacters.toString();

  if (remainingCharacters < 0) {
    counterElement.style.color = 'red';
  } else {
    counterElement.style.color = 'grey';
  }
}

function addCharacterCounters() {
  const textFields = [
    {
      selector: '#profile-status-update form.status-message textarea',
      maxCharacters: 160,
    },
    {
      selector: '.zUJzi ._2BvOT ._375XK textarea',
      maxCharacters: 256,
    },
    {
      selector: '#root-page-mobile #profile-news-feed .feed-comments .comments form textarea',
      maxCharacters: 1024,
    },
    {
      selector: 'textarea#comment',
      maxCharacters: 1024,
    },
  ];

  textFields.forEach(textField => {
    addCharacterCounter(textField);
  });
}

// Call the function initially to add character counters to existing text-fields.
addCharacterCounters();

// Periodically scan the site and add character counters to newly added text-fields.
const observer = new MutationObserver(addCharacterCounters);
observer.observe(document.body, { childList: true, subtree: true });