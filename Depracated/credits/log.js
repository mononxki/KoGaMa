
    // Create star button
    var starButton = document.createElement("button");
    starButton.className = "star-button";
    starButton.innerHTML = "&#9734;";

    // Style the star button
    starButton.style.position = "fixed";
    starButton.style.bottom = "10px";
    starButton.style.right = "50px";
    starButton.style.width = "40px";
    starButton.style.height = "40px";
    starButton.style.backgroundColor = "rgba(165, 116, 209, 0.22)";
    starButton.style.border = "none";
    starButton.style.borderRadius = "50%";
    starButton.style.boxShadow = "0 0 5px #c87ef2";
    starButton.style.color = "#8babd9";
    starButton.style.fontSize = "20px";
    starButton.style.fontWeight = "bold";
    starButton.style.cursor = "pointer";
    starButton.style.zIndex = "9999";
    starButton.style.display = "flex";
    starButton.style.alignItems = "center";
    starButton.style.justifyContent = "center";

    // Add click event listener to the star button
    starButton.addEventListener("click", function() {
        // Create the dark overlay element
        var overlayElement = document.createElement("div");
        overlayElement.className = "overlay";
        overlayElement.style.position = "fixed";
        overlayElement.style.top = "0";
        overlayElement.style.left = "0";
        overlayElement.style.width = "100%";
        overlayElement.style.height = "100%";
        overlayElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlayElement.style.backdropFilter = "blur(3px)";
        overlayElement.style.zIndex = "9998";

        // Create the new element (div box)
        var newElement = document.createElement("div");
        newElement.className = "new-element";
        newElement.style.position = "fixed";
        newElement.style.top = "50%";
        newElement.style.left = "50%";
        newElement.style.transform = "translate(-50%, -50%)";
        newElement.style.width = "700px";
        newElement.style.height = "470px";
        newElement.style.backgroundColor = "rgb(138 109 255 / 29%)";
        newElement.style.border = "1px solid #711d82";
        newElement.style.boxShadow = "0 0 10px #8970db";
        newElement.style.zIndex = "9999";
        newElement.style.backdropFilter = "blur(5px)";
        newElement.style.borderRadius = "25px";

        // Create the text container

        var textContainer = document.createElement("div");

        textContainer.className = "text-container";
        textContainer.innerHTML = `
        <b>UPDATES</b><br><br>
        · Fixed Clock Positioning ( Credits to aoxu ) <br>
        · Added version check & update prompting.<br>
        · Fixed a bunch of things you are not interested in (code-sided) <br>
        <br><br>
        <b>FAQ</b><br><br>
        Profile Creations have been hidden, Use ↓ to access these sections.<br>
        /marketplace/model<br>
        /marketplace/<br>
        /avatars/<br>
        /games/<br><br>
        <b>CREDITS</b><br><br>
        ❤ Huge thanks to anybody that has been supporting me and giving me ideas contributing to the theme.<br>
        Mostly, I want to thank Awxi, Aoxu, Raptor, and Xumor for helping me check whether all of this even works, haha.<br><br>
        <b>The development of this theme will be paused for the time being!</b>
`;

textContainer.style.padding = "20px";
textContainer.style.fontFamily = "Comfortaa, cursive";

        // Create the title container
        var titleContainer = document.createElement("div");
        titleContainer.className = "title-container";
        titleContainer.innerHTML = "✨ StarLog - 1.7 Update";
        titleContainer.style.padding = "10px";
        titleContainer.style.fontFamily = "Comfortaa, cursive";
        titleContainer.style.fontWeight = "bold";

        // Create the X object to close the new element
        var closeButton = document.createElement("span");
        closeButton.innerHTML = "O";
        closeButton.style.position = "absolute";
        closeButton.style.top = "5px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "20px";
        closeButton.style.fontWeight = "bold";
        closeButton.style.color = "rgb(224 124 235)";
        closeButton.style.zIndex = "9999";

        // Add click event listener to the close button
        closeButton.addEventListener("click", function() {
            // Remove the new element and overlay when the close button is clicked
            overlayElement.parentNode.removeChild(overlayElement);
            newElement.parentNode.removeChild(newElement);
        });

        // Append the title container and close button to the new element
        newElement.appendChild(titleContainer);
        newElement.appendChild(closeButton);

        // Append the text container and new element to the overlay element
        newElement.appendChild(textContainer);
        overlayElement.appendChild(newElement);

        // Append the overlay element to the document body
        document.body.appendChild(overlayElement);
    });

    // Append the star button to the document body
    document.body.appendChild(starButton);
