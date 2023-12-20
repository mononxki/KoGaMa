        // Function to check if the zoom level is set to 90%
    function checkZoomLevel() {
        var currentZoom = window.devicePixelRatio * 100;

        if (currentZoom !== 90) {
            var userPrompted = GM_getValue('zoomPrompted', false);

            if (!userPrompted) {
                var confirmZoom = confirm('To optimize your viewing experience, please zoom to 90%. Do you want to zoom now?');

                if (confirmZoom) {
                    // Set zoom level to 90% (adjust this based on your needs)
                    document.body.style.zoom = '90%';
                }

                GM_setValue('zoomPrompted', true);
            }
        }
    }