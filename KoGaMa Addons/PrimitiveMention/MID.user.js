// ==UserScript==
// @name         KGM Mention users by ID
// @namespace    discord/@simonvhs
// @version      1.5
// @description  Mention people with their UID
// @author      ⛧ sim
// @match        https://www.kogama.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // ID from mention
    function extractUserID(mention) {
        return mention.substring(1); // Remove the "@" symbol
    }

    // get user data
    function fetchUserProfile(userID, parentNode) {
        console.log(`Fetching profile for user ID: ${userID}`);
        const profileURL = `https://www.kogama.com/profile/${userID}/`;

        GM_xmlhttpRequest({
            method: "GET",
            url: profileURL,
            onload: function(response) {
                console.log(`Received response for user ID: ${userID}`);
                if (response.status === 200) {
                    // Look 4 JSON-like
                    const match = response.responseText.match(/{"user_id":\s*(\d+),\s*"username":\s*"([^"]+)"/);
                    if (match) {
                        // Get username and ID
                        const user_id = match[1];
                        const username = match[2];

                        // make it href
                        const link = document.createElement('a');
                        link.href = profileURL;
                        link.textContent = `@${username}`;

                        // TextNode make it href
                        const regex = new RegExp(`@${userID}`, 'g');
                        parentNode.nodeValue = parentNode.nodeValue.replace(regex, '');
                        parentNode.parentNode.insertBefore(link, parentNode.nextSibling);

                        // Log for debug
                        console.log(`Request sent to URL: ${profileURL}`);
                        console.log(`Fetched data: user_id: ${user_id}, username: ${username}`);
                    } else {
                        console.error(`JSON-like structure not found in response for user ID: ${userID}`);
                    }
                } else {
                    console.error(`Error fetching user profile for user ID: ${userID}. Status: ${response.status}`);
                    console.log("Response content:", response.responseText);
                }
            },
            onerror: function(error) {
                console.error(`Error fetching user profile for user ID: ${userID}`, error);
            }
        });
    }

    // Find and replace
    function findAndReplaceMentions(node) {
        const mentionRegex = /@(\d+)/;
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "A") {
            for (const attr of node.attributes) {
                const match = mentionRegex.exec(attr.nodeValue);
                if (match !== null) {
                    const userID = match[1];
                    fetchUserProfile(userID, node);
                }
            }
        }
        if (node.childNodes.length > 0) {
            for (const childNode of node.childNodes) {
                findAndReplaceMentions(childNode);
            }
        } else if (node.nodeType === Node.TEXT_NODE) {
            const match = mentionRegex.exec(node.nodeValue);
            if (match !== null) {
                const userID = match[1];
                fetchUserProfile(userID, node);
            }
        }
    }

    // Function to start scanning text content
    function startScanning() {
        console.log("Scanning text content...");
        findAndReplaceMentions(document.body);
        setTimeout(startScanning, 700); // 700ms
    }

    // Load before scan
    if (document.readyState === 'complete') {
        startScanning();
    } else {
        window.addEventListener('load', startScanning);
    }
})();
