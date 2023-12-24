// ==UserScript==
// @name         No More KoGaMa
// @namespace    https://github.com/LowOnGravity/
// @version      2.0
// @description  Stop playing addictive games!
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon         https://i.imgur.com/7w8U9lo.png
// @grant        GM_addStyle
// ==/UserScript==

// Hide the real cursor
document.body.style.cursor = 'none';

// Create a new div element for the custom cursor
const cursor = document.createElement('div');
cursor.style.position = 'absolute';
cursor.style.width = '10px';
cursor.style.height = '10px';
cursor.style.borderRadius = '5px';
cursor.style.backgroundColor = '#a1f0df';
cursor.style.zIndex = '9999';
document.body.appendChild(cursor);

// Listen for mouse move events to update the position of the custom cursor
document.addEventListener('mousemove', e => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});

// Add a smooth trail effect to the custom cursor
const trail = [];
setInterval(() => {
  trail.push({ x: parseInt(cursor.style.left), y: parseInt(cursor.style.top) });
  if (trail.length > 10) {
    trail.shift();
  }
  cursor.style.background = `radial-gradient(circle, #7af587, transparent ${trail.length * 2}px)`;
}, 50);


// Create the mask element
const mask = document.createElement('div');
mask.id = 'kogama-mask';

// Create the content element with the message
const content = document.createElement('div');
content.id = 'kogama-content';
const title = document.createElement('h1');
title.textContent = 'Access Blocked';
const paragraph = document.createElement('p');
paragraph.textContent = 'We\'re sorry, access to KoGaMa has been blocked. ';
content.appendChild(title);
content.appendChild(paragraph);

// Create the rain effect function
function createRainEffect(container) {
  const drops = [];
  for (let i = 0; i < 50; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = Math.random() * 100 + "%";
    drop.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(drop);
    drops.push(drop);
  }
  setTimeout(() => {
    drops.forEach((drop) => {
      drop.style.opacity = "1";
    })
  }, 100);
}

// Add styles to the mask and new window
GM_addStyle(`
  #kogama-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 1);
  }

  #kogama-content {
    background-color: #1a1a1a;
    border: 1px solid #ba664c;
    border-radius: 25px;
    padding: 20px;
    text-align: center;
    position: relative;
  }

  #kogama-content h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  #kogama-content p {
    font-size: 1.5em;
  }

 #kogama-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
}

#kogama-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(31, 31, 31, 0.8);
  z-index: 9999;
}

#kogama-mask #kogama-window {
  position: relative;
  background-color: #0f0f0f;
  border: 1px solid #5486b8;
  border-radius: 25px;
  padding: 30px;
  width: 80%;
  max-width: 800px;
  text-align: center;
  z-index: 10000;
}

#kogama-mask h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #fff;
}

#kogama-mask p {
  font-size: 1.5em;
  color: #fff;
}

#kogama-mask .drop {
  position: absolute;
  top: -100px;
  left: 0;
  width: 2px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  animation: rain 1s linear infinite;
}

@keyframes rain {
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(100vh);
  }
}
`);
const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}

injectCss("Pararell",`


    #root-page-mobile #content.authenticated #content-container #main-content {
    	display: none;
    }

   body#root-page-mobile header#pageheader {
    	display: none;
    }

    footer #footer-header {
    	display: none;
    }

    footer #footer-about {
    	display: none;
    }
    footer #footer-company {
    	display: none;
    }

    footer #footer-links {
    	display: none;
    }

    body#root-page-mobile.error {

    }

    /* Site Background Image */
#content-container{
  background-image: url("https://i.imgur.com/37qk3s1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}

body#root-page-mobile.error {
	 background-image: url("https://i.imgur.com/37qk3s1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}
body#root-page-mobile {
	 background-image: url("https://i.imgur.com/37qk3s1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}

#root-page-mobile #content.authenticated #chat-extended-side {
	display: none;
}

body#root-page-mobile header#pagesubheader .submenu-container {
	display: none;
}
::-webkit-scrollbar {
    width: 2px !important;
}
        }
 }`)

// Append the content element to the mask
mask.appendChild(content);

// Append the mask to the body
document.body.appendChild(mask);

// Create the rain effect inside the mask
createRainEffect(mask);
