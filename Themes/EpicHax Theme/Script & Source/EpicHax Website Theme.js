

const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}


injectCss("EH Theme",`
a[href="/subscription/subscribe/"] {
  display:none;
}

a[href="/purchase/"] {
	display: none;
}
a[href="/profile/669471717/edit/"] {
	 display: inline;
}

  :root {
        --bg: #17181c; /* background */
        --bg-dark: #121316;  /* darken */
        --main: #34cd63;  /* green */
        --tmain: #34cd6391;  /* sopmething4sure */
        --border: 1px solid #74747724  /* green border */
    }

::-webkit-scrollbar {
    width: 3px !important;
}
::-webkit-scrollbar-thumb {
    background-image: linear-gradient(45deg, var(--general), var(--general));
    border-radius: 2px;
}

body#root-page-mobile header#pageheader {
	background-color: var(--bg-dark);
}

body#root-page-mobile header#pageheader nav.menu>ol>li a {
	color: var(--main);
	text-shadow: 0 0 10px #65c940;
    line-height: 28px;
    padding: 10px 36px;
    margin-left: 140px;
    font-size: .875rem;
    text-transform: none;
    font-family: Open Sans,sans-serif;
    font-weight: 1;
}

.icon-cubes:before {
display: none;
}
.icon-basket:before {
display: none;
}
.icon-news:before, .icon-video:before {
display: none;
}
.icon-youtube-play:before {
display: none;
}

.icon-star:before, .text-gold {
		color: var(--main);
	text-shadow: 0 0 10px #65c940;
}

body#root-page-mobile header#pageheader #profile-extended .profile-links ul.links>li.link-group>a {
	border: none;
}
#mobile-page #news-post .post-content .post-body {
    color: rgb(174 74 77);
    border-radius: 25px;
        background-color: hsl(0deg 0% 100% / 0%);
}
#mobile-page #news-post .post-content .post-body h1, #mobile-page #news-post .post-content .post-body h2, #mobile-page #news-post .post-content .post-body h3, #mobile-page #news-post .post-content .post-body h4 {
color: rgb(255 255 255);
text-shadow: 0 0 3px #fff;
}

/* badge or coupon reward */
#coupon-reward .modal-content {
	background-color: var(--bg-dark);
	background-image: var(--bg-dark);
	border-radius: 25px;
}
/* login */

.UTtFJ {
	    display: flex;
    flex-direction: column;
    flex: 1 1 50%;
    padding: 2rem 3rem;
	border-radius: 25px;
}
.itriDf {
	background-color: var(--bg-dark);
	border-radius: 25px;
}
.dAlqYF, .eywwGo {
	display: none;
}

.cOSRLo, .dsNtMM a, .fHrmiR {
		text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}

.eRwkyD {
	border-radius: 25px;
	background-color: var(--bg);
	color: #71e81c;
	text-shadow: 0 0 3px #a9f274;
}
.dEMWf {
	border-radius: 25px;
	background-color: var(--bg);
	color: #71e81c;
	text-shadow: 0 0 3px #a9f274;
}
.dUbOlt {
	box-shadow: none;
	border-radius: 25px;
	background-color: #fff;
		text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
body#root-page-mobile header#pageheader #meta-nav>li.login .text {
	background-color: var(--bg-dark) !important;
    color: var(--main) !important;
    border-radius: 25px !important;


}

body#root-page-mobile header#pageheader nav.menu>ol li.active a {
	background-color: transparent;
}
body#root-page-mobile header#pageheader nav.menu>ol>li a:hover {
	border-bottom: 1px solid #913737;
}
#profile-news-feed ul.news-feed-thumbs>li.item, #root-page-mobile #profile-news-feed .feed-comments .comments form textarea, #profile-status-update form.status-message textarea {
	background-color: var(--bg-dark);
}

#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
	text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
#root-page-mobile #content #content-container {
	background: var(--bg);
}
._3TORb ._1Yhgq, ._3TORb ._3iXbw, ._3TORb ._2E1AL {
	background: var(--bg);
}

.o_DA6 .uwn5j, ._375XK ._2XaOw, ._375XK textarea, ._375XK .F3PyX {
	background-color: var(--bg);
	border:  none
}

.zUJzi {
	border: solid var(--main) 1px;
}

._375XK textarea {
	color: var(--main);
}

._375XK ._2XaOw ._1j2Cd._1Xzzq p {
background-color: hsl(0deg 3% 11% / 80%);
color: rgb(74 241 79);
text-shadow: 0 0 3px #b03352;
}
._375XK ._2XaOw ._1j2Cd p {
background-color: hsl(0deg 3% 11% / 80%);
text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
.pure-button, .pure-button-small {
	background-color: var(--bg-dark);
	color: var(--main);
	border-radius: 25px;
		border: solid var(--main) 1px;
}
	body#root-page-mobile header#pageheader #meta-nav>li.profile-notify #header-icon {
		fill: #bf4358;
		text-shadow: 0 0 10px #b84d66;
	}
	body#root-page-mobile header#pageheader #meta-nav>li.profile-notify .header-icon-count {
		background-color: var(--bg-dark);
		right: 2px;
		font-size: .800rem;
		color: var(--main);
	}

#root-page-mobile #header-notify-toggle #notify .container {
    background-color: #121316;
    background-color: #121316;
    border-radius: 0 0 0 2px;
    border-bottom: 3px solid rgba(0,0,0,.3);
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .text {
    color: #b84d66;
    text-shadow: 0 0 5px #eb655b;
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .count {
        background-color: #d63e5f;
}

#root-page-mobile #header-notify-toggle #notify .container .exit a {
    border: none;
    padding-right: 10px;
    margin-top: 15px;
}
#root-page-mobile #header-notify-toggle #notify .container header {
    background-color: #121316;
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-messages ul li .username {
    color: #34cd63;
}

.pure-form input[type=color]:focus, .pure-form input[type=date]:focus, .pure-form input[type=datetime-local]:focus, .pure-form input[type=datetime]:focus, .pure-form input[type=email]:focus, .pure-form input[type=month]:focus, .pure-form input[type=number]:focus, .pure-form input[type=password]:focus, .pure-form input[type=search]:focus, .pure-form input[type=tel]:focus, .pure-form input[type=text]:focus, .pure-form input[type=time]:focus, .pure-form input[type=url]:focus, .pure-form input[type=week]:focus, .pure-form select:focus, .pure-form textarea:focus {
    background-color: #121316;
}

#mobile-page #profile-edit form .birthday-form .select select {
    background-color: #121316;
    }

	.xp-bar .xp-text, .xp-bar .progress {
		display: none;
	}
body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .xp-level a {
	width: 40px;
}

.pure-input-1, .pure-input-1-2
 {
	color: #2572e6;
	text-shadow: 0 0 5px #7f78cf;
}
#mobile-page #profile-edit form .birthday-form .select {
	background-color: transparent;
}

#mobile-page #profile-edit form .birthday-form .select select {
	color: #db937b;
	text-shadow: 0 0 5px #b53133;
}

.icon-menu:before {
	color: #40a2ed;
	text-shadow: 0 0 5px #31d1f5;
}
.icon-gamepad:before {
	display: none;
}

body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level {
	flex-basis: 100%;
	display: none;
}



#root-page-mobile .comments li .body:hover {
background: var(--bg-dark);
}




#mobile-page .content-shop .shop-list .shop-item:hover .shop-price {
	visibility: visible;
	border: var(--border);
	border-radius: 10px;
	color: var(--main);
	opacity: unset;
	position: unset;
	background: var(--bg);
}

#mobile-page .content-shop .shop-list .shop-item .shop-name {
	text-shadow: 0 0 5px #fff;
}

#mobile-page #product-detail .product-purchase .product-image-avatar  {
	border-radius: 25px;
}
#mobile-page #product-detail .product-purchase .product-image-model {
	border-radius: 25px;
}


#mobile-page #product-detail #product-purchase-link {
	    margin-top: -42px;
}


#mobile-page .games-list .game-item .game-name-stats {
	visibility: visible;
	border: var(--border);
	border-radius: 10px;
	opacity: unset;
	position: unset;
	background: var(--bg); }

	#mobile-page .games-list .game-item .game-image {
		padding-top: 63.42%;
		margin: -4px -20px;
		transition: 500ms;
		background-position: center;
		border: solid var(--bg) 10px;
		border-radius: 22px;

	}
	#mobile-page .games-list .game-item .game-name {
		color: var(--main);
		margin: -8px -5px -2px;
			     text-shadow: 0 0 1px #7bb08b;
		}


.games-stats {
	font-family: Open Sans, sans-serif;
	font-weight: 700;
	color: #e8e8e8;
	text-align: left;
	font-size: .75rem;
	margin: -2px -11px -5px;
	float: left; color: white; }


}
} .game-item {
	transform: scale(1); }

#profile-news-feed ul.news-feed-thumbs > li.item, #root-page-mobile #profile-news-feed .feed-comments .comments form textarea, #profile-status-update form.status-message textarea {
	border-radius: 25px;

}



#mobile-page #profile-avatar-list section.create-avatar-info {
	background-color: var(--bg-dark);
	background-image: var(--bg-dark);;
	border-radius: 40px;
			border: solid var(--bg) 10px;
			margin: 0px 0px 0px;
}

#mobile-page #profile-avatar-list section.create-avatar-info .call-to-action, #mobile-page #profile-avatar-list section.create-avatar-info .signup-button {
	background-color: #fff

}



#mobile-page #profile-avatar-list .avatar-list .item .set-active {
	border-radius: 0 0 5px 5px;
	background-color: var(--main);
	text-shadow: 0 0 5px #bf4358;
color: #fff;
}

#mobile-page #profile-page .section-top .profile-badges .profile-badge-list li.item .unseen .icon-gift {
	background-color: #bf4358;
}

#mobile-page #profile-page .section-top .profile-badges .profile-badge-list li.item .unseen {
background: #bf4358;
    background-color: #bf4358;
        background-image: linear-gradient(180deg,#bf4358 0,#bf4358);
}

#root-page-mobile .comments li .header .username a {
	padding-right: 20px;
	padding-left: 20px;
}
#root-page-mobile .comments li .text {
	padding-left: 15px;
}

#mobile-page #game-play section.game-stats-social .like-container {
	border-radius: 25px;
}



.pure-button-primary, .pure-button-selected, a.pure-button-primary, a.pure-button-selected {
	text-shadow: 0 0 5px #bf4358;
color: #e03a56;
background-color: #fff;
border-radius: 40px;
border: none;
}

#profile-friends section#find-friends .control-group input {
	background-color: var(--bg-dark);
	border-radius: 25px;
	border: solid var(--main) 1px;
	color: var(--main);
}
#profile-friends ul.friends li .body button, #profile-friends ul.results li .body button {
	border-radius: 25px;
		border: solid var(--main) 1px;
		background-color: var(--bg-dark);
}
.pure-form label {
		color: var(--main);
			text-shadow: 0 0 5px #bf4358;
	}

body#root-page-mobile header#pageheader #profile-extended {
	background-color: var(--bg-dark);

}
#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .username a {
		text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}

#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message{
	color: #808080;
}
#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message a, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message a {
	color: #edac42;
	font-weight: bold;
}
.icon-crown:before, .icon-users:before, #mobile-page #profile-page .section-top .progression .xp .symbol, #mobile-page #profile-page .section-top .progression .gold i.sprite-icon_gold_dark  {
	color: #bf4358;
	font-weight: 100;
}


.input-fill {
	color: var(--main);
}

#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .body {
border-radius: 25px;
}



#mobile-page #product-detail header.product-header h1 {
    color: var(--main);

}
.pure-button-secondary, a.pure-button-secondary {
		border-radius: 25px;
		border: solid var(--main) 1px;
		background-color: var(--bg-dark);
		color: rgb(224, 58, 86);
		text-shadow: rgb(191, 67, 88) 0px 0px 5px;
}


#mobile-page #product-detail header.product-header .product-creator a {
	color: #48d1f0;
	text-shadow: #489cf0 0 0 5px;
}

.pure-button-hover, .pure-button:focus, .pure-button:hover, a.pure-button:hover {
 text-shadow: 0 0 5px #bf4358;
    color: #e03a56;
}
#mobile-page #product-detail #product-purchase-link .purchase-button {
border-radius: 40px;
}

.modal-container .modal-content .pure-button-primary {
color: #e03a56;

}


.modal-container .modal-content .pure-button-primary:hover {
text-shadow: 0 0 5px #bf4358;
    color: #e03a56;
    }



/* New Game Templemate Building */
.modal-container .modal-content {
    color: #121316;
	border-radius: 25px;
	background: #111111;
	background-color: #111111;

}




/* icon */

body#root-page-mobile header#pageheader .logo .logo-image {
	background-image: url(https://i.pinimg.com/originals/a5/11/80/a51180e1d2fd6ce76281899b5afd59c0.gif);
  background-position: center;
  background-repeat: no-repeat;
}





#build-invitations #list-requests ul.thumbs li.item .game-invite {
	border-bottom-left-radius: 25px;
	border-bottom-right-radius: 25px;
}

#build-invitations #list-requests ul.thumbs li.item .game-image {
		border-top-left-radius: 25px;
	border-top-right-radius: 25px;
}
#project-list #project-builder-content #template-list ul.game-template-thumbs li.item .game-name {
			text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}

#project-list ol.builder-steps li.active .content {
	background: transparent;
}

#project-list ol.builder-steps li .content {
	background: transparent;
	border-right: none;
}


#project-list ol.builder-steps li .content:after, #project-list ol.builder-steps li .content:before {
	display: none;
}


#project-list #project-builder-content #template-list ul.game-template-thumbs li.item .game-image {
		border-radius: 25px;
}

#root-page-mobile .comments li .body {
	background-color: var(--bg-dark);
	border-radius: 25px;
		border: solid var(--main) 1px;
}

#root-page-mobile .comments li .body .arrow-left {
	display: none;
}
#root-page-mobile .comments li .body .arrow-left-border {
	display: none;
}

#root-page-mobile .comments li .header .username a {
	text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
#root-page-mobile .comments li .text {
	color: #818385;
}


.pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
	background-color: var(--bg-dark);
	border-radius: 25px;
	border:  solid #1980e0 1px;
}

#root-page-mobile .comments form>button {
		border-radius: 25px;
		border: solid var(--main) 1px;
		background-color: var(--bg-dark);
}





/* glows n shit */
#mobile-page #profile-page .section-top .profile-meta .profile-created-date {
text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}

#mobile-page #profile-page .section-top .username h2 a {
    color: rgb(58, 189, 232) !important;
    text-shadow: rgb(43, 127, 237) 0px 0px 5px
}

#mobile-page #profile-page .section-top .username h2 {
text-shadow: 0 0 5px #bf4358;
    color: #e03a56;
}


._3TORb ._2E1AL {
	     text-shadow: 0 0 3px #ffffff;
     color: #ffffff;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item {
	background-color: transparent;
}
.icon-vintage-robot:before, .icon-cubeforce-fix:before  {
	display: none;
}
	#mobile-page #profile-page section.creations-custom .creation-list .creation-item .display-image {
		display: none;
	}

#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container {
		padding-top: 0%;
}

#mobile-page #profile-page section.creations-custom .creation-list .creation-item .display-image {
	border-radius: 25px;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption {
			color: #db515a;
				text-shadow: 0 0 5px #e82c39;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .creation-stats {
		color: #3abde8;
		text-shadow: 0 0 5px #2b7fed;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption-container {
background-color: rgba(0,0,0,.3);
		visibility: visible;
	border: solid var(--main) 1px;
	border-radius: 10px;
	opacity: unset;
	position: unset;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container  {
	display: none;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container .inner {
	border: none;
}
/* blocked users */

.btn {
background-color: #fff;
text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
a {
color: hsl(175.82deg 48.9% 60.75%);
    text-shadow: 0 0 5px #f100eb9e;
 text-decoration: none
}
a:hover {
    color: #0fb5ff
}

#project-list #project-builder-content h4 {
color: #e82c39;
}

._3TORb ._1lvYU ._1taAL p._3zDi- {

	     text-shadow: 0 0 3px #34cd63;
color: var(--main);
}

#mobile-page #profile-page section.creations-custom .section-description .description-container .text {
		     text-shadow: 0 0 3px #707d7b;
     color: #3abde8;
}

._3TORb ._2E1AL ._4RanE {
		   text-shadow: 0 0 1px #496fc9;
 color: #3abde8;
}

#mobile-page #profile-page .section-top .progression .progression-item .data {
	   text-shadow: 0 0 1px #7bb08b;
 color: var(--main);
}

body#root-page-mobile header#pageheader #profile-extended .username {
background-color: var(--bg-dark);
text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
body#root-page-mobile header#pageheader #profile-extended .user-credits {
background-color: var(--bg-dark);
border: none;
box-shadow: none;
}
body#root-page-mobile header#pageheader #profile-extended .profile-links .arrow-top {
display: none;
}
body#root-page-mobile header#pageheader #profile-extended .profile-links .arrow-top-border {
display: none;
}


body#root-page-mobile header#pageheader #profile-extended .username small {
		text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
.zUJzi .o_DA6 .uwn5j ._3DYYr ._28mON header {
		     text-shadow: 0 0 1px #7bb08b;
 color: var(--main);
 border-right: none;
}

.zUJzi .o_DA6 .uwn5j {
border: none;
}

.uwn5j ._3DYYr ._1j2Cd {
	display: none;
}


#profile-news-feed ul.news-feed-thumbs>li.item .feed-comments .comments .paging .paginator a {
	  color: var(--main);
}

/* Purchase Confirmation */

#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content {
	border-radius: 25px;
	background-color: var(--bg-dark);
}

#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content .transaction-message {
	color: var(--tmain);
}

#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content .gold {
	    color: rgb(58, 189, 232) !important;
    text-shadow: rgb(43, 127, 237) 0px 0px 5px
}

/* Username Change Confirmation */

#mobile-page #profile-username .modal-content {
		border:  solid #1980e0 1px;
			border-radius: 25px;
	background-color: var(--bg-dark);

}

.modal-container .modal-content .x {
	background-color: transparent;
}

#mobile-page #profile-username button.confirm-button .price, #mobile-page #profile-username button.purchase-button .price {
		    color: rgb(58, 189, 232) !important;
    text-shadow: rgb(43, 127, 237) 0px 0px 5px
}

.modal-container .modal-content h3, .modal-container .modal-content h4 {
	color: rgb(219, 81, 90);
    text-shadow: rgb(232, 44, 57) 0px 0px 5px;
}

#mobile-page #profile-username .username-change-info ul li {
	color: var(--tmain);
}


.modal-container .modal-content {
	 	color: rgb(219, 81, 90);
    text-shadow: rgb(232, 44, 57) 0px 0px 5;
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

footer #footer-links  {
display: none;
}


#root-page-mobile .comments li .header .comments-menu-button-container .comments-menu-button .comment-menu-types {
background-color: var(--bg-dark);
border-radius: 25px;
}

}`)

