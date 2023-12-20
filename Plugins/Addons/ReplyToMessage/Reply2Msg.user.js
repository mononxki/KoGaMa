// ==UserScript==
// @name         KoGaMa: ReplyToMessages
// @namespace    github.com/xymine
// @version      0.3.7
// @description  I suck at coding
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon         https://i.pinimg.com/736x/a6/00/0e/a6000e10cc768ce5fd2ad208811b083b.jpg
// @grant        none
// ==/UserScript==
(function() {
  'use strict';

  
  function addReplyOptionsToNewMessages() {
    const messageClouds = document.querySelectorAll("div._375XK ._2XaOw ._1j2Cd:not(._1Xzzq)");

    messageClouds.forEach((messageCloud, index) => {
      if (!messageCloud.classList.contains("reply-options-added")) {
        const replyButton = document.createElement("img"); 
        replyButton.className = "reply-button";
        replyButton.style.cursor = "pointer";
        replyButton.src = "https://i.imgur.com/GwWM5z4.png"; 

        const replyContainer = document.createElement("div");
        replyContainer.className = "reply-container";
        replyContainer.style.display = "none"; 
        replyButton.addEventListener("click", function(event) {
          event.stopPropagation();

          replyContainer.style.display = "flex";
          const quotedText = `"${messageCloud.innerText.trim()}" <- `;
          replyContainer.dataset.jumpToReply = quotedText;

          // Hide the reply button of the clicked message
          replyButton.style.display = "none";

          // Add a timeout to reset the reply button after 2 seconds
          setTimeout(() => {
            replyButton.style.display = "inline-block";
          }, 2000);

          const replyTextarea = document.querySelector(".zUJzi ._2BvOT ._375XK textarea");
          if (replyTextarea) {
            replyTextarea.value += `${quotedText}`;
          }
        });

        const replyIndicator = document.createElement("span");
        replyIndicator.className = "reply-indicator";
        const replyToIndex = parseInt(messageCloud.dataset.replyToIndex);
        if (!isNaN(replyToIndex)) {
          const originalMessage = document.querySelectorAll("div._375XK ._2XaOw ._1j2Cd:not(._1Xzzq)")[replyToIndex];
          if (originalMessage) {
            const quotedText = `"${originalMessage.innerText.trim()}"`;
            replyIndicator.textContent = `Replying to: ${quotedText}`;
            messageCloud.appendChild(replyIndicator);

            originalMessage.addEventListener("mouseenter", function() {
              replyIndicator.style.display = "inline-block";
            });

            originalMessage.addEventListener("mouseleave", function() {
              replyIndicator.style.display = "none";
            });

            messageCloud.addEventListener("mouseleave", function() {
              replyIndicator.style.display = "none";
            });
          }
        }

        messageCloud.classList.add("reply-options-added");
        messageCloud.appendChild(replyButton);
        messageCloud.appendChild(replyContainer);
      }
    });
  }

  // Check for new messages periodically and attach reply buttons and jump to reply elements
  setInterval(addReplyOptionsToNewMessages, 2000);

  // Add the CSS styles
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .reply-button {
      display: inline-block;
      cursor: pointer;
      margin-right: 5px;
      position: relative;
      width: 16px; // Set the width to adjust the image size
      height: 16px; // Set the height to adjust the image size
      filter: brightness(0) invert(1); // Apply CSS filter to hue black to white
    }

    .reply-arrow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 14px solid #fff;
      animation: glow 1s ease-in-out infinite;
    }

    @keyframes glow {
      0% {
        opacity: 0.8;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.8;
      }
    }


  `;
  document.head.appendChild(styleTag);
})();
