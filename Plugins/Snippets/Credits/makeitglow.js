(function() {
    'use strict';

    // Define the profiles and their corresponding colors
    const profiles = [
        {
            url: 'https://www.kogama.com/profile/20998101/',
            glowColor: '#f27e8d',
            textColor: '#fff',
        },
        {
            url: 'https://www.kogama.com/profile/17037147/',
            glowColor: '#f27e8d',
            textColor: '#fff',
        },
          {
            url: 'https://www.kogama.com/profile/36355/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
          {
            url: 'https://www.kogama.com/profile/669312073/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
                  {
            url: 'https://www.kogama.com/profile/10590799/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
                  {
            url: 'https://www.kogama.com/profile/5585592/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
                  {
            url: 'https://www.kogama.com/profile/668970425/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },

    ];

    const currentUrl = window.location.href;
    const currentProfile = profiles.find(profile => currentUrl.includes(profile.url));

    if (currentProfile) {
        // Apply glow effect and custom text color for the specific profile
        const textElement = document.querySelector('.creations-feed section.creations-custom .section-description .description-container .text');
        if (textElement) {
            textElement.style.textShadow = `0 0 10px ${currentProfile.glowColor}, 0 0 10px ${currentProfile.glowColor}, 0 0 10px ${currentProfile.glowColor}`;
            textElement.style.animation = 'glow 1s ease-in-out infinite alternate';
            textElement.style.color = currentProfile.textColor;
        }
    } else {
        // Apply default text color when not on a specific profile
        const textElement = document.querySelector('.creations-feed section.creations-custom .section-description .description-container .text');
        if (textElement) {
            textElement.style.color = '#a57aef';
        }
    }
})();