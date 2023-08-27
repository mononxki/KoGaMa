(function () {
  'use strict';

  function createChangePlaceholderWindow() {
    const windowBox = document.createElement('div');
    windowBox.style.position = 'fixed';
    windowBox.style.top = '50%';
    windowBox.style.left = '50%';
    windowBox.style.transform = 'translate(-50%, -50%)';
    windowBox.style.backgroundColor = '#7e7191';
    windowBox.style.padding = '20px';
    windowBox.style.borderRadius = '10px';
    windowBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    windowBox.style.zIndex = '9999';

    const usernameInput = document.createElement('div');
    usernameInput.style.position = 'relative';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter your new Username Preview';
    inputField.style.width = '100%';
    inputField.style.backgroundColor = '#565359';
    inputField.style.color = '#fff';
    inputField.style.textShadow = '0 0 3px #fff';
    inputField.style.borderRadius = '12px';
    inputField.style.marginBottom = '10px';
    inputField.style.paddingRight = '25px'; // Adjust to accommodate the icon

    // Create a question-mark icon for the tooltip
    const infoIcon = document.createElement('span');
    infoIcon.innerHTML = '❓';
    infoIcon.style.position = 'fixed';
    infoIcon.style.top = '50%';
    infoIcon.style.right = '5px';
    infoIcon.style.transform = 'translateY(-50%)';
    infoIcon.style.cursor = 'pointer';
    infoIcon.title = 'Hover over this icon for helpful information.';
    infoIcon.addEventListener('mouseover', () => {
      // Show a tooltip with helpful information when hovered
      alert('Enter a new username preview in the text field. This preview will be displayed when you hover over your username.');
    });

    usernameInput.appendChild(inputField);
    inputField.appendChild(infoIcon); // Append the icon to the input field

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginRight = '10px';
      closeButton.style.borderRadius = '15px';
            closeButton.style.backgroundColor = '#63081f';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(windowBox);
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.marginRight = '10px';
    resetButton.style.borderRadius = '15px';
      resetButton.style.backgroundColor = '#753545';
    resetButton.addEventListener('click', () => {
      localStorage.removeItem('customUsername');
              window.location.reload(); // Refresh the page
      const usernameLink = document.querySelector('h1 a.tool-tip');
      if (usernameLink) {
        const originalUsername = usernameLink.getAttribute('data-username');
        usernameLink.setAttribute('title', originalUsername);
        usernameLink.textContent = originalUsername;
      }
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
      saveButton.style.borderRadius = '15px';
      saveButton.style.backgroundColor = '#538a4d';
    saveButton.addEventListener('click', () => {
      const newPlaceholder = inputField.value;
      if (newPlaceholder) {
        const usernameLink = document.querySelector('h1 a.tool-tip');
        if (usernameLink) {
          usernameLink.setAttribute('title', newPlaceholder);

          // Save the custom username in local storage
          localStorage.setItem('customUsername', newPlaceholder);

          // Update the displayed username immediately
          usernameLink.textContent = newPlaceholder;
        }
      }
      document.body.removeChild(windowBox);
    });

    windowBox.appendChild(usernameInput);
    windowBox.appendChild(closeButton);
    windowBox.appendChild(resetButton);
    windowBox.appendChild(saveButton);

    document.body.appendChild(windowBox);
  }

  const butterflyButton = document.createElement('div');
  butterflyButton.innerHTML = '🦋';
  butterflyButton.style.position = 'absolute';
  butterflyButton.style.top = '60%'; // Center the button vertically
  butterflyButton.style.right = '250px';
  butterflyButton.style.fontSize = '14px';
  butterflyButton.style.borderRadius = '14px';
  butterflyButton.style.backgroundColor = '#8c76b8';
  butterflyButton.style.color = 'white';
  butterflyButton.style.padding = '8px 12px';
  butterflyButton.style.cursor = 'pointer';
  butterflyButton.style.zIndex = '999';

  // Add CSS box-shadow to create the glow effect
  butterflyButton.style.boxShadow = '0 0 10px #8c76b8';
  butterflyButton.style.transition = 'transform 0.3s, box-shadow 0.3s'; // Add smooth transition

  butterflyButton.addEventListener('click', () => {
    createChangePlaceholderWindow(); // Open the pop-up window
  });

  butterflyButton.addEventListener('mouseover', () => {
    butterflyButton.style.transform = 'scale(1.1)'; // Apply scaling effect on hover
    butterflyButton.style.boxShadow = '0 0 20px #8c76b8'; // Increase glow on hover
  });

  butterflyButton.addEventListener('mouseout', () => {
    butterflyButton.style.transform = 'scale(1)'; // Remove scaling effect when not hovered
    butterflyButton.style.boxShadow = '0 0 10px #8c76b8'; // Restore original glow
  });

  const sectionTop = document.querySelector('#mobile-page #profile-page .section-top');
  if (sectionTop) {
    sectionTop.appendChild(butterflyButton);
  }

  // Check if there is a custom username saved in local storage
  const savedUsername = localStorage.getItem('customUsername');
  if (savedUsername) {
    const usernameLink = document.querySelector('h1 a.tool-tip');
    if (usernameLink) {
      usernameLink.setAttribute('title', savedUsername);
      usernameLink.textContent = savedUsername;
    }
  }
})();