(function() {
    'use strict';


    const profiles = [

        {
            id: '669312073',
            text: 'A silly badge for a cool person.',
            imageUrl: 'https://i.imgur.com/eDd16P8.png'
        },
         {
            id: '36355',
            text: 'Awxi has been a truly amazing help and supportive friend along the creation of the theme!',
            imageUrl: 'https://i.imgur.com/eDd16P8.png'
        },
          {
            id: '10590799',
            text: 'Truly a great contributor! Thank you for helping me spot all bugs!',
            imageUrl: 'https://i.imgur.com/RbYsuVC.png'
        },
          {
            id: '5585592',
            text: 'They are the reason this theme is public in the first place! Thank you for your contributions.',
            imageUrl: 'https://i.imgur.com/RbYsuVC.png'
        },
          {
            id: '668970425',
            text: 'A silly friend that helped me to spot bugs, thanks for giving me your time to test features!',
            imageUrl: 'https://i.imgur.com/RbYsuVC.png'
        },
            {
            id: '17037147',
            text: 'This cutie is the sole reason I started to work on myself and create useful things for people, Thank you M.',
            imageUrl: 'https://i.imgur.com/qbCBdN8.png'
        },
        {
            id: '20998101',
            text: 'Vee! Thank you for using my theme.',
            imageUrl: 'https://i.imgur.com/qbCBdN8.png'
        },
    ];


    GM_addStyle(`
        .custom-badge {
            position: relative; /* Change from absolute to relative */
            display: inline-block;
            width: 32px;
            height: 32px;
            left: 46%;
            top: 5%;
        }

        .custom-badge img {
            width: 100%;
            height: 100%;
            border-radius: 14px;
            cursor: pointer;
        }

        /* Added styling for the cloud-like element */
        .custom-badge .cloud-element {
            position: absolute;
            display: none;
            width: 200px;
            background-color: #0f0f0f;
            border: 1px solid #ccc;
            border-radius: 25px;
            padding: 8px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            transform: translateY(-100%);
            left: 50%;
            transform: translateX(-50%);

        }

        .custom-badge:hover .cloud-element {
            display: block;
        }
    `);

    // Function to create a badge element
    function createBadge(text, imageUrl) {
        const badge = document.createElement('div');
        badge.className = 'custom-badge';
        badge.innerHTML = `
            <img src="${imageUrl}" alt="Badge">
            <div class="cloud-element">${text}</div>
        `;
        return badge;
    }


    function addBadges() {
        const profilePage = document.querySelector('#mobile-page #profile-page .section-top');

        if (!profilePage) return;

        const profileId = window.location.href.match(/\/profile\/(\d+)/)[1]; // Extract profile ID from URL

        for (const profile of profiles) {
            if (profile.id === profileId) {
                const badge = createBadge(profile.text, profile.imageUrl);
                profilePage.appendChild(badge);
                break;
            }
        }
    }


    window.addEventListener('load', addBadges);

})();