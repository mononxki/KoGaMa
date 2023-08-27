


    // Style
    let sheet = top.document.head.appendChild(top.document.createElement('style'))
        .sheet;
    sheet.insertRules = rules => rules.replace(/\}/g, '}^')
        .split('^')
        .map(r => (r.indexOf('{') + 1) && sheet.insertRule(r));
    sheet.insertRules(`

._3zDi- {
  font-family:arial black;
  font-size:16px;
  background-image:
    linear-gradient(to right,#ee9ca7,#ee9ca7,#ffc3a0,#ee9ca7,#ffc3a0,#ffafbd);
  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: rainbow-animations 2000s linear infinite;
}

@keyframes rainbow-animations {
    to {
        background-position: 4500vh;


}
}
._375XK .F3PyX ._2XzvN {
  font-family:arial black;
  font-size:16px;
  background-image:
    linear-gradient(to right,#ee9ca7,#ee9ca7,#ffc3a0,#ee9ca7,#ffc3a0,#ffafbd);
  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: rainbow-animations 860s linear infinite;
}

@keyframes rainbow-animations {
    to {
        background-position: 4500vh;


}
}

.uwn5j ._3DYYr ._28mON {
  font-family:arial black;
  font-size:16px;
  background-image:
    linear-gradient(to right,#ee9ca7,#ee9ca7,#ffc3a0,#ee9ca7,#ffc3a0,#ffafbd);
  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: rainbow-animations 860s linear infinite;
}

@keyframes rainbow-animations {
    to {
        background-position: 4500vh;


}
}

`)



