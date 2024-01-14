// COMPACT MENU
    function removeElementsByClass(className){
        var elements = document.querySelectorAll(className);
        elements.forEach(function(element) {
            element.remove();
        });
    }


    window.addEventListener('load', function() {

        removeElementsByClass('.news');
        removeElementsByClass('.subscription');
        removeElementsByClass('.purchase');
    });


    var observer = new MutationObserver(function(mutationsList) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {

                removeElementsByClass('.news');
                removeElementsByClass('.subscription');
                removeElementsByClass('.purchase');
            }
        });
    });


    var targetNode = document.body;
    var config = { childList: true, subtree: true };


    observer.observe(targetNode, config);



const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}
