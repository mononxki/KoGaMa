// ==UserScript==
// @name         KoGaMa Quick Friendslist
// @namespace    justfindme
// @version      1.3
// @description   Improves the speed and quality of visible friendslist.
// @author       Simon
// @match        https://www.kogama.com/profile/*/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function fetchFriendInfo(userId) {
        fetch(`https://www.kogama.com/user/${userId}/friend/?count=500`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const simplifiedData = {
                data: data.data.map(friend => ({
                    friend_profile_id: friend.friend_profile_id,
                    friend_username: friend.friend_username,
                    friend_image: friend.friend_images ? friend.friend_images.medium : null
                }))
            };


            const darkLayer = document.createElement('div');
            darkLayer.style.position = 'fixed';
            darkLayer.style.top = '0';
            darkLayer.style.left = '0';
            darkLayer.style.width = '100%';
            darkLayer.style.height = '100%';
            darkLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            darkLayer.style.backdropFilter = 'blur(0.5px)';
            darkLayer.style.zIndex = '9998';


            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '50%';
            overlay.style.left = '50%';
            overlay.style.transform = 'translate(-50%, -50%)';
            overlay.style.padding = '20px';
            overlay.style.backgroundColor = '#111111';
            overlay.style.border = '2px solid #333';
            overlay.style.borderRadius = '10px';
            overlay.style.maxHeight = '70vh';
            overlay.style.overflowY = 'auto';
            overlay.style.zIndex = '9999';


            simplifiedData.data.forEach(friend => {
                const friendInfo = document.createElement('div');
                friendInfo.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <img src="${friend.friend_image}" alt="Friend Image" style="max-width: 40px; max-height: 40px; border-radius: 50%; margin-right: 10px;">
                        <div>
                            <p><strong>Friend ID:</strong> ${friend.friend_profile_id}</p>
                            <p><strong>Friend Username:</strong> <a href="https://www.kogama.com/profile/${friend.friend_profile_id}" target="_blank" class="friend-username">${friend.friend_username}</a></p>
                        </div>
                    </div>
                    <hr>
                `;
                overlay.appendChild(friendInfo);
            });


            document.body.appendChild(darkLayer);
            document.body.appendChild(overlay);


            darkLayer.addEventListener('click', () => {
                document.body.removeChild(darkLayer);
                document.body.removeChild(overlay);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function createButton() {
        const button = document.createElement('button');
        button.innerHTML = 'Fetch Friend Info';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px';
        button.style.backgroundColor = '#3498db';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';

        button.addEventListener('click', () => {
            const url = window.location.href;
            const match = url.match(/\/profile\/(\d+)\//);
            if (match) {
                const userId = match[1];
                fetchFriendInfo(userId);
            } else {
                console.error('User ID not found in the URL.');
            }
        });

        document.body.appendChild(button);
    }


    GM_addStyle(`
        body { margin-bottom: 60px; } /* Adjust margin to accommodate the button */
        .friend-username { text-decoration: underline; color: #A14966; } /* Add underline and style class to friend username */
        .friend-username:hover { color: #A15749; }
    `);


    createButton();

})();
