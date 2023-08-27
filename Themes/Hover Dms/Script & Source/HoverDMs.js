
const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}

injectCss("HoverDms",`
  .zUJzi
  {
    width: 110px;
    height: 10px;
    transition: height 0.3s;
    transition: width 0.3s;
  }

  .zUJzi:hover
  {
   height: 400px;
   width: 500px;
       transition: height 0.3s;
    transition: width 0.3s;
  }



}`)