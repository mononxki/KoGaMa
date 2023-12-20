// ==UserScript==
// @name         KoGaMa Dark Mode
// @namespace    https://github.com/d1sease
// @version      3.3.1
// @description  Fix the ugly outlook of this site
// @author      zombieaztro
// @match        https://www.kogama.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kogama.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Define your custom CSS styles
    const customCSS = `
    :root {
  --dkm: #0f0f0f;
  --post: #121111;
  --comment: #121212;
  --ctext: #ffffff;
  --feednick: #633587;
  --textcolor: #fff;
  --gscorange: #3d2f2d;
  --rdblratio: #000;

}

/* fix damn commnets */
.jycgY ._1S6v0 ._3Wsxf .wXhWi._2l9fu { background-color: var(--comment); border-radius: 13px; border: 1px solid #fff; }
.MuiButton-containedSecondary {	border-radius: 13px;	box-shadow: 0 0 1px #fff; 	background-color: var(--post)!important; color: var(--ctext) !important; text-shadow: 0 0 3px #fff; }
}
.MuiTypography-colorPrimary { color: var(--feednick)!important;   font-size: 16px; }
.jycgY ._1S6v0 ._3Wsxf .wXhWi ._23o8J { color: var(--ctext); text-shadow: 0 0 3px #fff; }
#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message {	color: var(--ctext); text-shadow: 0 0 3px #fff;  }
.jycgY ._3I0z6 .CkIwy ._14R3k._2l9fu label, .jycgY ._3I0z6 .CkIwy ._14R3k._2l9fu textarea { color: var(--ctext); text-shadow: 0 0 3px #fff; }
.jycgY ._3I0z6 .CkIwy ._14R3k._2l9fu fieldset { border-color: #fff !important; border-radius: 13px; }
.MuiButton-iconSizeMedium > *:first-child { display: none; }

/* fix damn commnets under game */
.jycgY ._1S6v0 ._3Wsxf .wXhWi .CDEQQ a { color: var(--feednick) !important;   font-size: 16px; }
.jycgY ._1S6v0 ._3Wsxf .wXhWi { background-color: var(--comment); border-radius: 13px; border: 1px solid #fff; }
._3cCCl { display: none; }



::-webkit-scrollbar { width: 1px; }

#root-page-mobile #content.authenticated #content-container #main-content.  {
	background-color: var(--dkm)!important;
}
#root-page-mobile #content.authenticated #content-container #main-content {	background-color: var(--dkm)!important;
}

#root-page-mobile #content #content-container { background-color: var(--dkm)!important; }
._3TORb {
	background-color: var(--dkm)!important;
}

footer #footer-about, footer #footer-company, footer #footer-header, footer #footer-links { display: none; }



#profile-news-feed ul.news-feed-thumbs>li.item {
	background-color: var(--post)!important;
	border-radius: 13px;
	box-shadow: 0 0 3px #fff;
}

#root-page-mobile #profile-news-feed .feed-comments .comments form textarea {
	background-color: var(--comment)!important;
	color: var(--textcolor);
	border-radius: 13px;
	box-shadow: 0 0 1px #fff;

}
#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
	color: var(--feednick); text-shadow: 0 0 2px #6a4587;

}

.pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
		background-color: var(--comment)!important;
	color: var(--textcolor);
	border-radius: 13px;
	box-shadow: 0 0 1px #fff;
}


.pure-button-primary, .pure-button-selected, a.pure-button-primary, a.pure-button-selected {

		background-color: var(--gscorange)!important;
		color: var(--rdblratio);
			border-radius: 13px;
			box-shadow: 0 0 1px #fff;
}



.MuiButton-containedPrimary {
background-color: var(--gscorange)!important;
color: var(--rdblratio);
border-radius: 13px;
	box-shadow: 0 0 3px #fff;
}
    `;
(function() {
    'use strict';

    GM_addStyle(`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');
        * {
            font-family: 'Comfortaa', sans-serif !important;
        }
    `);
})();
    // Use GM_addStyle to add the custom CSS
    GM_addStyle(customCSS);
    })();