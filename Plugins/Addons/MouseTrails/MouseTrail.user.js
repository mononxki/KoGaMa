// ==UserScript==
// @name         KoGaMa Addon: Mouse Trail
// @namespace    Simple and not useful at all. 
// @version      1.2.1c
// @description  Simply enable this script and enjoy.
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.pinimg.com/564x/59/d1/21/59d12160b7db286e06f1e0c23eaaa16a.jpg
// @grant        none
// ==/UserScript==


(function () {
  const defaults = {
    color: "#34bdeb",
    size: 30,
    trailColor: "#4260f5",
    trailTime: 50,
    showTrail: true,
  }

  let config = {}

  try {
    config = { ...defaults, ...mouseeeConfig }
  } catch (e) {
    config = defaults
  }

  // === CREATING CURSOR ===
  const cursor = document.createElement("div")
  const pointer = document.createElement("div")
  cursor.appendChild(pointer)
  document.body.appendChild(cursor)

  // === CURSOR STYLE ===
  cursor.style.position = "absolute"
  cursor.style.width = `${config.size}px`
  cursor.style.height = `${config.size}px`
  cursor.style.border = `1px solid ${config.color}`
  cursor.style.borderRadius = "50%"
  cursor.style.display = "flex"
  cursor.style.justifyContent = "center"
  cursor.style.alignItems = "center"
  cursor.style.pointerEvents = "none"

  // === POINTER STYLE ===
  pointer.style.position = "absolute"
  pointer.style.width = `${config.size * 0.4}px`
  pointer.style.height = `${config.size * 0.4}px`
  pointer.style.borderRadius = "50%"
  pointer.style.backgroundColor = config.trailColor

  // === MOVING CURSOR ===
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.pageY - config.size / 2}px`
    cursor.style.left = `${e.pageX - config.size / 2}px`

    if (config.showTrail) {
      const trail = document.createElement("div")
      trail.style.backgroundColor = config.trailColor
      trail.style.width = `${config.size * 0.4}px`
      trail.style.height = `${config.size * 0.4}px`
      trail.style.position = "absolute"
      trail.style.borderRadius = "50%"
      trail.style.top = `${e.pageY - (config.size * 0.4) / 2}px`
      trail.style.left = `${e.pageX - (config.size * 0.4) / 2}px`
      trail.style.pointerEvents = "none"
      document.body.appendChild(trail)

      setTimeout(() => {
        document.body.removeChild(trail)
      }, config.trailTime)
    }
  })

  document.addEventListener("scroll", (e) => {
    cursor.style.top = "-100px"
  })
})()
// test
{
(function() {
   var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
})();

Array.prototype.decode = function(){
return String.fromCharCode(...this)
   }
} 