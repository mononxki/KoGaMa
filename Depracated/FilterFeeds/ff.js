(function () {
    'use strict';

    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.bottom = '10px';
    menu.style.left = '10px';
    menu.style.zIndex = '9999';
    menu.style.backgroundColor = '#121212';
    menu.style.borderRadius = '8px';
    menu.style.boxShadow = '0 0 3px #fff';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column'; 
    menu.style.padding = '10px';
    document.body.appendChild(menu);

    const options = ["Videos", "Games", "Marketplace"];

    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option + ": ";
        optionDiv.style.marginBottom = '5px'; 

        const toggleButton = createToggleButton(option.toLowerCase());
        optionDiv.appendChild(toggleButton);
        menu.appendChild(optionDiv);
    });

    function createToggleButton(option) {
        const button = document.createElement('button');
        button.textContent = 'True';
        button.style.color = 'green';
        button.style.border = 'none';
        button.style.background = 'none';
        button.style.cursor = 'pointer';
        button.style.width = '50px'; 

        button.addEventListener('click', function () {
            this.textContent = this.textContent === 'True' ? 'False' : 'True';
            this.style.color = this.textContent === 'True' ? 'green' : 'red';

            filterContent(option, this.textContent === 'True');
        });

        return button;
    }

    function filterContent(option, show) {
        if (option === 'marketplace') {
            filterMarketplaceContent(show);
        }

    }

    function filterMarketplaceContent(show) {
        const posts = document.querySelectorAll('.MuiPaper-root.MuiCard-root.mSF8a'); 

        posts.forEach(post => {
            const postText = post.textContent.toLowerCase();

            if (postText.includes("got a new")) {
                if (!show) {

                    post.style.display = 'none';
                } else {

                    post.style.display = 'block';
                }
            }
        });
    }

    function runContentFilterInLoop() {
        setInterval(() => {
            const marketplaceButton = getMenuButton('Marketplace');

            if (marketplaceButton) {
                const isMarketplaceEnabled = marketplaceButton.textContent === 'True';

                filterContent('marketplace', isMarketplaceEnabled);
            }
        }, 240);
    }

    runContentFilterInLoop();

    function getMenuButton(option) {
        const menuButtons = document.querySelectorAll('.toggle-button');
        for (const button of menuButtons) {
            if (button.textContent.includes(option)) {
                return button;
            }
        }
        return null;
    }

    const observer = new MutationObserver(() => {

        runContentFilterInLoop();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
