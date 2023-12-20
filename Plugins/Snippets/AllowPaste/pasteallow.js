(function() {
   var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
})();




(function() {
    var disableBeforeInstallPrompt = function(event) {
        event.preventDefault();
    };

    window.onbeforeinstallprompt = disableBeforeInstallPrompt;
})();
