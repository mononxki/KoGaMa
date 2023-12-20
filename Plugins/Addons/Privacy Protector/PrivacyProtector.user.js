// ==UserScript==
// @name         KoGaMa Theme: Screenshot Privacy
// @namespace    https://github.com/LowOnGravity
// @version      1.5
// @description  Simply hover over blurred parts to reveal it. This script aims to make your public screenshots more private.
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon        https://i.imgur.com/UwgSBqG.gif
// @grant        none
// ==/UserScript==

const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}


injectCss("PrivacyBlur",`




/* Side Panel Friends */
._3TORb ._1lvYU {
        -webkit-filter: blur(7px);
         backdrop-filter: blur(7px);
                    transition: all 0.5s;
}

._3TORb ._1lvYU:hover {
        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;
}

/* Side Panel SelfUsername Hid */
._3TORb ._2E1AL {
	  display: none;
}

/* Main username */
#mobile-page #profile-page .section-top .username h2 a {
        -webkit-filter: blur(6px);
         backdrop-filter: blur(6px);
                             transition: all 0.5s;


}
#mobile-page #profile-page .section-top .username h2 a:hover {
		        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;

}

/* progression-stuff */
#mobile-page #profile-page .section-top .progression .progression-item {
	        -webkit-filter: blur(5px);
                             transition: all 0.5s;
}

#mobile-page #profile-page .section-top .progression .progression-item:hover  {
			        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;

}
._3TORb {
background-color: transparent;
}

/* Posts */

#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
	        -webkit-filter: blur(4px);
         backdrop-filter: blur(4px);
                                      transition: all 0.5s;
}

#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user:hover {
				        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;
}

/* Description */

#mobile-page #profile-page section.creations-custom .section-description .description-container .text {
	        -webkit-filter: blur(4px);
         backdrop-filter: blur(4px);
                                      transition: all 0.5s;
         }
#mobile-page #profile-page section.creations-custom .section-description .description-container .text:hover {
				        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;


}

.xp-bar .xp-text {
	        -webkit-filter: blur(4px);
         backdrop-filter: blur(4px);
                                      transition: all 0.5s;
}

.xp-bar .xp-text:hover {
				        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;


}

body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .gold {
	        -webkit-filter: blur(4px);
         backdrop-filter: blur(4px);
                                      transition: all 0.5s;
}


body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .gold:hover {
				        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;

}


#root-page-mobile .comments li {
	        -webkit-filter: blur(4px);
         backdrop-filter: blur(4px);
                                      transition: all 0.5s;

}

#root-page-mobile .comments li:hover {
				        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;
}

.ifOMMh {
display:none;
}

body#root-page-mobile header#pageheader #profile-extended .username a {
	        -webkit-filter: blur(4px);
         backdrop-filter: blur(4px);
                                      transition: all 0.5s;


}

body#root-page-mobile header#pageheader #profile-extended .username a:hover {
				        -webkit-filter: none;
         backdrop-filter: none;
           transition: all 0.5s;
}



}`)
