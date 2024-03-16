function createProfileBox(profileLink, imageUrl, textContent) {
    var currentLink = window.location.href;
    if (currentLink !== profileLink) {
        return null; // Return null if the current profile link does not match the desired profile link
    }

    var creditsBox = document.createElement('div');
    creditsBox.className = 'creditsbox';
    creditsBox.style.position = 'fixed';
    creditsBox.style.bottom = '20px';
    creditsBox.style.left = '20px';
    creditsBox.style.boxShadow = '0 0 3px #ff059b';
    creditsBox.style.backgroundColor = '#231f1f';
    creditsBox.style.border = '1px solid #fff';
    creditsBox.style.color = 'white';
    creditsBox.style.padding = '10px';
    creditsBox.style.borderRadius = '25px';
    creditsBox.style.fontSize = '14px';
    creditsBox.style.width = '500px';

    var contentWrapper = document.createElement('div');
    contentWrapper.className = 'content-wrapper';
    contentWrapper.style.display = 'flex'; // Add flex display
    contentWrapper.style.alignItems = 'center'; // Center align items

    var image = document.createElement('img');
    image.src = imageUrl;
    image.style.width = '100px'; // Adjust the width as needed
    image.style.height = 'auto'; // Maintain aspect ratio

    var text = document.createElement('span');
    text.innerHTML = textContent;
    text.style.wordBreak = 'break-word';

    contentWrapper.appendChild(image);
    contentWrapper.appendChild(text);
    creditsBox.appendChild(contentWrapper);

    return creditsBox;
}

// Example usage for multiple profile boxes
var profileBox1 = createProfileBox('https://www.kogama.com/profile/20998101/', 'https://i.imgur.com/elxtUeY.png', 'This profile belongs to the creator of the theme you are currently using, thanks and feel free to check my other creations!');
var profileBox2 = createProfileBox('https://www.kogama.com/profile/36355/', 'https://i.imgur.com/elxtUeY.png', 'Awxi was a huge creatove and help during the creation of this project, huge thanks! ❤');
var profileBox3 = createProfileBox('https://www.kogama.com/profile/10590799/', 'https://i.imgur.com/elxtUeY.png', 'Xumor has been a great help with spotting, fixing, and testing the theme, thanks!');
var profileBox4 = createProfileBox('https://www.kogama.com/profile/5585592/', 'https://i.imgur.com/elxtUeY.png', 'Thank you for the support during every stage of the development, you are the reason this work is public. ❤');
var profileBox5 = createProfileBox('https://www.kogama.com/profile/668970425/', 'https://i.imgur.com/elxtUeY.png', 'Helped testing the theme.');

if (profileBox1) {
    document.body.appendChild(profileBox1);
}

if (profileBox2) {
    document.body.appendChild(profileBox2);
}


if (profileBox3) {
    document.body.appendChild(profileBox3);
}



if (profileBox4) {
    document.body.appendChild(profileBox4);
}



if (profileBox5) {
    document.body.appendChild(profileBox5);
}