// hide stuff
var link = document.querySelector('a[href="/subscription/subscribe/"]');

link.style.display = 'none';


var link2 = document.querySelector('a[href="/help/parents/"]');

link2.style.display = 'none';

var link3 = document.querySelector('a[href="/help/privacy-policy/"]');

link3.style.display = 'none';

var link4 = document.querySelector('a[href="/help/terms-and-conditions/"]');

link4.style.display = 'none';

var link5 = document.querySelector('a[href="/subscription/subscribe/"]');

link5.style.display = 'none';

var link6 = document.querySelector('a[href="/purchase/"]');

link6.style.display = 'none';


// console warn

const ConsoleStyle = Object.freeze({
    HEADING: "background-color:#d25858;font-size:70px;font-weight:bold;color:white;",
    NORMAL : "font-size:20px;",
    URGENT : "font-size:25px;font-weight:bold;color:red;"
});


        console.log(`%c Chill, Cowboy! `,    ConsoleStyle.HEADING);
        console.log("%c" + "If someone told you to copy/paste something here, it's likely you're being scammed.",     ConsoleStyle.NORMAL);
        console.log("%c" + "Pasting anything in here could give attackers access to your KoGaMa account.",    ConsoleStyle.URGENT);
        console.log("%c" + "Unless you know exactly what you're doing, close this window and stay safe.",  ConsoleStyle.NORMAL);
        console.log("%c" + "You might want to consider reporting the user who told you to open it.", ConsoleStyle.NORMAL);

