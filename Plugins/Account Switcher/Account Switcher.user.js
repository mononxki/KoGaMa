// ==UserScript==
// @name         Account Switcher
// @namespace    github.com/sleeptght
// @version      1.3.4
// @description  Adds an account switcher menu to Kogama.
// @author       Sleet Tight (Simon)
// @match        https://www.kogama.com/*
// @grant        GM_addStyle
// @icon         https://i.pinimg.com/564x/59/70/ad/5970ad992c12633b8eeabf115b38ae99.jpg
// ==/UserScript==

(function() {
    'use strict';

    const accounts = [
     //   { username: "acc1", password: "pass1" },
      //  { username: "acc2", password: "pass2" },
        // Add more accounts if needed.
    ];

    // Log out
    function logout() {
        fetch("https://www.kogama.com/auth/logout/", {
            method: "GET",
        })
            .then((response) => {
                if (response.status === 200) {
                    loginWithSelectedAccount();
                } else {
                    console.error("Logout failed.");
                }
            })
            .catch((error) => {
                console.error("Logout failed with error:", error);
            });
    }

    // Log In with selected data
    function loginWithSelectedAccount() {
        const selectedAccount = accounts.find(account => account.username === selectedUsername);
        if (selectedAccount) {
            fetch("https://www.kogama.com/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedAccount),
            })
                .then((response) => {
                    if (response.status === 200) {
                        // Redirect to the profile page after successful login
                        window.location.href = "https://www.kogama.com/profile/me";
                    } else {
                        console.error("Login failed with username:", selectedAccount.username);
                    }
                })
                .catch((error) => {
                    console.error("Login failed with error:", error);
                });
        } else {
            console.error("Selected account not found.");
        }
    }

    // Button - Gear
    const gearButton = document.createElement('div');
    gearButton.id = 'account-switcher-gear';
    gearButton.innerHTML = '&#9881;';
    document.body.appendChild(gearButton);

    // Menu
    const accountMenu = document.createElement('div');
    accountMenu.id = 'account-menu';

    // Gear Look
    GM_addStyle(`
        #account-switcher-gear {
            position: fixed;
            transition: all ease-in-out 0.5s;
            bottom: 10px;
            left: 10px;
            font-size: 20px;
            cursor: pointer;
            z-index: 9999;
            background-color: #121212;
            color: #fff;
            box-shadow: 0 0 2px #fff;
            padding: 5px 10px;
            border-radius: 50%;
        }
         #account-switcher-gear:hover {
         transition: all ease-in-out 0.5s;
         background-color: #2e2d2d;
         transform: scale(1.1);
         box-shadow: 0 0 6px #fff;

         }
    `);

    // Acc menu
    GM_addStyle(`
        #account-menu {
            position: fixed;
            bottom: 15px;
            left: 50px;
            background-color: #0d0d0d;
            border: 1px solid #914a4a;
            border-radius: 13px;
            max-height: 400px;
            overflow-y: auto;
            display: none;
        }
        .account-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .account-list-item {
            padding: 5px 10px;
            cursor: pointer;
            color: #c75a64;
            transition: all ease-in-out 0.4s;
        }
        .account-list-item:hover {
            transition: all ease-in-out 0.4s;
            background-color: #121212;
            color: #5b4a91;
        }
    `);

    let selectedUsername = null; // Store the selected username

    // Populate the account menu with account usernames
    const accountList = document.createElement('ul');
    accountList.className = 'account-list';
    accounts.forEach((account) => {
        const listItem = document.createElement('li');
        listItem.className = 'account-list-item';
        listItem.textContent = account.username;
        listItem.addEventListener('click', () => {
            // Log out, and then log in with the selected account when clicked
            selectedUsername = account.username;
            logout();
        });
        accountList.appendChild(listItem);
    });
    accountMenu.appendChild(accountList);

    gearButton.addEventListener('click', () => {
        accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.body.appendChild(accountMenu);
})();
