// ==UserScript==
// @name         Webgl Resize - Scuffed.
// @namespace    https://github.com/LowOnGravity/KoGaMa
// @version      1.0
// @description  Scuffed but works, kind of.
// @author       Simon
// @match        https://www.kogama.com/games/play/*
// @icon         https://i.imgur.com/UwgSBqG.gif
// @grant        none
// ==/UserScript==

const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}


// This script is a little scuffed due to the individual display you have
// please try and tweak (mainly) ratio for something you find comfortable.

// 	 Height of game:     min-height: 782px;
//	 Width of game:   min-width: 500px;

//  ratio of width:   width: 100%;
// ratio of height: height: 70%;

// in-game command to check resolution: /r
// in-game command to check resolution: /r
// in-game command to check resolution: /r

injectCss("Resizing Webgl",`

#unity #unity-player-container-wrapper {
	    min-height: 782px;
	    min-width: 500px;
}

iframe {
    width: 100%;
    height: 70%;
}


}`)



