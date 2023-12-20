(function() {
    'use strict';

    function getUserID() {
        const urlRegex = /\/profile\/(\d+)\//;
        const match = window.location.href.match(urlRegex);
        return match ? match[1] : null;
    }

    function toggleMenu() {
        const menu = document.getElementById('customMenu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

// Create the menu button
const menuButton = document.createElement('img');
menuButton.src = 'https://i.imgur.com/4YnnXIh.png';
menuButton.style.width = '40px'; // Larger width for better visibility
menuButton.style.height = '40px'; // Larger height for better visibility
menuButton.style.marginRight = '10px';
menuButton.style.cursor = 'pointer';
menuButton.style.verticalAlign = 'middle';
menuButton.style.opacity = '1'; // Make the button always visible

// Add CSS transition to make the button animate smoothly on hover and mouseout
menuButton.style.transition = 'transform 0.3s, opacity 0.3s';
menuButton.style.transformOrigin = 'center';

menuButton.addEventListener('mouseover', () => {
  menuButton.style.transform = 'scale(1.2)'; // Apply scaling effect on hover
});

menuButton.addEventListener('mouseout', () => {
  menuButton.style.transform = 'scale(1)'; // Remove scaling effect when not hovered
});

    // Create the menu container
    const menuContainer = document.createElement('div');
    menuContainer.id = 'customMenu';
    menuContainer.style.position = 'absolute';
    menuContainer.style.top = '40px';
    menuContainer.style.left = '0';
    menuContainer.style.backgroundColor = 'rgb(40 42 47 / 26%)';
    menuContainer.style.backdropFilter = 'blur(6px)';
    menuContainer.style.padding = '5px';
    menuContainer.style.zIndex = '9999';
    menuContainer.style.border = '1px solid #7d55ab';

    menuContainer.style.borderRadius = '14px';
    menuContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    menuContainer.style.display = 'none';

    // Append the menu container to the document body
    document.body.appendChild(menuContainer);

    // Add the event listener to show/hide the menu on click
    menuContainer.addEventListener('click', () => {
        menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Add the CSS for the glowing effect on hover
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        #customMenu:hover {
            animation: glowing 1s ease infinite;
        }

        @keyframes glowing {
            0%, 100% {
                box-shadow: 0 0 10px #7d55ab;
            }
            50% {
                box-shadow: 0 0 20px #7d55ab;
            }
        }

        /* Sparkling animation on the button */
        #menuButton:hover {
            animation: sparkling 1s ease-in-out infinite;
        }

        @keyframes sparkling {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
                filter: brightness(1.3);
            }
            100% {
                transform: scale(1);
            }
        }
    `;

    // Append the style to the head of the document
    document.head.appendChild(styleElement);

    // Get the UserID from the current URL
    const userID = getUserID();

    // Create menu items with dynamic links
    const menuItems = [
        { text: 'Avatars', href: `https://www.kogama.com/profile/${userID}/avatars` },
        { text: 'Games', href: `https://www.kogama.com/profile/${userID}/games/` },
        { text: 'Models', href: `https://www.kogama.com/profile/${userID}/marketplace/model` },
        { text: 'Avatar Shop', href: `https://www.kogama.com/profile/${userID}/marketplace/` },
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.className = 'menuItem';
        menuItem.href = item.href;
        menuItem.textContent = item.text;
        menuItem.style.display = 'block';
        menuItem.style.padding = '5px';
        menuItem.style.textDecoration = 'none';
        menuItem.style.color = '#b7aec2';
        menuItem.style.zIndex = '9999999';
        menuItem.addEventListener('click', () => {
            toggleMenu();
        });
        menuContainer.appendChild(menuItem);
    });

    // Add the button and menu to the header
    const header = document.querySelector('#mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container .header');
    if (header) {
        header.appendChild(menuButton);
        header.appendChild(menuContainer);
    }

    // Hide the menu on page load
    menuContainer.style.display = 'none';

    // Show/hide the menu on button click
    menuButton.addEventListener('click', () => {
        toggleMenu();
    });
    // Resize the imgur button to 24x24 pixels
    menuButton.style.width = '26px';
    menuButton.style.height = '26px';
})();