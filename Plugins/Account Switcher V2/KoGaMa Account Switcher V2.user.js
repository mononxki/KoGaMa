// ==UserScript==
// @name        KoGaMa Account Switcher V2
// @namespace    github.com/d1sease
// @version      2.3.1
// @description  User-friendly account switcher for KoGaMa.com
// @author       Dessocial (Simon)
// @match        https://www.kogama.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    const menuButton = document.createElement('button');
    menuButton.innerHTML = 'Account Switcher';
    menuButton.style.position = 'fixed';
    menuButton.style.bottom = '10px';
    menuButton.style.left = '10px';
    menuButton.style.borderRadius = '10px';
    menuButton.style.border = '1px solid #786282';
    menuButton.style.backgroundColor = '#121212';
    menuButton.style.zIndex = '9999';

 
    const menuContent = document.createElement('div');
    menuContent.style.position = 'fixed';
    menuContent.style.top = '50%';
    menuContent.style.left = '50%';
    menuContent.style.transform = 'translate(-50%, -50%)';
    menuContent.style.background = '#121212'; // Dark mode
    menuContent.style.padding = '20px';
    menuContent.style.border = '1px solid #786282';
    menuContent.style.borderRadius = '13px';
    menuContent.style.display = 'none';
    menuContent.style.zIndex = '10000';
    menuContent.classList.add('custom-menu'); // Added a class for customization
    const form = document.createElement('form');


    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Username';
    usernameInput.classList.add('custom-input'); // Added a class for customization
    usernameInput.style.backgroundColor = '#2b2b2b';
    usernameInput.style.color = '#fff';
    usernameInput.style.borderRadius = '3px';
    usernameInput.style.padding = '5px';
    usernameInput.style.border = '1px #fff';


    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.classList.add('custom-input'); // Added a class for customization
    passwordInput.style.backgroundColor = '#2b2b2b';
    passwordInput.style.color = '#fff';
    passwordInput.style.borderRadius = '3px';
    passwordInput.style.border = '1px #fff';
    passwordInput.style.padding = '5px';
    passwordInput.style.marginLeft = '5px';


    const addButton = document.createElement('button');
    addButton.innerHTML = 'Add Account';
    addButton.style.borderRadius = '13px';
    addButton.style.backgroundColor = ' #66967d';
    addButton.style.marginTop = '10px';
    addButton.classList.add('custom-button'); // Added a class for customization


    const switchTitle = document.createElement('h1');
    switchTitle.innerHTML = 'Switch';
    switchTitle.style.color = 'white'; // Title color
    switchTitle.style.textAlign = 'center';
    switchTitle.style.marginTop = '20px';


    const accountList = document.createElement('ul');
    accountList.style.listStyleType = 'none';
    accountList.classList.add('custom-list'); // Added a class for customization


    function createGearIcon() {
        const gearIcon = document.createElement('span');
        gearIcon.innerHTML = '⚙️'; // Gear icon (⚙️)
        gearIcon.style.marginLeft = '10px';
        gearIcon.style.cursor = 'pointer';
        return gearIcon;
    }

   
    function createAccountActionMenu(username, listItem) {
        const actionMenu = document.createElement('div');
        actionMenu.style.position = 'absolute';
        actionMenu.style.top = '-60px';
        actionMenu.style.right = '10px';
        actionMenu.style.background = '#121212';
        actionMenu.style.borderRadius = '10px';
        actionMenu.style.border = '1px solid #786282';
        actionMenu.style.padding = '10px';
        actionMenu.style.display = 'none';
        actionMenu.style.zIndex = '10001';
        actionMenu.classList.add('custom-menu'); // Added a class for customization

        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.style.backgroundColor = '#996732';
        editButton.style.borderRadius = '8px';
        editButton.classList.add('custom-button'); // Added a class for customization

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.style.backgroundColor = '#942222';
        deleteButton.style.marginLeft = '5px';
        deleteButton.style.borderRadius = '8px';
        deleteButton.classList.add('custom-button', 'delete-button'); // Added classes for customization

        editButton.addEventListener('click', () => {

            openEditSubMenu(username);
        });

   
        deleteButton.addEventListener('click', () => {

            const accounts = JSON.parse(localStorage.getItem('kogamaAccounts')) || [];
            const updatedAccounts = accounts.filter(account => account.username !== username);
            localStorage.setItem('kogamaAccounts', JSON.stringify(updatedAccounts));
            listItem.remove(); // Remove the account from the list
        });

        actionMenu.appendChild(editButton);
        actionMenu.appendChild(deleteButton);

        return actionMenu;
    }


    function openEditSubMenu(username) {
        const editSubMenu = document.createElement('div');
        editSubMenu.style.position = 'absolute';
        editSubMenu.style.top = '50%';
        editSubMenu.style.left = '50%';
        editSubMenu.style.transform = 'translate(-50%, -50%)';
        editSubMenu.style.background = '#121212'; // Dark mode
        editSubMenu.style.padding = '20px';
        editSubMenu.style.border = '1px solid #ccc';
        editSubMenu.style.zIndex = '10002';
        editSubMenu.classList.add('custom-menu'); // Added a class for customization

        const editTitle = document.createElement('h1');
        editTitle.innerHTML = 'Edit Account';
        editTitle.style.color = 'white'; // Title color
        editTitle.style.textAlign = 'center';
        editTitle.style.marginBottom = '20px';

        const editUsernameInput = document.createElement('input');
        editUsernameInput.type = 'text';
        editUsernameInput.style.backgroundColor = '#2b2b2b';
        editUsernameInput.style.color = '#fff';
        editUsernameInput.style.borderRadius = '3px';
        editUsernameInput.style.border = '1px #fff';
        editUsernameInput.placeholder = 'Username';
        editUsernameInput.classList.add('custom-input'); // Added a class for customization

        const editPasswordInput = document.createElement('input');
        editPasswordInput.type = 'password';
        editPasswordInput.placeholder = 'Password';
        editPasswordInput.style.backgroundColor = '#2b2b2b';
        editPasswordInput.style.color = '#fff';
        editPasswordInput.style.marginLeft = '5px';
        editPasswordInput.style.borderRadius = '3px';
        editPasswordInput.style.border = '1px #fff';
        editPasswordInput.classList.add('custom-input'); // Added a class for customization

        const saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        saveButton.style.borderRadius = '10px';
        saveButton.style.border = '1px solid #9dc9a9';
        saveButton.style.backgroundColor = '#467352';
        saveButton.style.marginLeft = '5px';
        saveButton.classList.add('custom-button'); // Added a class for customization


        const accounts = JSON.parse(localStorage.getItem('kogamaAccounts')) || [];
        const account = accounts.find(acc => acc.username === username);

        if (account) {
            editUsernameInput.value = account.username;
            editPasswordInput.value = account.password;
        }


        saveButton.addEventListener('click', () => {
            const newUsername = editUsernameInput.value;
            const newPassword = editPasswordInput.value;

            if (newUsername) {
                // Update the account information
                account.username = newUsername;
                account.password = newPassword;

             
                localStorage.setItem('kogamaAccounts', JSON.stringify(accounts));


                editSubMenu.remove();


                displayAccountList();
            }
        });

        editSubMenu.appendChild(editTitle);
        editSubMenu.appendChild(editUsernameInput);
        editSubMenu.appendChild(editPasswordInput);
        editSubMenu.appendChild(saveButton);
        document.body.appendChild(editSubMenu);
    }


    function openAccountActionMenu(username, listItem) {
        const accounts = JSON.parse(localStorage.getItem('kogamaAccounts')) || [];
        const account = accounts.find(acc => acc.username === username);

        if (account) {
            const actionMenu = createAccountActionMenu(username, listItem);
            listItem.appendChild(actionMenu);
            actionMenu.style.display = 'block';
        }
    }


    function createAccountAction(username) {
        const accountItem = document.createElement('li');
        accountItem.style.display = 'flex';
        accountItem.style.alignItems = 'center';

        const usernameText = document.createElement('span');
        usernameText.textContent = username;
        usernameText.style.color = 'magenta'; // Change the text color to magenta
        usernameText.style.cursor = 'pointer';
        usernameText.style.transition = 'color 0.7s'; // Add a smooth color transition


        usernameText.addEventListener('mouseover', () => {
            usernameText.style.color = 'violet'; // Change the text color to violet on hover
        });


        usernameText.addEventListener('mouseout', () => {
            usernameText.style.color = 'magenta'; // Change the text color back to magenta
        });

        const gearIcon = createGearIcon();

         gearIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from propagating to the li element
            openAccountActionMenu(username, accountItem);
        });

         usernameText.addEventListener('click', async () => {
            // Log out from the current account
            try {
                await fetch('https://www.kogama.com/auth/logout/', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            } catch (error) {
                console.error('Logout failed with error:', error);
                return;
            }

             const accounts = JSON.parse(localStorage.getItem('kogamaAccounts')) || [];


            const selectedAccount = accounts.find(account => account.username === username);
            if (selectedAccount) {
                const loginData = {
                    username: selectedAccount.username,
                    password: selectedAccount.password,
                };

                try {
                    const loginResponse = await fetch('https://www.kogama.com/auth/login/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginData),
                    });

                    if (loginResponse.status === 200) {
                        // Login was successful; navigate to the profile page
                        window.location.href = 'https://www.kogama.com/profile/me';
                    } else {
                        console.error('Login failed with username:', selectedAccount.username);
                    }
                } catch (error) {
                    console.error('Login failed with error:', error);
                }
            } else {
                console.error('Selected account not found.');
            }
        });


        accountItem.appendChild(usernameText);
        accountItem.appendChild(gearIcon);

        return accountItem;
    }


    function displayAccountList() {
        accountList.innerHTML = '';

        const accounts = JSON.parse(localStorage.getItem('kogamaAccounts')) || [];

        accounts.forEach(account => {
            const listItem = createAccountAction(account.username);
            accountList.appendChild(listItem);
        });
    }


    addButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username) {
            // Get the existing account data from localStorage
            let accounts = JSON.parse(localStorage.getItem('kogamaAccounts')) || [];

            // Check if the account already exists
            const existingAccount = accounts.find(account => account.username === username);

            if (!existingAccount) {
                // Add the new account to the list
                accounts.push({ username, password });

                // Save the updated account list to localStorage
                localStorage.setItem('kogamaAccounts', JSON.stringify(accounts));

                // Clear the input fields
                usernameInput.value = '';
                passwordInput.value = '';

                // Refresh the account list display
                displayAccountList();
            } else {
                alert('This account already exists.');
            }
        } else {
            alert('Please enter a username.');
        }
    });


    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    menuContent.appendChild(form);
    menuContent.appendChild(addButton);
    menuContent.appendChild(switchTitle);
    menuContent.appendChild(accountList);

    
    menuButton.addEventListener('click', () => {
        if (menuContent.style.display === 'none') {
            menuContent.style.display = 'block';
            displayAccountList();
        } else {
            menuContent.style.display = 'none';
        }
    });

    // 
    document.body.appendChild(menuButton);
    document.body.appendChild(menuContent);
})();
