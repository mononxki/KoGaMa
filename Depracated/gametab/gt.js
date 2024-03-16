(function() {
    'use strict';

    function addTagButton(item) {
        const image = item.querySelector('.game-image');
        const addButton = document.createElement('div');
        addButton.className = 'tag-button';
        addButton.innerHTML = '+';
        addButton.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            showTagMenu(item);
        });
        image.appendChild(addButton);
    }

    function showTagMenu(item) {
        const tagMenu = document.createElement('div');
        tagMenu.className = 'tag-menu';
        tagMenu.innerHTML = `
            <p>Add tags:</p>
            <input type="text" id="tagInput">
            <button id="addTagsButton">Add</button>
            <div id="tagList"></div>
        `;
        document.body.appendChild(tagMenu);
        tagMenu.style.top = (window.innerHeight - tagMenu.clientHeight) / 2 + 'px';
        tagMenu.style.left = (window.innerWidth - tagMenu.clientWidth) / 2 + 'px';
        tagMenu.style.zIndex = 999;

        const tagList = document.getElementById('tagList');
        const createdTags = getCreatedTags();
        if (createdTags.length > 0) {
            tagList.innerHTML = '<p>Created tags:</p>';
            createdTags.forEach(tag => {
                const tagButton = document.createElement('button');
                tagButton.textContent = tag;
                tagButton.addEventListener('click', function() {
                    document.getElementById('tagInput').value = tag;
                });
                tagList.appendChild(tagButton);
            });
        }

        document.getElementById('addTagsButton').addEventListener('click', function() {
            addTags(item.querySelector('a').href);
        });
    }

    function sortGamesByTags() {
        const gameListContainer = document.getElementById('project-list');
        const games = Array.from(gameListContainer.querySelectorAll('.game-item'));

        gameListContainer.innerHTML = '';

        const taggedGames = [];
        const untaggedGames = [];
        games.forEach(game => {
            const gameTags = getCreatedTagsForProject(game.querySelector('a').href);
            if (gameTags.length > 0) {
                taggedGames.push(game);
            } else {
                untaggedGames.push(game);
            }
        });

        const taggedCategory = document.createElement('div');
        taggedCategory.className = 'tag-category';
        taggedCategory.innerHTML = `<h3>Tagged</h3>`;
        taggedGames.forEach(game => {
            taggedCategory.appendChild(game);
        });

        const untaggedCategory = document.createElement('div');
        untaggedCategory.className = 'tag-category';
        untaggedCategory.innerHTML = `<h3>Untagged</h3>`;
        untaggedGames.forEach(game => {
            untaggedCategory.appendChild(game);
        });

        gameListContainer.appendChild(taggedCategory);
        gameListContainer.appendChild(untaggedCategory);
    }

    function getCreatedTags() {
        const tags = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            if (key.trim().endsWith('_tags')) {
                const tagArray = JSON.parse(decodeURIComponent(value));
                acc.push(...tagArray);
            }
            return acc;
        }, []);
        return [...new Set(tags)]; 
    }

    function getCreatedTagsForProject(projectHref) {
        const projectTagsKey = projectHref + '_tags';
        const tagsCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(projectTagsKey + '='));
        if (tagsCookie) {
            return JSON.parse(decodeURIComponent(tagsCookie.split('=')[1]));
        }
        return [];
    }

    window.addTags = function(projectHref) {
        const tagInput = document.getElementById('tagInput');
        const tags = tagInput.value.split(',').map(tag => tag.trim());

        const projectTagsKey = projectHref + '_tags';
        const existingTags = getCreatedTags();
        document.cookie = projectTagsKey + '=' + encodeURIComponent(JSON.stringify([...existingTags, ...tags])) + '; path=/;';

        document.querySelector('.tag-menu').remove();

        sortGamesByTags();
    };

    document.querySelectorAll('.game-item').forEach(addTagButton);

    GM_addStyle(`
        .tag-button {
            position: absolute;
            bottom: 5px;
            right: 5px;
            background: #212020;
            color: #A96363;
            padding: 8px;
            width: 30px;
            text-align: center;
            border-radius: 7px;
            cursor: pointer;
            z-index: 1;
        }
        .tag-menu {
            position: fixed;
            background: #212020;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
        }
        #tagList {
            margin-top: 10px;
        }
        #tagList button {
            margin-right: 5px;
            margin-bottom: 5px;
            cursor: pointer;
        }
        .tag-category {
            margin-top: 20px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            display: flex;
            flex-wrap: wrap;
        }
        .tag-category h3 {
            color: #3498db;
            width: 100%;
            text-align: center;
        }
        .game-item {
            display: inline-block !important;
            margin: 5px;
            width: calc(25% - 10px); 
            box-sizing: border-box;
        }
        .game-item .game-image {
            background-size: cover;
            background-position: center;
            height: 194px; 
            position: relative;
        }
        .game-name-stats {
            display: block !important;
        }
        .game-stats, .context-menu {
            display: none !important;
        }
    `);
})();
