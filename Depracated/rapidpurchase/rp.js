(function() {
    'use strict';

    // Function to purchase an item without confirmation
    function purchaseWithoutConfirmation(itemType, itemId) {
        const baseUrl = 'https://www.kogama.com/model/market/';
        const purchaseUrl = itemType === 'avatar' ? `a-${itemId}/purchase/` : `i-${itemId}/purchase/`;

        fetch(baseUrl + purchaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (response.ok) {
                // Purchase request successful, refresh the page
                window.location.reload();
            }
        }).catch(error => {
            console.error('Purchase error:', error);
        });
    }

    // Get the current URL
    const currentUrl = window.location.href;

    // Determine item type and ID from the URL
    const itemType = currentUrl.includes('/avatar/') ? 'avatar' : 'model';

    // Use the match result if not null
    const matchResult = currentUrl.match(/\/[ai]-([0-9]+)\//);
    const itemId = matchResult ? matchResult[1] : null;

    // Find the purchase button element
    var purchaseButton = document.querySelector('#mobile-page #product-detail #product-purchase-link .purchase-button');

    if (purchaseButton) {
        // Hide the confirmation modal
        const confirmationModal = document.querySelector('.modal-content.modal-small');
        if (confirmationModal) {
            confirmationModal.style.display = 'none';
        }

        // Attach a click event listener to the purchase button
        purchaseButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (itemId !== null) {
                purchaseWithoutConfirmation(itemType, itemId);
            } else {
                console.error('Item ID not found.');
            }
        });
    }
})();
