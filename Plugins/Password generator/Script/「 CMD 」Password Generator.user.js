// ==UserScript==
// @name         「 CMD 」Password Generator
// @namespace    kogama-password-generator
// @version      2.4
// @description  Generates a random password for Kogama
// @author       Simon
// @match        https://www.kogama.com/*
// @icon        https://i.imgur.com/a56sjcg.png
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

 function generatePassword(length) {
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!+-_";
  var password = "";
  var hasSpecialChar = false;
  var hasUpperChar = false;
  var hasLowerChar = false;

  for (var i = 0; i < length; i++) {
    var char = charset.charAt(Math.floor(Math.random() * charset.length));
    password += char;

    if (!hasSpecialChar && "!+-_".includes(char)) {
      hasSpecialChar = true;
    }

    if (!hasUpperChar && /[A-Z]/.test(char)) {
      hasUpperChar = true;
    }

    if (!hasLowerChar && /[a-z]/.test(char)) {
      hasLowerChar = true;
    }
  }

  if (!hasSpecialChar || !hasUpperChar || !hasLowerChar) {
    // Generate a new password if any of the required characters is missing
    return generatePassword(length);
  }

  return password;
}
  function createConsole() {
    var consoleDiv = document.createElement("div");
    consoleDiv.classList.add("kogama-password-console");
    var consoleHeader = document.createElement("div");
    consoleHeader.classList.add("kogama-password-header");
    consoleHeader.innerHTML = `
      <div class="kogama-password-header-button kogama-password-header-button-red"></div>
      <div class="kogama-password-header-button kogama-password-header-button-yellow"></div>
      <div class="kogama-password-header-button kogama-password-header-button-green"></div>
      <div class="kogama-password-header-title">Command Prompt</div>
    `;
    consoleDiv.appendChild(consoleHeader);

    var consoleInput = document.createElement("input");
    consoleInput.type = "text";
    consoleInput.classList.add("kogama-password-input");
    consoleInput.placeholder = "Type 'help' for a list of commands.";
    consoleDiv.appendChild(consoleInput);

    var consoleOutput = document.createElement("div");
    consoleOutput.classList.add("kogama-password-output");
    consoleDiv.appendChild(consoleOutput);

    consoleInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        var command = consoleInput.value.trim();
        if (command === "") {
          return;
        }
        var output = "";
        switch (command) {
          case "help":
            output = `
              <div class="kogama-password-output-line">Available commands:</div>
              <div class="kogama-password-output-line"> - help: Show this list of commands</div>
              <div class="kogama-password-output-line"> - generate [length]: Generate a password with the specified length (default: 8)</div>
              <div class="kogama-password-output-line"> - creator: Redirects to the developer's  profile</div>
                    <div class="kogama-password-output-line"> - close: Close the password generator popup</div>
              <div class="kogama-password-output-line"> - clear: Clear the output text area</div>
            `;
                           break;
          case "creator":
            output = `<div class="kogama-password-output-line"><a href="https://github.com/LowOnGravity" target="_blank">Click here to visit the creator's GitHub repository.</a></div>`;
            break;
         case "close":
  consoleDiv.remove();
  break;
                case "clear":
  consoleOutput.innerHTML = "";
  break;

            default:

            if (command.startsWith("generate")) {
              var parts = command.split(" ");
              var length = parseInt(parts[1]);
              if (isNaN(length)) {
                length = 8;
              }
              output = "Your password is: " + generatePassword(length);
            } else {
              output = "Command not recognized. Type 'help' for a list of commands.";
            }
        }
        var outputDiv = document.createElement("div");
        outputDiv.classList.add("kogama-password-output-line");
        outputDiv.innerHTML = output;
        consoleOutput.appendChild(outputDiv);
        consoleInput.value = "";
      }
    });

    document.body.appendChild(consoleDiv);
    consoleInput.focus();
  }

  var buttonDiv = document.createElement("div");
  buttonDiv.classList.add("kogama-password-button-container");
  var button = document.createElement("button");
  button.innerHTML = "Open Password Generator";
  button.classList.add("kogama-password-button");
  button.addEventListener("click", createConsole);
  buttonDiv.appendChild(button);
  document.body.appendChild(buttonDiv);
})();

// CSS styles for the console and buttons
var styles = `
  .kogama-password-button-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }

  .kogama-password-button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .kogama-password-button:hover {
    background-color: #555;
  }

  .kogama-password-console {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 600px;
    height: 400px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    z-index: 9999;
    font-family: Consolas, monospace;
    font-size: 14px;
    color: #fff;
    overflow: hidden;
  }

  .kogama-password-header {
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
    border-radius: 5px 5px 0 0;
    padding: 0 5px;
    cursor: move;
  }

  .kogama-password-header-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .kogama-password-header-button-red {
    background-color: #ff5f57;
  }

  .kogama-password-header-button-yellow {
    background-color: #ffbd2e;
  }

  .kogama-password-header-button-green {
    background-color: #28c940;
  }

  .kogama-password-header-title {
    font-weight: bold;
    font-size: 12px;
  }

  .kogama-password-input {
    width: 100%;
    padding: 10px;
    background-color: #000;
    border: none;
    color: #fff;
    font-family: Consolas, monospace;
    font-size: 14px;
    border-radius: 0;
    margin-top: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .kogama-password-input:focus {
    outline: none;
  }

  .kogama-password-output {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-right: 5px;
    box-sizing: border-box;
  }

  .kogama-password-output-line {
    margin: 5px;
  }
`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

