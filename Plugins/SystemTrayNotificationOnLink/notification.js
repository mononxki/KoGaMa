        function awxi() {
        var desiredLink = 'https://www.kogama.com/profile/36355/';

        if (window.location.href === desiredLink) {
            GM_notification({
                text: 'This profile belongs to a friend of mine that contributed to this theme with much ideas and tips, hugely appreciated <3',
                timeout: 5000, // Notification display time in milliseconds (adjust as needed)
                onclick: function() {
                    // Handle click event if desired

                }

            });
        }
    }
