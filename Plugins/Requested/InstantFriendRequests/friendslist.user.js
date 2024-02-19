// ==UserScript==
// @name         KoGaMa  Instant  Requests
// @namespace    github.com/suchsad
// @version      1.1
// @description  Helps you read your profile friendslist and requests way faster, kys react.js!
// @author       Simon
// @match        https://www.kogama.com/profile/*/friends/
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';


    function getProfileID() {
        const url = window.location.href;
        const regex = /https:\/\/www.kogama.com\/profile\/(\w+)\/friends\//;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    }


    function storeProfileID() {
        const profileID = getProfileID();

        if (profileID) {
            localStorage.setItem('kogamaProfileID', profileID);
            console.log('Profile ID stored in local storage:', profileID);
        } else {
            console.error('Unable to retrieve Profile ID from the URL.');
        }
    }


    async function fetchAndAppendFriends() {
        const profileID = localStorage.getItem('kogamaProfileID');
        if (!profileID) {
            console.error('Profile ID not found in local storage.');
            return;
        }

        const friendsURL = `https://www.kogama.com/user/${profileID}/friend/?count=555`;

        try {
            const response = await fetch(friendsURL);
            const data = await response.json();


            const friendsList = data.data.filter(friend => friend.friend_status === 'accepted');
            const friendsColumn = document.querySelector('#frlscrape div:first-child');

            friendsList.forEach(friend => {
                const friendLink = document.createElement('a');
                friendLink.href = `https://www.kogama.com/profile/${friend.friend_profile_id}/`;
                friendLink.textContent = friend.friend_username;

                const separator = document.createTextNode(', ');

                friendsColumn.appendChild(friendLink);
                friendsColumn.appendChild(separator);
            });
        } catch (error) {
            console.error('Error fetching Friendslist:', error);
        }
    }


    async function fetchAndAppendRequests() {
        const profileID = localStorage.getItem('kogamaProfileID');
        if (!profileID) {
            console.error('Profile ID not found in local storage.');
            return;
        }

        const requestsURL = `https://www.kogama.com/user/${profileID}/friend/requests/?page=1&count=1000`;

        try {
            const response = await fetch(requestsURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            console.log('Requests Data:', responseData); // Log the response data


            const sentRequests = [];
            const invitingRequests = [];

            responseData.data.forEach(request => {
                if (request.profile_id === parseInt(profileID)) {
                    // Sent Request
                    sentRequests.push({
                        id: request.id,
                        friend_status: request.friend_status,
                        friend_profile_id: request.friend_profile_id,
                        friend_username: request.friend_username,
                    });
                } else {
                    // Inviting Request
                    invitingRequests.push({
                        profile_id: request.profile_id,
                        profile_username: request.profile_username,
                    });
                }
            });


            sentRequests.sort((a, b) => a.friend_username.localeCompare(b.friend_username));


            console.log('Sorted Sent Requests:', sentRequests);
            console.log('Sorted Inviting Requests:', invitingRequests);


            appendRequestsToList('SENT', sentRequests);
            appendRequestsToList('INVITING', invitingRequests);
        } catch (error) {
            console.error('Error fetching Requests:', error);
        }
    }


    function appendRequestsToList(listType, requests) {
        const listContainer = document.querySelector(`#${listType.toLowerCase()}List`);

        if (!listContainer) {
            console.error(`List container not found for ${listType} requests.`);
            return;
        }

        requests.forEach(request => {
            const requestLink = document.createElement('a');
            if (listType === 'INVITING') {
                requestLink.href = `https://www.kogama.com/profile/${request.profile_id}/`;
                requestLink.textContent = request.profile_username;
            } else {
                requestLink.href = `https://www.kogama.com/profile/${request.friend_profile_id}/`;
                requestLink.textContent = request.friend_username;
            }

            const separator = document.createTextNode(', ');

            listContainer.appendChild(requestLink);
            listContainer.appendChild(separator);
        });
    }


    function appendCustomUI() {
        const profileID = localStorage.getItem('kogamaProfileID');
        if (!profileID) {
            console.error('Profile ID not found in local storage.');
            return;
        }

        // Create the main div
        const customDiv = document.createElement('div');
        customDiv.id = 'frlscrape';
        customDiv.style.position = 'fixed';
        customDiv.style.top = '50%';
        customDiv.style.left = '50%';
        customDiv.style.transform = 'translate(-50%, -50%)';
        customDiv.style.zIndex = '9999';
        customDiv.style.width = '940px';
        customDiv.style.height = '800px';
        customDiv.style.display = 'flex';
        customDiv.style.flexDirection = 'column';
        customDiv.style.background = 'rgba(0, 0, 0, 0.9)';
        customDiv.style.backdropFilter = 'blur(21px)';
        customDiv.style.borderRadius = '10px';
        customDiv.style.padding = '10px';
        customDiv.style.color = '#fff';
        customDiv.style.overflowY = 'auto';
        customDiv.style.userSelect = 'none';


        const column1 = document.createElement('div');
        column1.style.flex = '1';
        column1.style.marginBottom = '20px';

        const friendsHeader = document.createElement('h2');
        friendsHeader.textContent = 'Friendslist';
        column1.appendChild(friendsHeader);


        fetchAndAppendFriends();


        customDiv.appendChild(column1);


        const column2 = document.createElement('div');
        column2.style.flex = '1';


        const invitingHeader = document.createElement('h2');
        invitingHeader.textContent = 'INVITING';
        column2.appendChild(invitingHeader);


        const invitingList = document.createElement('div');
        invitingList.id = 'invitingList';
        invitingList.style.maxHeight = '350px';
        invitingList.style.overflowY = 'auto';
        invitingList.style.paddingRight = '10px';


        column2.appendChild(invitingList);


        customDiv.appendChild(column2);


        const column3 = document.createElement('div');
        column3.style.flex = '1';


        const sentHeader = document.createElement('h2');
        sentHeader.textContent = 'SENT';
        column3.appendChild(sentHeader);


        const sentList = document.createElement('div');
        sentList.id = 'sentList';
        sentList.style.maxHeight = '350px';
        sentList.style.overflowY = 'auto';
        sentList.style.paddingRight = '10px';

        column3.appendChild(sentList);


        customDiv.appendChild(column3);


        document.body.appendChild(customDiv);


        fetchAndAppendRequests();


        document.addEventListener('click', function (event) {
            if (!customDiv.contains(event.target)) {
                customDiv.remove();
            }
        });
    }


    storeProfileID();
    appendCustomUI();
})();
