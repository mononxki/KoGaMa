// ==UserScript==
// @name        Fluent Echo
// @namespace    insignificant <3
// @version      1.2
// @description  Simple theme for KoGaMa.
// @author       Simon
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.pinimg.com/564x/59/d1/21/59d12160b7db286e06f1e0c23eaaa16a.jpg
// @grant        none
// ==/UserScript==


const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}


injectCss("Minimal Dark",`


@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');

/* GENERAL CONFIG */
::selection {
    background: var(--general);
    color: var(--bkg);
}

a:hover {
    color: var(--general);
}

* {
    font-family: 'Comfortaa', cursive;
}

::-webkit-scrollbar {
    width: 6px !important;
}

::-webkit-scrollbar-thumb {
    background-image: linear-gradient(45deg, var(--general), var(--general));
    border-radius: 2px;
}
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* Main Site Outlook */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */


/* Site Background Image */
#content-container{
  background-image: url("https://cdn.discordapp.com/attachments/1042147480839667793/1048527186509963304/ezgif-1-6cd5927ebf.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}
/* subpage selector style */

body#root-page-mobile header#pageheader {
	 background-image: url("https://cdn.discordapp.com/attachments/1042147480839667793/1048527186509963304/ezgif-1-6cd5927ebf.gif");
  background-position: center;
    background-repeat: no-repeat;
      background-size: cover;
}




































footer #footer-header {
	display: none;
}
footer #footer-company {
	display: none;
}

footer #footer-about {
	display: none;
}
footer #footer-links {
	display: none;
}

/* Main icon */
body#root-page-mobile header#pageheader .logo .logo-image {
    display: inline-block;
    background-image: url(https://cdn.discordapp.com/attachments/1038338241201455175/1048518669841477642/f2b4ed5bae8bcf836ff9489f146607b0.jpg);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    border-radius: 36px;
    width: 36px;
    height: 36px;
    margin: 7px 8px 3px 5px;
}

/* leaderboard-list */
#mobile-page #profile-leaderboard ol.leaderboard-list li:nth-child(2n) {
    background-color: hsl(0deg 0% 100% / 0%);
    border-bottom: none;
}
#mobile-page #profile-leaderboard ol.leaderboard-list li:nth-child(odd) {
    background-color: hsl(0deg 0% 100% / 0%);
    border-bottom: none;
 }

 #mobile-page #leaderboard-leaderboard ol.leaderboard-list li:nth-child(odd), #mobile-page #profile-leaderboard ol.leaderboard-list li:nth-child(odd) {
 	    background-color: hsl(0deg 0% 100% / 0%);
    border-bottom: none;
 }

 #mobile-page #leaderboard-leaderboard ol.leaderboard-list li:nth-child(2n), #mobile-page #profile-leaderboard ol.leaderboard-list li:nth-child(2n) {
 	 	    background-color: hsl(0deg 0% 100% / 0%);
    border-bottom: none;
 }





/* Avatar / Model comments */
#root-page-mobile .comments li .body {
		background-color: rgb(81 83 84 / 9%)!important;
    color: rgb(123 123 129)!important;
    border-radius: 25px;
}

/* Hide Avatar / Model comments Arrow */
#root-page-mobile .comments li .body .arrow-left, #root-page-mobile .comments li .body .arrow-left-border {
	border-style: none;
}

/* Your comment text area */
.pure-form textarea {
	background-color: rgb(81 83 84 / 9%)!important;
    color: rgb(123 123 129)!important;
    border-radius: 25px;

}


/* Site subpage selectors text | Disabled */

body#root-page-mobile header#pageheader nav.menu>ol>li a .text {
	display: none;
}
/* Icons padding */
body#root-page-mobile header#pageheader nav.menu>ol>li a {
	padding: 10px 30px;
	padding-left: 100px;
}

/* Elite ; Video ; News subpage | Hidden */
body#root-page-mobile header#pageheader nav.menu>ol li.news, body#root-page-mobile header#pageheader nav.menu>ol li.subscription {
	display: none;
}

body#root-page-mobile header#pageheader nav.menu>ol>li {
	padding-left: 300px;
}




/* Gold Purchasion subpage */



.gold-package {
	background-color: transparent;
}


.btn-success {
	background-color: #8b7095;
    box-shadow: 0 0 3px #ffffff;

}

.gold-package .p {
	text-transform: none;
	color: #c295d5;
}



.gold-package .h2 {
    color: #ff9efc;
}



/* xp subpage */

/* Get rid of useless text + image */
#mobile-page #profile-levels section.learn section {
display: none;
}

/* Videos */

#mobile-page .games-list .youtube-tile .game-name-stats {
    background-color: rgb(0 53 134 / 75%);
    border-radius: 25px;
}

/* centering */

#mobile-page #profile-levels section.levels {
padding-top: 50px;
    margin-left: -16px;
    }


#mobile-page #profile-levels {
padding-top: 300px;
padding-left: 100px;
}
/* xp bar */
#mobile-page #profile-levels section.user-progress .level-progress-container .level-progress .level-progress-fullfil {
	 -webkit-box-shadow: 1px 1px 6px 0 rgba(0,0,0,.15),4px 0 6px -2px rgba(255,55,15,.8);
    box-shadow: 1px 1px 6px 0 rgba(0,0,0,.15),4px 0 6px -2px rgba(255,55,15,.8);
    border-radius: 25px;
    background-image: linear-gradient(0.25turn, #B621FE, #1FD1F9);
}

#mobile-page #profile-levels section.user-progress {
	border-radius: 25px;
}

#mobile-page #profile-levels section.user-progress .level-progress-container .xp .data {
 color: rgb(235 104 213 / 53%);
     text-shadow: 0 0 3px #ffffff;
}

#mobile-page #profile-levels section.user-progress .level-progress-container .xp .caption {
	display: none;
}

/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* PROFILE STUFF                                                    */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */


/* small user gui */

	/* xp bar */
		body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .xp-level a .xp-bar {
			display: none;
				}

		body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .xp-level a {
				width: 40px;
				}


	/* notifications */
		body#root-page-mobile header#pageheader #meta-nav>li.profile-notify .header-icon-count {
				background-color: transparent;
				  text-shadow:
						 0 0 5px #cab0eb, 0 0 10px #8556bf,
					     0 0 20px #cab0eb, 0 0 10px #8556bf;
				}

		body#root-page-mobile header#pageheader #meta-nav>li.profile-notify #header-icon {
				fill: hsl(0deg 0% 0%);
		}

	/* outlook */
				#root-page-mobile #header-notify-toggle #notify .container {

  				  background-color: transparent;
   				 background-color: transparent;
 				   color: rgba(0,0,0,.53);
  				  will-change: box-shadow;
  				  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.15),0 1px 5px 0 rgba(0,0,0,.12);
  				  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.15),0 1px 5px 0 rgba(0,0,0,.12);
  				  border-radius: 0 0 0 2px;
  				  border-bottom: 3px solid rgba(0,0,0,.3)
				}

				#root-page-mobile #header-notify-toggle #notify .container header {
					  		background-color: hsl(0deg 3% 33% / 13%);
				}

				#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li:hover .count {
					  background-color: transparent;
}
				#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .text {
  				  	color: rgb(199 125 213 / 53%);
  				  			text-shadow: 0 0 3px #ffffff;
}

				#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .count {
  				  	background-color: transparent;

}




	/* Settings menu */
					/* style */
				body#root-page-mobile header#pageheader #profile-extended {
					background-image: url('https://cdn.discordapp.com/attachments/1042147480839667793/1048527186509963304/ezgif-1-6cd5927ebf.gif');
					background-repeat: no-repeat;
					      background-size: cover;
				}

					/* Username style */
					body#root-page-mobile header#pageheader #profile-extended .username small {
						display: none;
					}
				/* gold level background */
					body#root-page-mobile header#pageheader #profile-extended .user-credits {
						background-color: transparent;
					}
				body#root-page-mobile header#pageheader #profile-extended .username {
					background-color: transparent;
				}
				body#root-page-mobile header#pageheader #profile-extended .profile-links .arrow-top-border {
					  border-color: hsl(0deg 0% 100% / 0%) transparent
    			}

    			body#root-page-mobile header#pageheader #profile-extended .profile-links .arrow-top {
    				border-color: rgb(0 0 0 / 0%) transparent transparent;
    			}

    			body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level a .level-image {
    				display: none;
    			}

    			body#root-page-mobile header#pageheader #profile-extended .user-credits .gold .sprite-icon_gold_dark, body#root-page-mobile header#pageheader #profile-extended .user-credits .gold .sprite-icon_silver_dark, body#root-page-mobile header#pageheader #profile-extended .user-credits .silver .sprite-icon_gold_dark, body#root-page-mobile header#pageheader #profile-extended .user-credits .silver .sprite-icon_silver_dark {
    				display: none;
    			}

    			body#root-page-mobile header#pageheader #profile-extended .user-credits .gold .sprite-green_button {
    				display: none;
    			}
    			body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level {
    				padding-top: 16px;
    			}

    			.xp-bar .progress .progression-bar {
    				        background-image: linear-gradient(0.25turn, #B621FE, #1FD1F9);
    				    	border-radius: 25px;
    			}
    			.xp-bar .progress {
    				border-radius: 25px;
    			}

    			body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level a .xp-bar .xp-text {
    						text-shadow: 0 0 3px #ffffff;
    			}

    			body#root-page-mobile header#pageheader #profile-extended .user-credits .gold .data, body#root-page-mobile header#pageheader #profile-extended .user-credits .silver .data {
    				background-color: transparent;
    				color: #e79a3b;
    				text-shadow: 0 0 3px #ffffff;
    			}

    			body#root-page-mobile header#pageheader #profile-extended .profile-links a:hover {
    				color: #8737c2;
					text-shadow: 0 0 3px #ffffff;

    			}



/* join date */
#mobile-page #profile-page .section-top .profile-meta .profile-created-date {
    color: rgb(193 133 239 / 62%);
	font-size: 100%;

}
#root-page-mobile #header-notify-toggle #notify .container .exit a {
	border: none;
}

/* Main username glow */
#mobile-page #profile-page .section-top .username h2 a {
	color: #5a577a;
	  text-shadow:
  0 0 5px #cab0eb, 0 0 10px #8556bf,
  0 0 20px #cab0eb, 0 0 10px #8556bf;
}


/* feed padding */
#mobile-page #profile-page .creations-feed {
	padding-top: 120px;
}

/* display badges none */
#mobile-page #profile-page .section-top .profile-badges {
	display: none;
}

/* creations container  captions properties */
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption-container {

	background-color: rgb(47 49 50 / 40%) !important;
    border-bottom-right-radius: 25px;
	border-bottom-left-radius: 25px;
}

/* creations images container properties */
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .display-image {
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;

}


#mobile-page #profile-page section.creations-custom .creation-list .creation-item {
	background-color: rgb(96 117 139 / 0%);
}

/* Description stuff */
#mobile-page #profile-page section.creations-custom .section-description .description-container .text {
	    padding-top: 6px;
    padding-left: 10px;
    padding-bottom: 6px;
    font-family: Open Sans,sans-serif;
    border-radius: 25px;
    font-weight: 700;
	overflow-y: scroll; /* Add the ability to scroll */
    overflow-x: hidden;
    max-height: 160px;
    word-break: break-word;
    word-wrap: break-word;
    color: hsla(0,0%,100%,.73);
    line-height: 1rem;
    font-size: .75rem;
    background-image: linear-gradient(45deg,hsl(0deg 0% 5% / 0%) 25%,transparent 0,transparent 50%,hsl(0deg 0% 5% / 0%) 0,hsl(0deg 0% 5% / 0%) 75%,transparent 0,transparent);
}


#mobile-page #profile-page section.creations-custom .section-description .description-container {
    -webkit-box-shadow: -2px 2px 15px 0 rgb(0 0 0 / 20%), -1px 1px 2px 0 rgb(0 0 0 / 20%);
    box-shadow: 8px -9px 15px 0 rgb(0 0 0 / 0%), -1px 1px 2px 0 rgb(0 0 0 / 0%);
    max-height: 200px;
    background-color: rgb(0 0 0 / 23%);
	    border-radius: 25px;
}


#mobile-page #profile-page section.creations-custom .section-description .description-container .header {
	visibility: visible;


    background-color: rgb(0 0 0 / 0%);
    padding: 6px 200px;

}

/* Avatar Selection Menu */



#mobile-page #profile-avatar-list .avatar-list .item .avatar-image {
	border-radius: 25px 25px 0 0;
	box-shadow: 0 0 3px #ffffff;;
}



.pure-button-success, a.pure-button-success {
	border-radius: 0 0 25px 25px;
	background-color: #51326263;
	box-shadow: 0 0 3px #ffffff;;
}


#mobile-page #profile-avatar-list section.create-avatar-info {
	display: none;
}







/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* friendlist stuff */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */

/* Component transparency */
._3TORb ._1Yhgq, ._3TORb ._3iXbw {
	background-color: transparent;
}

._3TORb {
	background-color: transparent;

}

/* Hide useless border beneath self-username */
._3TORb ._2E1AL {
	border-bottom: none;
}


/* Friendlist Last Online | Disabled */
._1lvYU ._1taAL p._40qZj {
	display: none;
}

/* compact style */
.UA3TP ._3TOEv {
	display: none;
}

._3TORb ._1lvYU ._2AOlq {
	display: none;
}
._3TORb ._1lvYU ._1Dx5s button {
	font-size: 1em;
}

/* Hover Friendlist */
._1Yhgq {min-width: unset;position: absolute; right:0;}
._1Yhgq {max-width: 65px;min-width: 65px;transition: 0.5s ease;}
._1Yhgq:hover {max-width: 240px;min-width: 240px;transition: 0.5s ease;}
 }



/* Usernames Glow */
._3zDi- {

		text-shadow: 0 0 3px #ffffff;

}

/* Center usernames */
._3TORb ._1lvYU ._1taAL p._3zDi- {
	padding-left: 50px;
}

/* Distance between usernames */
._3TORb ._1lvYU {
	padding: 0.4em;
}

/* Center Online/offline text */
._3TORb ._1Yhgq header, ._3TORb ._3iXbw header {
	padding: 0 50px;

}




/* In game button background color */
._3TORb ._1lvYU ._1Dx5s button.WXeh0 {
	background-color: transparent;
}










/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* Feed */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
#profile-news-feed ul.news-feed-thumbs>li.item {
    position: relative;
	background-color: rgb(81 83 84 / 9%)!important;
    color: rgb(123 123 129)!important;
    margin-bottom: 1rem;
    border-radius: 25px;
    -webkit-box-shadow: 1px 1px 2px rgb(0 0 0 / 10%);
    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%);

}

 /* Post Text Area  */
#profile-status-update form.status-message textarea {
	background-color: rgb(81 83 84 / 9%)!important;
    color: rgb(123 123 129)!important;
    border-radius: 25px;

}
 /* Post Button */
#profile-status-update .button-wrapper button {
	background-color: rgb(81 83 84 / 9%)!important;
    color: rgb(123 123 129)!important;
    border-radius: 25px;
}


/* Comments Stuff */
#root-page-mobile #profile-news-feed .feed-comments .comments form textarea {
	background-color: rgb(81 83 84 / 9%)!important;
    color: rgb(123 123 129)!important;
    border-radius: 25px
    border: ridge;
	border: 1px solid #630583;
}

/* comment padding fix */
#root-page-mobile .comments li .text {
	padding-left: 15px;
}
#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .username a {
	padding-left: 15px;

}
/* this field is required border + it's color */
.control-group.error input, .control-group.error textarea, input.error, textarea.error {
	border: 1px solid #630583;
}
/* this field is required color */
.control-group.error ul.help-inline {
	color: #5e0b68;
}


/* Post Creator Username Glow + padding */
#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
	color: #5a577a;
	text-shadow: 0 0 10px #5a2f9c;
}



/* Bought avatar name glow test */
#profile-news-feed ul.news-feed-thumbs>li.item.marketplace_buy a.product-avatar-link {
	color: #5a577a;
	  text-shadow:
  0 0 5px #cab0eb, 0 0 10px #8556bf,
  0 0 20px #cab0eb, 0 0 10px #8556bf;

}
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */

/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */






/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */


/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */









/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* Logged-out stuff */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */
/* - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  */


/* SIGNUP */
body#root-page-mobile header#pageheader #meta-nav>li.signup a {
	background-color: transparent;
	color: #e91e63;
	border: 1px groove ;
	border-color: white;
}

/* LOGIN */
body#root-page-mobile header#pageheader #meta-nav>li.login a {
	color: #e91e63;

}
body#root-page-mobile header#pageheader #meta-nav>li.login {
	margin-top: 5px;
		border: 1px groove ;
	border-color: white;
	line-height: -30px;
	height: 36px;
	width: 120px;

}

body#root-page-mobile header#pageheader #meta-nav>li.login .text {
		padding-left: 32px;

}

/* Logging In Popout */

/* Wider Style */
.ifgvoV {
	flex: 0 0 0%;
}
/* Text Elements */
.gFqNuK {
    display: flex;
    align-items: center;
}
/* Background */
.iuRrCF {
	background-image: url('https://cdn.discordapp.com/attachments/1042147480839667793/1048527186509963304/ezgif-1-6cd5927ebf.gif');	  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
/* I don't have an account text color */
.fHrmiR {
	color: rgb(202 32 165);
}

/* Lost my username or password color */
.cgYGeA {
		color: rgb(202 32 165);
}

/* CAPTCHA text hidden */
.gFqNuK p {
	display: none;
}

/* Log in button */
.dUbOlt {
	box-shadow: rgb(114 71 99 / 10%) 0px 5px 0px;
	background-color: rgb(193 102 190 / 11%);
}
.dUbOlt:hover {
    top: -2px;
    box-shadow: rgb(122 78 157 / 61%) 0px 7px 0px;
}
/* Text Field */
.dEMWf {
	background-color: transparent;
	border: ;
	border-radius: 25px;
}
.dEMWf {
	color: rgb(215 77 24);
}



/* More visible text  */

/* Headers */
.dAjOiY {
	color: rgb(215 46 202 / 84%);
}
/* Secondary Text */
.Uxjqh {
	color: rgb(209 148 198);
}
/* Avatar Type */
.bwmLkf {
color: rgb(164 59 207);
}
/* Captcha text Hidden */
.dsNtMM {
	display: none;
}

/* Register Field Required */

.Uxjqh.error {
 color: rgb(0 255 220);
}

/* Select your birthdate */
.VpZem {
	background-color: transparent;
	border: none;
}

/* signup to comment hidden */
a.signup-to-comment-box {
	display: none;
}

/* Direct Message Box */

        	.zUJzi  {
        	  /* Container Size */
        	    width: 550px;
    			height: 320px;
				/* More Spacious */
				border: none;
        		/* Glowing Box Container */
    		  	box-shadow:
  0 0 5px #cab0eb, 0 0 10px #8556bf,
  0 0 20px #cab0eb, 0 0 10px #8556bf;
	/* test raduis */
	border-top-left-radius: 25px;
	border-top-right-radius: 25px;

        	}
		/* message font size */
        	._375XK ._2XaOw ._1j2Cd p {
        		font-size: 1em;
        		border-radius: 25px;
        		background-color: rgb(145 45 123 / 26%)!important; /* Bubble */
        	        		color: #e970c4; /* Message */

        	}
        	/* Do not break words */
        	._375XK ._2XaOw ._1j2Cd {
        		word-break: normal;
        	}
        	/* Username Color & Close Dms button */
        	._375XK .F3PyX ._2XzvN {
        		flex: 0;
				  color: #03a9f4;
					 font-weight: 700;
        	}
        	/* Selected Dm */
        	.zUJzi .o_DA6 .uwn5j ._3DYYr._2dPu4 {
        		    		  	box-shadow:
								 0 0 5px #439dde, 0 0 10px #8556bf,
									0 0 20px #439dde, 0 0 10px #8556bf;
									    border-left: 2px solid #ff00d4;
													border-top-right-radius: 25px;
													border-bottom-right-radius: 25px;

        	}
        	/* Hide Message Preview - For Privacy */
        	.uwn5j ._3DYYr ._1j2Cd {
        		display: none;
        	}
        	/* Username List Dyslexia Help */
        	.zUJzi .o_DA6 .uwn5j ._3DYYr ._28mON header {
        		font-size: 1em;
        				text-shadow: 0 0 3px #ffffff;
        	}
        	/* Text Color & Bubble Color */
        	._375XK ._2XaOw ._1j2Cd._1Xzzq p {
        		background-color: hsl(282deg 39% 81% / 26%); /* bubble */
        		color: #e970c4; /* Message */
        	}


	 /* Box Transparency */
	.zUJzi, ._375XK, ._2XaOw  {
	background-color: transparent;
}
        	._2XaOw {
background: transparent;
}
.uwn5j {
	background-color: rgba(0, 0, 0, 0.1);;
}

.zUJzi, ._375XK, ._2XaOw  {
	background-color: transparent;
}
        	/* borders */
        .zUJzi .o_DA6 .uwn5j {
        	border-right: none;
        }
        ._375XK .F3PyX {
        	border-bottom: none;
        }

        /* Text area */
        ._375XK textarea {
        	background-color: #fff0; /* Transparent */
        	    color: #09f4ff; /*Message */
        	    border: none;
        }
 }`)
