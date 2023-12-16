// ==UserScript==
// @name         KoGaMa: Celestify Theme V2
// @namespace    github.com/2facvd
// @version       2.1
// @description  A personal KoGaMa Theme.
// @author       Awxi, Aoxu, Simon
// @match       https://*.kogama.com/*
// @match       https://kogama.com.br/*
// @icon        https://i.pinimg.com/564x/1b/e3/a6/1be3a6045b79857f195b9419e8423cc7.jpg
// @supportURL  https://discord.gg/fUC9xhbVud
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @require     https://unpkg.com/socket.io-client@4.6.0/dist/socket.io.min.js#sha256-BAHeM3AfHK0W7PlSiZ0jmQtkN9CltzNVJO32vfuTJUI=
// @connect     kogama-typing-indicator-server.glitch.me
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_addStyle
// @noframes
// @sandbox     DOM
// @license     MIT
// ==/UserScript==



// Usage and implementation of "IS_TYPING_INDICATOR" has been allowed by Awxi, huge thanks <3
// I'm grateful for all the help I got and still am getting while developing my themes and creations.


function createUpdateBox() {
  var box = document.createElement('div');
  box.id = 'update-box';
  box.innerHTML = '<p>A new version of the script is available. Please <a id="update-link" href="#">update</a>!</p>';

  document.body.appendChild(box);

  var updateLink = document.getElementById('update-link');
  updateLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'https://greasyfork.org/en/scripts/470691-kogama-celestify-theme';
  });
}

function compareVersions(version1, version2) {
  // Function to convert the version string in the "2.0V" format to a numeric representation
  function versionToNumeric(version) {
    const numericPart = version.replace(/[^\d.]/g, '');
    return parseFloat(numericPart);
  }

  const numVersion1 = versionToNumeric(version1);
  const numVersion2 = versionToNumeric(version2);

  return numVersion1 - numVersion2;
}

function fetchVersion() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://greasyfork.org/en/scripts/470691-kogama-celestify-theme',
    onload: function(response) {
      var html = response.responseText;
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var versionElement = doc.querySelector('.script-show-version + dd span');
      if (!versionElement) {
        console.log('Error: Version element not found on Greasy Fork page.');
        return;
      }
      var latestVersion = versionElement.textContent.trim();

      // Compare the latest version with the user's version
      var userVersion = GM_info.script.version;

      console.log('Latest version:', latestVersion);
      console.log('User version:', userVersion);

      var versionComparisonResult = compareVersions(latestVersion, userVersion);
      var isUpdateAvailable = versionComparisonResult !== 0;

      console.log('Update available:', isUpdateAvailable);

      if (isUpdateAvailable) {
        createUpdateBox();
      }
    }
  });

}
// Execute the version check
fetchVersion();
// Style the update notification box
GM_addStyle(`
  #update-box {
    position: fixed;
    top: 30px;
    left: 740px;
    background: #171717;
    padding: 8px;
    justify-content: center;
    border: 1px solid #c43333;
    box-shadow: 0 0 5px #fff;
    border-radius: 25px;
    z-index: 999999;
    color: #cfbd8f;
    font-size: 14px;
    font-family: Arial, sans-serif;
  }
`);



    // Function to inject CSS code
    function injectCSS(cssCode) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(cssCode));
        document.head.appendChild(style);
    }

    var cssCode = `

@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');
@import url('https://fonts.cdnfonts.com/css/anurati');

    * {
  font-family: 'Comfortaa', cursive;
    }

       ::-webkit-scrollbar {
    width: 1px !important;
}
::-webkit-scrollbar-thumb {

    border-radius: 1px;
}
body#root-page-mobile {
    background-image: url('https://i.imgur.com/GT970Ka.png'); /* Replace 'your-image-url.jpg' with your desired image URL */
    background-repeat: repeat-x;
    line-height: 1;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
    z-index:99999;
    background-color: none;
}
body {
  background-image: url('https://i.imgur.com/GT970Ka.png');
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}
#content-container{
  background-image: url("https://i.imgur.com/GT970Ka.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}
body#root-page-mobile header#pageheader .pageheader-inner {
  background-image: url("https://i.imgur.com/GT970Ka.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
 overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease, height 0.5s ease;
}
body#root-page-mobile header#pageheader:hover .pageheader-inner {
  max-height: 200px;
}

#root-page-mobile #header-notify-toggle #notify .container {
  z-index: 9999;
}

body#root-page-mobile header#pageheader #meta-nav>li.profile-notify .header-icon-count {
display: none;
}

body#root-page-mobile header#pageheader #meta-nav>li.profile-notify .clickable-area {
display: none;
}

body#root-page-mobile header#pageheader {
    background-image: url('https://i.imgur.com/GT970Ka.png'); /* Replace 'your-image-url.jpg' with your desired image URL */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.eMhLna {
display: none;
}

#react-ingame-mini-profile {
display: none;
}
.ad-leaderboard {
display: none;
}

#mobile-page #game-play section.more-games .games-list {
display: none;
}
#google_center_div {
 display: none;

 }
.gwd-div-47at {
display: none;
}
.gwd-page-container {
display: none;
}
#mobile-page #game-play section.title h1 {

justify-content: center;

position: relative;
}
#mobile-page #profile-username .modal-content {
 background-color: #b8a1f38c;
  border-radius: 25px;

}

.modal-container .modal-content h3, .modal-container .modal-content h4 {
display: none;
}

.modal-container .modal-content .pure-button-primary {
position: relative;
left: 100px;
top: 15px;

}
.modal-container .modal-content .x {
background-color: transparent;
}

#mobile-page #game-play .creator-stats-container {
position: relative;

}
#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text {
color: #fc95a1;
text-shadow: 0 0 3px #f00;
font-size: 1rem;

}
#profile-news-feed ul.news-feed-thumbs>li.item.badge_earned .feed-header .title {
color: #6417ff;
}

.i-amphtml-layout-size-defined .i-amphtml-fill-content {
display: none;
}
#profile-news-feed ul.news-feed-thumbs>li.item a.feed-destroy {
top: 20px;
right: 35px;
background-color: transparent;
box-shadow: 0 0 2px #fff;
border-radius: 25px;
}

#like .like-count {
background-color: transparent;
color: #282828;
position: static;

}

#like .like-liked button {
color: #2f2f2f;
    background-color: #8a72c7b5;
    text-shadow: none;



}


#report-button-container #report-button {
right: 2px;

}
/* logo */
body#root-page-mobile header#pageheader .logo .logo-image { background-image: url('https://i.imgur.com/9VERHkQ.png'); }
#mobile-page #profile-page .creations-feed section.creations-custom #block-profile-button-container, #mobile-page #profile-page .creations-feed section.creations-custom #report-button-container {
right: 100px;
position: relative;

}

#region-selector #region-selector-regions header { display: none; }
#region-selector #region-selector-regions ul.regions li.region:last-child  { display: none; }
#region-selector #region-selector-regions .exit { display: none; }
#region-selector #region-selector-regions {
position: relative;
background-color: #ab6bd51a;
bottom: 0px!important;
left: 5px!important;
}


#mobile-page .content-content {

top: 16px;
}


#mobile-page #profile-page .section-top .section-friend-request #friend-request .button-switch2 button, #mobile-page #profile-page .section-top .section-friend-request #friend-request a {
position: relative;
right: 500px;
}

.pure-form legend {
color:  #5b467d;
text-shadow: 0 0 2px #a184d1;
}

#react-share-button {
display: none;
}

#mobile-page #profile-edit form .birthday-form .select {
background-color: transparent;
}
#mobile-page #profile-edit form .birthday-form .select select {
    background-color: #ab8ff170;

}

  .zUJzi
  {
    height: 40px;
  width: 500px;
    transition: height 0.3s;

  }
.eekjZi { background-color:transparent!important; }

  .zUJzi:hover
  {
  height: 400px;
  width: 500px;
       transition: height 0.3s;
    backdrop-filter: blur(10px);
  }

.uwn5j ._3DYYr ._1j2Cd {
display: none;
}
/* Huge MVP to Awoi */

::placeholder { opacity: 0; }

#chat-extended-side textarea::placeholder { opacity: 0; }

#mobile-page textarea::placeholder { opacity: 0; }

#mobile-page-content textarea::placeholder { opacity: 0; }

#like .like-liked .like-count {
background-color: transparent;
}


#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .username a:hover {
color: #77bbe0;



}
.MuiChip-root {
background-color: #231835!important;

}
.MuiPaper-root {


background-color: #5f338500!important;

}

._4L7Bw ._2egay .bFLcC .IlgbI._1KvPc {

color: #8d5cc7cf;
text-shadow: 0 0 1px #795091;
}


._4L7Bw ._2egay .bFLcC._13LmU {
    background-color: rgb(247 95 215 / 10%)!important;
    border: 2px solid #f141ff;
    border-radius: 8px!important;
}


._4L7Bw .OrD8e .h9ed_._1MbYD, ._4L7Bw .OrD8e .h9ed_._1MbYD:hover {
    background-color: #57447d;
}

#root-page-mobile .comments li .body:hover {
background: #caadef6e;
}

.uwn5j ._3DYYr ._28mON header {
color: #aeb3ff;
text-shadow: 0 0 4px #3772e3;


}

._375XK .F3PyX ._2XzvN {

color: #cbaa68;
text-shadow: 0 0 3px #ffad0a;


}

#unity {
background-color: transparent;
}

#mobile-page #game-play section.more-games .more-games-link a {
    color: hsl(249.75deg 56.15% 64.43% / 80%);
    font-weight: 700;
    text-shadow: 0 0 1px #fff;
}

#unity #unity-player-container-wrapper.webgl #unity-player-container {
    background-color: transparent;
}

#unity #unity-player-container-wrapper.webgl .loader-animation {
display: none;
}



#unity #webgl-progress-container .webgl-progress-wrapper .webgl-progress {
display: none;
}
#unity #webgl-progress-container {
display: none;
}


#unity #unity-player-container-wrapper.standalone .standalone-wrapper .game-image-container .game-image { backdrop-filter: blur(10px); }
body#root-page-mobile header#pageheader #profile-extended {
  background-image: url("https://wallpapercave.com/wp/wp4504931.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  opacity: 0.7;
  backdrop-filter: blur(10px);

  }
body#root-page-mobile header#pageheader #profile-extended .profile-links a:hover {
    color: #6359e5;
}


body#root-page-mobile header#pageheader #profile-extended .username {
background-color: transparent;
border: none;
}

body#root-page-mobile header#pageheader #profile-extended .user-credits {
background-color: transparent;
border: none;

}


#profile-friends ul.friends li .body button, #profile-friends ul.results li .body button {

color: #d364c5!important;
    background-color: #725699a6!important;
    border-radius: 25px;
    box-shadow: 0 0 10px #fc7cc9;





}

#profile-friends ul.friends li .body .username, #profile-friends ul.results li .body .username {

color: #7d5eb5;
text-shadow: 0 0 5px #5900ff;
}





/* profile */
body#root-page-mobile header#pageheader #meta-nav>li.xp-level a {
 width: 40px;

}
.xp-bar .xp-text {
display: none;
}
	/* badges */
#mobile-page #profile-page .section-top .profile-badges {
	display: none;
}
.icon-cubes:before {
display:none;
}
._3TORb ._1lvYU ._1Dx5s button.WXeh0 {
 background-color: #b39bd5;
 box-shadow: 0 0 2px #fff;
 }
 ._3TORb ._1lvYU ._1Dx5s button {

     font-size: 1em;
 }
 ._3TORb ._1lvYU ._1taAL p._40qZj.PTP5j {
     color: #b9a8e9;
     text-shadow: 0 0 2px #fff;
 }
.icon-gamepad:before {
display: none;
}
.pure-button-secondary, a.pure-button-secondary {
background-color: hsl(298.38deg 35.56% 83.12% / 46%);
padding: 1px 5px;
border-radius: 25px;

}

#root-page-mobile .comments li .header .comments-menu-button-container .comments-menu-button .comment-menu-types {
    background-color: #a288b3;
    border-radius: 25px;
}
 	/* banner size */
#mobile-page #profile-page .section-top {
	height: 380px;
	background-image: url('https://wallpapercave.com/wp/wp4504931.png');
	  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
	/* center profile  */
#mobile-page #profile-page .section-top .profile-badges {
visibility: hidden;
}
#root-page-mobile .comments li .body {
     color: #ffffff;
    background: #caadef6e;
    border-radius: 25px;
    text-shadow: 0 0 2px #fff;

 }
 .zUJzi {
	border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border:none;

 }
 body#root-page-mobile header#pageheader nav.menu {
position: relative;
 left: 780px;
 }

  .zUJzi:hover {
  background-color: #9195f154;

  }
  ._375XK ._2XaOw ._1j2Cd._1Xzzq p {

  background-color: #b599ff;
    color: #9b246a;

    }
    ._375XK ._2XaOw ._1j2Cd p {
color: #e7ac61;
    background-color: #6b5683;
box-shadow: 0 0 7px rgb(223 107 166);

}
._375XK {
background-color: transparent;
}
  ._375XK textarea {
    text-shadow: 0 0 2px #0060ff;
    color: #50d8ef;
    background-color: #9195f154;
    border: none;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    }
._375XK .F3PyX {
border: none;
 background-color: #9195f154;
 border-top-right-radius: 25px;
}
._375XK ._2XaOw {
border: none;
 background-color: #9195f154;
 }
.zUJzi .o_DA6 .uwn5j ._3DYYr:hover {
  background-color: #9195f154;

  }
.zUJzi .o_DA6 .uwn5j {
border-top-left-radius: 25px;
border: none;
}
.zUJzi .o_DA6 .uwn5j ._3DYYr._2dPu4 {
border-top-left-radius: 25px;

border-left: 2px solid #9676e3;
}
.uwn5j {
background-color: #9195f154;

}

.zUJzi .o_DA6 .uwn5j ._3DYYr._2dPu4:hover {
background-color: #9195f154!important;
}



.pure-button-success, a.pure-button-success {
    color: #d364c5!important;
    background-color: #725699a6!important;
}



#mobile-page #profile-avatar-list .avatar-list .item .avatar-image {
box-shadow: 0 0 5px #6005f2;
}


#mobile-page #profile-avatar-list section.create-avatar-info {
background-image: none!important;
background-color: transparent;
box-shadow: -1px 4px 3px -2px rgb(147 0 255 / 47%);
}

#coupon-reward .modal-content { background-image: none!important; background-color: #836fff91; border-radius: 25px; border: 1px solid #5f00ffd4; }
#mobile-page #profile-friend-list section.friends .friend-list .friend-item .friend-name { font-family: 'Comfortaa', cursive; color: #cf93ed; text-shadow: 0 0 7px #aa00ff; }







 #root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .username a {
 color: #f9c4ff96;
 }
 #root-page-mobile .comments li .body .arrow-left-border {
 display: none;
}
#root-page-mobile .comments li .body .arrow-left {
display: none;
}
#root-page-mobile .comments li .header .username a {
    color: #e587fb94;
    }
#mobile-page #profile-page .section-top .username {
    margin-top: 140px;
    margin-left: 650px;
    }
   #mobile-page #profile-page .section-top .progression {
    clear: none;
    padding: 0;
    background-color: transparent;
    margin-top: 10px;
    padding-left: 640px;
    }
.ads-display .ads-label {
display: none;
}
.UA3TP._2bUqU {
    transform: scale(6);
    left: 520px;
    top: 160px;
}
    #mobile-page #profile-page .section-top .profile-meta .profile-created-date {
    	right: 515px;
    	position: relative;
    	font-size: 1.3rem;
    }
.pure-button-primary, .pure-button-selected, a.pure-button-primary, a.pure-button-selected {
background-color: #9393c1;
text-shadow: 0 0 2px #fff;
border-radius: 25px;


}
    #root-page-mobile #chat-extended-side {
    	height: 100%;
    }

    #mobile-page #profile-page .creations-feed section.creations-custom .section-description {
    	  width: 1000px;
    right: 600px;

    }
  #mobile-page #profile-page .section-top .section-share {
  display: none;
  }

    #mobile-page #profile-page .section-top .username h1 a {
        color: hsl(260.83deg 59.47% 69.28% / 83%);
        text-shadow: 0 0 2px #fff;
        }
#mobile-page #profile-page .section-top .progression .progression-item .symbol {

color: hsl(260.83deg 59.47% 69.28% / 83%);
}

#mobile-page #profile-page .section-top .progression .progression-item .data {
    color: hsl(294.06deg 36.23% 81.71% / 83%);

}
.paging {
     position: relative;
    z-index: 9999;
    color: #9690e0;
    }
.MuiSnackbar-root {
display: none;
}
.paging .paginator li a {
    color: #9690e0;
}
#profile-news-feed ul.news-feed-thumbs>li.item {
box-shadow: 0 0 3px #b47aff;
background-color: hsl(226.38deg 34.08% 70.36% / 58%);
    color: rgb(249 249 249 / 67%);
    border-radius: 25px;

}
#mobile-page #profile-page .section-top .profile-meta .profile-created-date {

    color: rgb(74 88 193 / 50%);
    text-shadow: 0 0 2px #fff;
}
    #profile-news-feed ul.news-feed-thumbs>li.item {
    padding:  10px 10px;
    top: 50px;
    position: relative;
     backdrop-filter: blur(10px);
    }
    .pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
           border-radius: 25px;
           background-color: #9c91b9ba;
           color: #fff;

    }




body#root-page-mobile header#pagesubheader .submenu-container {
position: relative;
left: 670px;
top: 40px;


}

body#root-page-mobile header#pagesubheader ul.submenu>li a {
text-shadow: 0 0 5px #fff;
font-weight: 100;

}

#mobile-page .content-shop .carousel-shop-list .shop-item {
box-shadow: 0 0 10px #fff;
}


    #mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container {
     max-height: 110px;
    }



#mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container .text {
  max-height: 70px;

}


.pure-form input[type=color]:focus,
.pure-form input[type=date]:focus,
.pure-form input[type=datetime-local]:focus,
.pure-form input[type=datetime]:focus,
.pure-form input[type=email]:focus,
.pure-form input[type=month]:focus,
.pure-form input[type=number]:focus,
.pure-form input[type=password]:focus,
.pure-form input[type=search]:focus,
.pure-form input[type=tel]:focus,
.pure-form input[type=text]:focus,
.pure-form input[type=time]:focus,
.pure-form input[type=url]:focus,
.pure-form input[type=week]:focus,
.pure-form select:focus,
.pure-form textarea:focus {
    border: none;
    background-color: #9c91b9ba !important;
}
.pure-form input[type=color]:focus, .pure-form input[type=date]:focus, .pure-form input[type=datetime-local]:focus, .pure-form input[type=datetime]:focus, .pure-form input[type=email]:focus, .pure-form input[type=month]:focus, .pure-form input[type=number]:focus, .pure-form input[type=password]:focus, .pure-form input[type=search]:focus, .pure-form input[type=tel]:focus, .pure-form input[type=text]:focus, .pure-form input[type=time]:focus, .pure-form input[type=url]:focus, .pure-form input[type=week]:focus, .pure-form select:focus, .pure-form textarea:focus {
   border: none;
    background-color: #9c91b9ba !important;

}

#root-page-mobile #profile-news-feed .feed-comments .comments form textarea {

    background-color: #9c91b9ba !important;
}
    #profile-status-update form.status-message textarea {
    top: 30px;
      position: relative;
    }
    .MuiSnackbarContent-root {
    display: none!important;
    }
    #profile-status-update .button-wrapper button {

    top: 30px;
      position: relative;
      }

    #mobile-page #profile-page .creations-feed section.news-feed {
    	top: 180px;
    	left: 350px;
    	position: relative;
    }
    #mobile-page #profile-page .creations-feed section.creations-custom .creation-list {
    	display: none;
    }


#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .body {
color: #c3d9e3;
text-shadow: 0 0 2px #fff;

}
#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
    color: #aeb9f5;
 text-shadow: 0 0 3px #d075f1;
    }
#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message {
text-shadow: 0 0 1px #fff;
}
#mobile-page #profile-page .section-top .username h1 {


color: hsl(282.98deg 100% 78.49% / 80%);
    text-shadow: 0px 0px 4px rgb(198 129 241 / 79%);

}
._3zDi- {
font-family: 'Comfortaa', cursive;
  font-size: 16px;
  background-image: linear-gradient(to right, #b797e8, #6b68b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-animations 2000s linear infinite;
  transition: -webkit-background-clip 0.3s, -webkit-text-fill-color 0.3s; /* Add transition */
}

/* Add the glow effect on hover using a pseudo-element */
._3zDi-:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #61c5ff;
  z-index: -1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes rainbow-animations {
  to {
    background-position: 4500vh;
  }
}
#mobile-page #game-play section.more-games .more-games-link a {
display: none;
}
._3TORb ._1lvYU ._1taAL p._40qZj {
color: #da93ff;
text-shadow: 0 0 1px #fff;

}
#game-comments-container {
position: relative!important;
left: 70px;
}
#kogama_rectangle {
display: none;
}
.pure-button-warning, a.pure-button-warning {
border-radius: 25px;
background-color: #af66ed;

}

.username-change-info {
display: none;
}
#mobile-page #profile-username  {

position: relative;
top: 300px;
left: 120px;


}

#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .body:hover , #root-page-mobile .comments li .header {

color: #77bbe0;

}

.bNeCkQ { display: none!important; }
.eywwGo { display: none!important; }
.ktnQVV p { display: none!important; }
.eWsFAv  { color: rgb(236 175 255)!important; }
.jbqImD { border-radius: 25px; }
.itriDf { border-radius: 25px!important; background-color: rgb(50 49 51 / 52%)!important;  }
.xfGzO { border-radius: 25px!important; background-color: rgb(238 188 255 / 27%)!important; border: 2px solid rgb(199 5 247)!important;    color: rgb(255 255 255)!important; text-shadow: 0 0 3px #fff; }
.fHrmiR { color: rgb(255 84 84)!important; }
.kjMmUz { background-color: rgb(142 87 195 / 56%)!important; box-shadow: none!important; border-radius: 25px!important;  }






#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .time {
text-shadow: none;
color: #798ba8;
}

#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .body:hover .username a {
    color: #2dd3e5;
}
._3TORb ._2E1AL ._4RanE {


 color: #f0d3f1;
 text-shadow: 0 0 2px #fff;

 }
.pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
text-shadow: 0 0 2px #fff;
}
    /* dms */

._3TORb {
  position: relative;
  background: transparent;
  right: -70%; /* Start position outside the screen */
  transition: right 0.3s ease-in-out;
}

._3TORb:hover {
  right: 0; /* Slide in from the right */
}


/* fk off annoying popup */
.MuiSnackbar-anchorOriginBottomRight {
	display: none;
}

/* cringe footers */

footer #footer-links, footer #footer-about, footer #footer-company, footer #footer-header {
	display: none;
}

#mobile-page #profile-levels section.learn { display: none;}
#mobile-page #profile-levels section.user-progress .level-progress-container .level-progress .level-progress-fullfil {
background-color: #aaadef;
background-image: linear-gradient(45deg,hsl(215.83deg 100% 50% / 10%) 25%,#7993cf 0,transparent 50%,hsla(0,0%,100%,.1) 0,hsla(0,0%,100%,.1) 75%,transparent 0,transparent)!imporant;
box-shadow: 1px 1px 6px 0 rgba(0,0,0,.15), 4px 0 6px -2px rgb(0 39 230 / 80%);
}

#mobile-page #profile-levels section.user-progress {
background-color: rgb(105 100 121 / 20%);
border-radius: 16px;
box-shadow: 0 3px 3px -2px rgb(89 131 229 / 77%);
position: relative;
top: 250px;
}

#mobile-page #profile-levels section.levels { position: relative; top: 300px; opacity: 0.6; transition: 0.5s;  }
#mobile-page #profile-levels section.levels:hover {  opacity: 1; transition: 0.5s;  }
body#root-page-mobile header#pagesubheader .submenu-container.no-menu { display: none; }

















    `;

    // JAVASCRIPT FUNCS.


        // Function to check if the zoom level is set to 90%
    function checkZoomLevel() {
        var currentZoom = window.devicePixelRatio * 100;

        if (currentZoom !== 90) {
            var userPrompted = GM_getValue('zoomPrompted', false);

            if (!userPrompted) {
                var confirmZoom = confirm('To optimize your viewing experience, please zoom to 90%. Do you want to zoom now?');

                if (confirmZoom) {
                    // Set zoom level to 90%
                    document.body.style.zoom = '90%';
                }

                GM_setValue('zoomPrompted', true);
            }
        }
    }

(function() {
   var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
})();

    function addCopyButtonToBio() {
        const bioHeader = document.querySelector('.description-container h2.header');
        if (!bioHeader) return;

        const bioText = document.querySelector('.description-container .text');
        if (!bioText) return;

        const imgurImageUrl = 'https://i.imgur.com/KvzzqBF.png';

        const copyButton = createImgurButton(imgurImageUrl, function() {
            const textToCopy = bioText.innerText;
            copyToClipboard(textToCopy);
            showNotification('Bio copied successfully!');
        });

        bioHeader.appendChild(copyButton);

    }


function createImgurButton(imgurImageUrl, clickAction) {
  const copyButton = document.createElement('img');
  copyButton.src = imgurImageUrl;
  copyButton.style.width = '24px';
  copyButton.style.height = '24px';
  copyButton.style.marginRight = '10px';
    copyButton.style.marginLeft = '10px';
  copyButton.style.cursor = 'pointer';
  copyButton.style.verticalAlign = 'middle';

  // Add CSS transition to make the button animate on hover
  copyButton.style.transition = 'transform 0.3s, opacity 0.3s';
  copyButton.style.transformOrigin = 'center';
  copyButton.style.opacity = '1';

  copyButton.addEventListener('click', clickAction);

  // Add event listeners for hover animation
  copyButton.addEventListener('mouseover', () => {
    copyButton.style.transform = 'scale(1.2)';
  });

  copyButton.addEventListener('mouseout', () => {
    copyButton.style.transform = 'scale(1)';
  });

  return copyButton;
}

    function copyToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '10px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '8px 16px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '9999';
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 2000);
    }

    addCopyButtonToBio();


(function() {
    var disableBeforeInstallPrompt = function(event) {
        event.preventDefault();
    };

    window.onbeforeinstallprompt = disableBeforeInstallPrompt;
})();

    // Callback of all the functions
    injectCSS(cssCode);
    checkZoomLevel();






    document.querySelector('a[href="/videos/"]').style.display = 'none';
    document.querySelector('a[href="/subscription/subscribe/"]').style.display = 'none';
    document.querySelector('a[href="/purchase/"]').style.display = 'none';
    document.querySelector('a[href="/news/"]').style.display = 'none';
    document.querySelector('a[href="/news/"]').style.display = 'none';
    document.querySelector('a[href="/leaderboard/"]').style.display = 'none';



{setTimeout(() => {
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
}, "1000")
}

var storageclean = "text-shadow: 1px 1px 2px blue, 0 0 1em purple, 0 0 0.2em purple; font-size: 15px; font-family: Comfortaa, cursive";
setTimeout(function() {
  console.log('%clocalStorage has been cleaned', storageclean);
}, 1200);


    var starButton = document.createElement("button");
    starButton.className = "star-button";
    starButton.innerHTML = "&#9734;";


    starButton.style.position = "fixed";
    starButton.style.bottom = "10px";
    starButton.style.right = "140px";
    starButton.style.width = "40px";
    starButton.style.height = "40px";
    starButton.style.backgroundColor = "rgba(165, 116, 209, 0.22)";
    starButton.style.border = "none";
    starButton.style.borderRadius = "50%";
    starButton.style.boxShadow = "0 0 5px #c87ef2";
    starButton.style.color = "#8babd9";
    starButton.style.fontSize = "20px";
    starButton.style.fontWeight = "bold";
    starButton.style.cursor = "pointer";
    starButton.style.zIndex = "9999";
    starButton.style.display = "flex";
    starButton.style.alignItems = "center";
    starButton.style.justifyContent = "center";

    // Add click event listener to the star button
    starButton.addEventListener("click", function() {
        // Create the dark overlay element
        var overlayElement = document.createElement("div");
        overlayElement.className = "overlay";
        overlayElement.style.position = "fixed";
        overlayElement.style.top = "0";
        overlayElement.style.left = "0";
        overlayElement.style.width = "100%";
        overlayElement.style.height = "100%";
        overlayElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlayElement.style.backdropFilter = "blur(3px)";
        overlayElement.style.zIndex = "9998";

        // Create the new element (div box)
        var newElement = document.createElement("div");
        newElement.className = "new-element";
        newElement.style.position = "fixed";
        newElement.style.top = "50%";
        newElement.style.left = "50%";
        newElement.style.transform = "translate(-50%, -50%)";
        newElement.style.width = "700px";
        newElement.style.height = "530px";
        newElement.style.backgroundColor = "rgb(138 109 255 / 29%)";
        newElement.style.border = "1px solid #711d82";
        newElement.style.boxShadow = "0 0 10px #8970db";
        newElement.style.zIndex = "9999";
        newElement.style.backdropFilter = "blur(5px)";
        newElement.style.borderRadius = "25px";

        // Create the text container

        var textContainer = document.createElement("div");

        textContainer.className = "text-container";
        textContainer.innerHTML = `
        <b>UPDATES</b><br><br>
        · (Contributors) Exchanged profile credits for badges. <br>
        · (Contributors) Custom description glow. <br>
        · Edited Leaderboard style.  <br>
        · Quality of life update.  <br>
        · Fixed usercreation menu on contributor profiles.  <br>
        · PreviewUsername Updated Version. <br>
        · Further code-side improvemenets for myself. <br>
        <br><br>

        <b>Future Plans</b><br><br>

        📚 Friend Custom Username <br>
        👻 Fixing color scheme to make text more visible and less eye threatening <br>
        💌 Translation Plugin (Still In-development) <br><br>




        <b>CREDITS</b><br><br>
        ❤ Huge thank you to everyone that keeps supporting me during the development of this theme, seriously, love you ❤. <br>
        For this patch release once again I ought to thank Awxi for developing IS_TYPING_INDICATOR and being a supportive friend.<br>
        I also want to show my gratitude towards Raptor, Aoxu and Xumor who helped me to test it all and make sure it's hard to break! <br><br><br>
         <b><a href="https://discord.gg/fUC9xhbVud" target="_blank">
    <img src="https://i.imgur.com/wEKK7rk.png" alt="Support Server" class="discord-image">
  </a></b>
`;

textContainer.style.padding = "20px";
textContainer.style.fontFamily = "Comfortaa, cursive";

        // Create the title container
        var titleContainer = document.createElement("div");
        titleContainer.className = "title-container";
        titleContainer.innerHTML = "✨ StarLog - 2.5.6V Release";
        titleContainer.style.padding = "10px";
        titleContainer.style.fontFamily = "Comfortaa, cursive";
        titleContainer.style.fontWeight = "bold";

        // Create the X object to close the new element
        var closeButton = document.createElement("span");
        closeButton.innerHTML = "O";
        closeButton.style.position = "absolute";
        closeButton.style.top = "5px";
        closeButton.style.right = "10px";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "20px";
        closeButton.style.fontWeight = "bold";
        closeButton.style.color = "rgb(224 124 235)";
        closeButton.style.zIndex = "9999";

        // Add click event listener to the close button
        closeButton.addEventListener("click", function() {
            // Remove the new element and overlay when the close button is clicked
            overlayElement.parentNode.removeChild(overlayElement);
            newElement.parentNode.removeChild(newElement);
        });

        // Append the title container and close button to the new element
        newElement.appendChild(titleContainer);
        newElement.appendChild(closeButton);

        // Append the text container and new element to the overlay element
        newElement.appendChild(textContainer);
        overlayElement.appendChild(newElement);

        // Append the overlay element to the document body
        document.body.appendChild(overlayElement);
    });

    // Append the star button to the document body
    document.body.appendChild(starButton);

    //this is so silly lol
(function() {
    'use strict';
    // Define the additional CSS styles for spoilers (modify as needed)
    var additionalCss = `
        .spoiler-box {
            background-color: #121212;
            border-radius: 8px;
            color: red;
            padding: 5px;
            border: 1px solid #ccc;
            cursor: pointer;
        }

        .spoiler-content {
            display: none;
        }

        .spoiler-content.show {
            display: block;
            color: #799bd1;
            text-shadow: 0 0 1px #3363b0;
        }
    `;

    // Function to add Markdown formatting
    function addMarkdownFormatting(text) {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Heading 1
        text = text.replace(/# (.*?)\n/g, '<h1>$1</h1>');

        // Strikethrough
        text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');

        // Underline
        text = text.replace(/__(.*?)__/g, '<u>$1</u>');

        // Link
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, function (match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank">' + title + '</a>';
            }
        });

        // Code
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');

        // Spoiler
        text = text.replace(/\|\|(.*?)\|\|/g, '<div class="spoiler-box">Spoiler<span class="spoiler-content">$1</span></div>');

        return text;
    }

    // Function to toggle spoiler visibility
    function toggleSpoilerVisibility() {
        var spoilerContent = this.querySelector('.spoiler-content');
        if (spoilerContent) {
            spoilerContent.classList.toggle('show');
        }
    }

    // Find and format Markdown on the page
    function formatMarkdown() {
        var elements = document.querySelectorAll('body *:not(script)');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                var formattedText = addMarkdownFormatting(element.innerHTML);
                element.innerHTML = formattedText;
            }
        }

        // Attach event listener to toggle spoiler visibility on click
        var spoilerBoxes = document.getElementsByClassName('spoiler-box');
        for (var j = 0; j < spoilerBoxes.length; j++) {
            spoilerBoxes[j].addEventListener('click', toggleSpoilerVisibility);
        }
    }

    // Check for changes periodically
    function checkForChanges() {
        formatMarkdown();
        setTimeout(checkForChanges, 1000);
    }

    // Inject the additional CSS styles for spoilers
    var style = document.createElement('style');
    style.textContent = additionalCss;
    document.head.appendChild(style);

    // Run the initial formatting and continue checking for changes
    formatMarkdown();
    checkForChanges();

})();
(function() {
  'use strict';


  function addReplyOptionsToNewMessages() {
    const messageClouds = document.querySelectorAll("div._375XK ._2XaOw ._1j2Cd:not(._1Xzzq)");

    messageClouds.forEach((messageCloud, index) => {
      if (!messageCloud.classList.contains("reply-options-added")) {
        const replyButton = document.createElement("img");
        replyButton.className = "reply-button";
        replyButton.style.cursor = "pointer";
        replyButton.src = "https://i.imgur.com/PUMZG8i.png";

        const replyContainer = document.createElement("div");
        replyContainer.className = "reply-container";
        replyContainer.style.display = "none";

        replyButton.addEventListener("click", function(event) {
          event.stopPropagation();

          replyContainer.style.display = "flex";
          const quotedText = `"${messageCloud.innerText.trim()}" <- `;
          replyContainer.dataset.jumpToReply = quotedText;


          replyButton.style.display = "none";

          // Add a timeout to reset the reply button after 2 seconds
          setTimeout(() => {
            replyButton.style.display = "inline-block";
          }, 2000);

          const replyTextarea = document.querySelector(".zUJzi ._2BvOT ._375XK textarea");
          if (replyTextarea) {
            replyTextarea.value += `${quotedText}`;
          }
        });

        messageCloud.classList.add("reply-options-added");
        messageCloud.appendChild(replyButton);
        messageCloud.appendChild(replyContainer);
      }
    });
  }

  // Check for new messages periodically and attach reply buttons and jump to reply elements
  setInterval(addReplyOptionsToNewMessages, 2000);


  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .reply-button {
      display: inline-block;
      cursor: pointer;
      margin-right: 5px;
      position: relative;
      width: 16px; // Set the width to adjust the image size
      height: 16px; // Set the height to adjust the image size
      filter: brightness(0) invert(1); // Apply CSS filter to hue black to white
    }

    .reply-arrow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 14px solid #fff;
      animation: glow 1s ease-in-out infinite;
    }

    @keyframes glow {
      0% {
        opacity: 0.8;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.8;
      }
    }


  `;
  document.head.appendChild(styleTag);
    })();
(function() {
    'use strict';

    function getUserID() {
        const urlRegex = /\/profile\/(\d+)\//;
        const match = window.location.href.match(urlRegex);
        return match ? match[1] : null;
    }

    function toggleMenu() {
        const menu = document.getElementById('customMenu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

// Create the menu button
const menuButton = document.createElement('img');
menuButton.src = 'https://i.imgur.com/1qQVmnY.png';
menuButton.style.width = '40px'; // Larger width for better visibility
menuButton.style.height = '40px'; // Larger height for better visibility
menuButton.style.marginRight = '10px';
menuButton.style.cursor = 'pointer';
menuButton.style.verticalAlign = 'middle';
menuButton.style.opacity = '1'; // Make the button always visible

// Add CSS transition to make the button animate smoothly on hover and mouseout
menuButton.style.transition = 'transform 0.3s, opacity 0.3s';
menuButton.style.transformOrigin = 'center';

menuButton.addEventListener('mouseover', () => {
  menuButton.style.transform = 'scale(1.2)'; // Apply scaling effect on hover
});

menuButton.addEventListener('mouseout', () => {
  menuButton.style.transform = 'scale(1)'; // Remove scaling effect when not hovered
});

    // Create the menu container
    const menuContainer = document.createElement('div');
    menuContainer.id = 'customMenu';
    menuContainer.style.position = 'absolute';
    menuContainer.style.top = '40px';
    menuContainer.style.left = '0';
    menuContainer.style.backgroundColor = 'rgb(40 42 47 / 26%)';
    menuContainer.style.backdropFilter = 'blur(6px)';
    menuContainer.style.padding = '5px';
    menuContainer.style.zIndex = '9999';
    menuContainer.style.border = '1px solid #7d55ab';

    menuContainer.style.borderRadius = '14px';
    menuContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    menuContainer.style.display = 'none';

    // Append the menu container to the document body
    document.body.appendChild(menuContainer);

    // Add the event listener to show/hide the menu on click
    menuContainer.addEventListener('click', () => {
        menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Add the CSS for the glowing effect on hover
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        #customMenu:hover {
            animation: glowing 1s ease infinite;
        }

        @keyframes glowing {
            0%, 100% {
                box-shadow: 0 0 10px #7d55ab;
            }
            50% {
                box-shadow: 0 0 20px #7d55ab;
            }
        }

        /* Sparkling animation on the button */
        #menuButton:hover {
            animation: sparkling 1s ease-in-out infinite;
        }

        @keyframes sparkling {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
                filter: brightness(1.3);
            }
            100% {
                transform: scale(1);
            }
        }
    `;

    // Append the style to the head of the document
    document.head.appendChild(styleElement);

    // Get the UserID from the current URL
    const userID = getUserID();

    // Create menu items with dynamic links
    const menuItems = [
        { text: 'Avatars', href: `https://www.kogama.com/profile/${userID}/avatars` },
        { text: 'Games', href: `https://www.kogama.com/profile/${userID}/games/` },
        { text: 'Models', href: `https://www.kogama.com/profile/${userID}/marketplace/model` },
        { text: 'Avatar Shop', href: `https://www.kogama.com/profile/${userID}/marketplace/` },
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.className = 'menuItem';
        menuItem.href = item.href;
        menuItem.textContent = item.text;
        menuItem.style.display = 'block';
        menuItem.style.padding = '5px';
        menuItem.style.textDecoration = 'none';
        menuItem.style.color = '#b7aec2';
        menuItem.style.zIndex = '9999999';
        menuItem.addEventListener('click', () => {
            toggleMenu();
        });
        menuContainer.appendChild(menuItem);
    });

    // Add the button and menu to the header
    const header = document.querySelector('#mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container .header');
    if (header) {
        header.appendChild(menuButton);
        header.appendChild(menuContainer);
    }

    // Hide the menu on page load
    menuContainer.style.display = 'none';

    // Show/hide the menu on button click
    menuButton.addEventListener('click', () => {
        toggleMenu();
    });
    // Resize the imgur button to 24x24 pixels
    menuButton.style.width = '26px';
    menuButton.style.height = '26px';
})();


// Time styled better by aoxu xoxo

(function() {
    'use strict';
    var clockDiv = document.createElement('div');
    clockDiv.id = 'clock24';
    clockDiv.className = 'clock24';
    document.body.appendChild(clockDiv);

    // Update the clock every second
    setInterval(updateClock, 1000);

    function updateClock() {
        var now = new Date();
        var hour = padZero(now.getHours());
        var minute = padZero(now.getMinutes());
        var day = getFormattedDay(now.getDate());
        var month = getMonthName(now.getMonth());
        var dayOfWeek = getDayOfWeek(now.getDay());

        clockDiv.innerHTML = `
            <span class="hour">${hour}:${minute}</span>
            <span class="date">${day} of ${month}</span>
            <span class="dayOfWeek">${dayOfWeek}</span>
        `;
    }

    function padZero(number) {
        return number.toString().padStart(2, '0');
    }

    function getFormattedDay(day) {
        var lastDigit = day % 10;
        var suffix = '';

        if (lastDigit === 1 && day !== 11) {
            suffix = 'st';
        } else if (lastDigit === 2 && day !== 12) {
            suffix = 'nd';
        } else if (lastDigit === 3 && day !== 13) {
            suffix = 'rd';
        } else {
            suffix = 'th';
        }

        return day + '<sup>' + suffix + '</sup>';
    }

    function getMonthName(monthIndex) {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[monthIndex];
    }

    function getDayOfWeek(dayIndex) {
        var dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayOfWeek[dayIndex];
    }

    var clockStyles = `
        #clock24 {
            position: fixed;
            top: 26px;
            left: 15px;
            width: 230px;
            transform: translateY(-50%);
            padding: 10px;
            border-radius: 25px;
            border: 0px solid #fff;
            box-shadow: rgb(255, 5, 155);
            transition: left 0.5s;
            z-index: 9999;
            display: inline-block;
        }

        #clock24:hover {
            animation: borderAnimation 5s infinite;
        }

        @keyframes borderAnimation {
            0% {
                border-color: rgb(255, 0, 0);
            }
            0.1% {
                border-color: rgb(0, 255, 0);
            }
            0.1% {
                border-color: rgb(0, 0, 255);
            }
            0.1% {
                border-color: rgb(255, 0, 0);
            }
        }

        #clock24 .hour {
            font-size: 20px;
            font-weight: bold;
            color: #f5d3ed;
            text-shadow: 0 0 4px #fff;
            display: block; /* Added to make hour span take full width */
        }

        #clock24 .date {
            font-size: 10px;
            color: #f5d3ed;
            text-shadow: 0 0 4px #fff;
            margin-top: 5px;
        }

        #clock24 .dayOfWeek {
            font-size: 10px;
            color: #f5d3ed;
            text-shadow: 0 0 4px #fff;
        }

        #clock24 .date sup {
            font-size: 10px;
        }
    `;

    var styleElement = document.createElement('style');
    styleElement.innerHTML = clockStyles;
    document.head.appendChild(styleElement);
})();
(function() {
    'use strict';

/// The following code is from KoGaMa Buddy's content script utilities file ///

// parsePageData: Accepts page body as string; Returns object with data from options.bootstrap
function parsePageData(body) {
  const firstIndex = body.indexOf("options.bootstrap = {") + 20;
  const lastIndex = body.indexOf("};", firstIndex) + 1;
  const data = body.substring(firstIndex, lastIndex);
  return JSON.parse(data);
}

// "Shim" for String.prototype.matchAll (FF67+)
function* matchAll(str, pattern) {
  let match;
  while (match = pattern.exec(str)) {
    yield match;
  }
}

// Simple debounce function
function debounce(fn, wait) {
  let timeoutID;
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(fn, wait, ...args);
  };
};

// Decode HTML entities
const htmlEntities = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#96;': '`'
};
function decodeEntities(str) {
  return str.replace(/&(?:\w+|#\d+);/g, (entity) => htmlEntities[entity] || entity);
}

/**
 * awoi's createElement function - inspired by React's createElement(), Vue's h(), and Hyperscript's h()
 * Simple implementation, minimal error checking
 * > createElement(tag: string, attributes?: object, children?: Array<HTMLElement>|string): HTMLElement
 */
function createElement(tag, ...args) {
  const [tagName, ...tagAttributeMatches] = tag.split(/(?=[\.#])/);
  const element = document.createElement(tagName);
  const tagAttributes = tagAttributeMatches.reduce((object, value) => {
    if (value[0] === ".") {
      if (!object.class) object.class = value.slice(1);
      else object.class += value.replace(".", " ");
    } else object.id = value.slice(1);
    return object;
  }, {});
  const argAttributes = (typeof args[0] === "object" && !Array.isArray(args[0]))
    ? args.shift()
    : {};
  const children = (Array.isArray(args[0]) || typeof args[0] === "string")
    ? args.shift()
    : [];
  const attributes = ({ ...tagAttributes, ...argAttributes });
  for (const name of Object.keys(attributes)) {
    if (name.startsWith("on")) {
      const event = name.slice(2).toLowerCase();
      const handler = attributes[name];
      element.addEventListener(event, handler.bind(element));
    } else {
      element.setAttribute(name, attributes[name]);
    }
  }
  typeof children === "string"
    ? element.appendChild(document.createTextNode(children))
    : element.append(...children);
  return element;
};

// retrieveCorrectScript: Retrieves the script element containing the page data
function retrieveCorrectScript() {
  return [...document.getElementsByTagName("script")]
    .find((script) => script.innerText.includes("options.bootstrap"))
    .innerText;
}

function visitKogamaTypingIndicatorServer() {
  const targetURL = "https://glitch.com/~kogama-typing-indicator-server";

  const loadingMessage = "%cLoading Indicator Socket, please be patient!";
  const loadingMessageColor = "color: #a64150;";
  console.log(loadingMessage, loadingMessageColor);

  // Check if the cookie exists
  if (document.cookie.includes("visitedKogamaTypingServer")) {
    const blueConsoleStyle = "color: #41a67d;";
    console.log("%cSocket.js kept alive! Already visited.", blueConsoleStyle);
    return; // If cookie exists, return and don't make the request
  }

  // Set the cookie to indicate the visit
  document.cookie = "visitedKogamaTypingServer=true";

  // Simulate the visit by waiting for 30 seconds
  setTimeout(function () {
    GM_xmlhttpRequest({
      method: "GET",
      url: targetURL,
      onload: function (response) {
        // The request was successful, do nothing here
      },
      onerror: function (error) {
        console.error("Error visiting the URL:", error);
      },
    });
  }, 30000); // 30 seconds

  const blueConsoleStyle = "color: #416ca6;";
  console.log("%cSocket.js kept alive! Awaiting until another visit...", blueConsoleStyle);
}

    visitKogamaTypingIndicatorServer();

    // Set a timer to visit the URL every 4 minutes(240,000 milliseconds)
    setInterval(visitKogamaTypingIndicatorServer, 240000);

    // Current class name for the chat header
const ChatHeaderClassName = "_2XzvN";
// Root elements
const contentRoot = document.getElementById("content");
const chatRoot = document.getElementById("chat-extended-side");

// Check if the user is currently logged in
const isAuthenticated = contentRoot.classList.contains("authenticated");

// Throw error to follow practice of returning early
if (!isAuthenticated) throw new Error("User is not authenticated");

// Retrieve page data
const pageData = parsePageData(retrieveCorrectScript());
// Retrieve current user's ID
const clientID = pageData.current_user.id;
// Retrieve KoGaMa server name
const server = location.hostname.match(/www|friends|br/)[0];

// Connect to socket
const socket = io("https://kogama-typing-indicator-server.glitch.me/");
// Retrieve cached map from localStorage
const cachedMapString = localStorage.getItem("username-to-id-map");
// Parse cached map
const cachedMapData = cachedMapString === null ? [] : JSON.parse(cachedMapString);
// Create and populate map using cached data
const usernameIDMap = new Map(cachedMapData);

// Subscribe to a personal room
socket.emit("subscribe", server, clientID);

// If the server is down, the socket will fail to connect
socket.once("connect_error", () => {
  // Log to console
  console.error("Server is unreachable");
  // Attempt to reconnect after 30 seconds
  setTimeout(() => socket.connect(), 30_000);
});

// Once the socket has connected to the server
socket.once("connect", () => {
  // Register event listener for input
  chatRoot.addEventListener("keypress", async (event) => {
    // Verify that the element receiving input is a textarea and that the socket is connected
    if (!event.target instanceof HTMLTextAreaElement || !socket.connected) return;
    // Retrieve friend username from chat header
    const friendUsername = retrieveCurrentFriend();
    // Create variable to hold friend profile ID
    let friendID = await retrieveIDFromUsername(friendUsername);
    // Check if the profile ID was successfully retrieved
    if (friendID === null) throw new Error("Friend profile ID could not be retrieved");
    // If the user has pressed enter
    if (event.keyCode === 13 && !event.shiftKey) {
      // Emit stop-typing event to friend
      socket.volatile.emit("stop-typing", friendID);
    } else {
      // Emit is-typing event to friend
      socket.volatile.emit("is-typing", friendID);
    }
  });
  // Create variable to hold typing indicator element
  let typingIndicator = null;
  // Whenever an is-typing event comes through
  socket.on("is-typing", async (chatterID) => {
    const currentFriendUsername = retrieveCurrentFriend();
    const currentFriendID = await retrieveIDFromUsername(currentFriendUsername);
    if (currentFriendID !== chatterID || typingIndicator !== null) return;
    const chatHeader = retrieveChatHeader();
    chatHeader.style.flex = "none";
    typingIndicator = createElement("span", {
      style: "flex: 1; margin-left: 4px;"
    }, [
      " is typing.."
    ]);
    chatHeader.parentElement.insertBefore(typingIndicator, chatHeader.nextElementSibling);
  });
  // Whenever a stop-typing event comes through
  socket.on("stop-typing", async(chatterID) => {
    if (typingIndicator === null) return;
    const chatHeader = retrieveChatHeader();
    chatHeader.style.flex = "1";
    typingIndicator.remove();
    typingIndicator = null;
  });
});

function retrieveChatHeader() {
  // Search for the chat header using the supplied class name
  const headerSearchResults = chatRoot.getElementsByClassName(ChatHeaderClassName);
  // Verify that the chat header exists
  if (headerSearchResults.length === 0) throw new Error("ChatHeaderClassName has changed");
  // Assign header to variable for ease of use
  const chatHeader = headerSearchResults[0];
  // Return chat header
  return chatHeader;
}

function retrieveCurrentFriend() {
  // Retrieve chat header
  const chatHeader = retrieveChatHeader();
  // Retrieve the friend username from header
  const friendUsername = chatHeader.firstChild.data;
  // Return username
  return friendUsername;
}

async function retrieveIDFromUsername(friendUsername) {
  let friendID = null;
  // Check if the username-to-id map has the username
  if (usernameIDMap.has(friendUsername)) {
    // Retrieve the profile ID from the map
    friendID = usernameIDMap.get(friendUsername);
  } else {
    // Retrieve profile ID manually
    try {
      // Search for the friend in the current server
      const friendSearchResponse = await fetch(`/user/?q=${encodeURIComponent(friendUsername)}`);
      // If an HTTP error has occured, throw an exception
      if (!friendSearchResponse.ok) throw new Error(`HTTP ${friendSearchResponse.status} - ${friendSearchResponse.statusText}`);
      // Retrieve the JSON response
      const friendSearchData = await friendSearchResponse.json();
      // Verify that the search results contain data
      if (friendSearchData.data.length === 0) throw new Error("Friend not found");
      // Retrieve friend profile ID from data
      friendID = friendSearchData.data[0].id;
      // Store the username and ID in map
      usernameIDMap.set(friendUsername, friendID);
      // Cache the map for later use
      localStorage.setItem("username-to-id-map", JSON.stringify(Array.from(usernameIDMap)));
    } catch(error) {
      // Log error to console
      console.error("Encountered error while retrieving friend ID", error);
    }
  }
  // Return profile ID
  return friendID;
}


})();

(function () {
  'use strict';

  function createChangePlaceholderWindow() {
    const windowBox = document.createElement('div');
    windowBox.style.position = 'fixed';
    windowBox.style.top = '50%';
    windowBox.style.left = '50%';
    windowBox.style.transform = 'translate(-50%, -50%)';
    windowBox.style.backgroundColor = '#0d0d0d';
    windowBox.style.padding = '20px';
    windowBox.style.borderRadius = '10px';
    windowBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    windowBox.style.zIndex = '9999';

    const usernameInput = document.createElement('div');
    usernameInput.style.position = 'relative';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = '   Preview Username Input';
    inputField.style.width = '100%';
    inputField.style.backgroundColor = '#565359';
    inputField.style.color = '#fff';
    inputField.style.borderRadius = '12px';
    inputField.style.marginBottom = '10px';
    inputField.style.padding = '8px'; // Added padding to the input field
    inputField.style.paddingRight = '35px'; // Adjusted to accommodate the icon

    const infoIcon = document.createElement('span');
    infoIcon.innerHTML = '❓';
    infoIcon.style.position = 'absolute';
    infoIcon.style.top = '50%';
    infoIcon.style.right = '10px'; // Adjusted right padding for the icon
    infoIcon.style.transform = 'translateY(-50%)';
    infoIcon.style.cursor = 'pointer';
    infoIcon.title = 'Hover over this icon for helpful information.';
    infoIcon.addEventListener('mouseover', () => {
      alert('Enter a new username preview in the text field. This preview will be displayed when you hover over your username.');
    });

    usernameInput.appendChild(inputField);
    inputField.appendChild(infoIcon);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginRight = '10px';
    closeButton.style.borderRadius = '15px';
    closeButton.style.backgroundColor = '#63081f';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(windowBox);
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.style.marginRight = '10px';
    resetButton.style.borderRadius = '15px';
    resetButton.style.backgroundColor = '#753545';
    resetButton.addEventListener('click', () => {
      localStorage.removeItem('customUsername');
      window.location.reload(); // Refresh the page
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.borderRadius = '15px';
    saveButton.style.backgroundColor = '#538a4d';
    saveButton.addEventListener('click', () => {
      const newPlaceholder = inputField.value;
      if (newPlaceholder) {
        const usernameLink = document.querySelector('h1 a.tool-tip');
        if (usernameLink) {
          usernameLink.setAttribute('title', newPlaceholder);
          localStorage.setItem('customUsername', newPlaceholder);
          usernameLink.textContent = newPlaceholder;
        }
      }
      document.body.removeChild(windowBox);
    });

    windowBox.appendChild(usernameInput);
    windowBox.appendChild(closeButton);
    windowBox.appendChild(resetButton);
    windowBox.appendChild(saveButton);

    document.body.appendChild(windowBox);
  }

  const butterflyButton = document.createElement('div');
  butterflyButton.innerHTML = 'Username Preview';
  butterflyButton.style.position = 'absolute';
  butterflyButton.style.top = '20%';
  butterflyButton.style.right = '230px';
  butterflyButton.style.fontSize = '14px';
  butterflyButton.style.borderRadius = '14px';
  butterflyButton.style.backgroundColor = '#4278f5';
  butterflyButton.style.color = 'white';
  butterflyButton.style.padding = '8px 12px';
  butterflyButton.style.cursor = 'pointer';
  butterflyButton.style.zIndex = '999';
  butterflyButton.style.boxShadow = '0 0 10px #2261f5';
  butterflyButton.style.transition = 'transform 0.3s, box-shadow 0.3s';

  butterflyButton.addEventListener('click', () => {
    createChangePlaceholderWindow();
  });

  butterflyButton.addEventListener('mouseover', () => {
    butterflyButton.style.transform = 'scale(1.1)';
    butterflyButton.style.boxShadow = '0 0 20px #2261f5';
  });

  butterflyButton.addEventListener('mouseout', () => {
    butterflyButton.style.transform = 'scale(1)';
    butterflyButton.style.boxShadow = '0 0 10px #2261f5';
  });

  const sectionTop = document.querySelector('#mobile-page #profile-page .section-top');
  if (sectionTop) {
    sectionTop.appendChild(butterflyButton);
  }

  // Check if there is a custom username saved in local storage
  const savedUsername = localStorage.getItem('customUsername');
  if (savedUsername) {
    const usernameLink = document.querySelector('h1 a.tool-tip');
    if (usernameLink) {
      usernameLink.setAttribute('title', savedUsername);
      usernameLink.textContent = savedUsername;
    }
  }
})();

(function() {
    'use strict';

    // Function to purchase an item without confirmation
    function purchaseWithoutConfirmation(itemType, itemId) {
        const baseUrl = 'https://www.kogama.com/model/market/';
        const purchaseUrl = itemType === 'avatar' ? `a-${itemId}/purchase/` : `i-${itemId}/purchase/`;

        fetch(baseUrl + purchaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            if (response.ok) {
                // Purchase request successful, refresh the page
                window.location.reload();
            }
        }).catch(error => {
            console.error('Purchase error:', error);
        });
    }

    // Get the current URL
    const currentUrl = window.location.href;

    // Determine item type and ID from the URL
    const itemType = currentUrl.includes('/avatar/') ? 'avatar' : 'model';

    // Use the match result if not null
    const matchResult = currentUrl.match(/\/[ai]-([0-9]+)\//);
    const itemId = matchResult ? matchResult[1] : null;

    // Find the purchase button element
    var purchaseButton = document.querySelector('#mobile-page #product-detail #product-purchase-link .purchase-button');

    if (purchaseButton) {
        // Hide the confirmation modal
        const confirmationModal = document.querySelector('.modal-content.modal-small');
        if (confirmationModal) {
            confirmationModal.style.display = 'none';
        }

        // Attach a click event listener to the purchase button
        purchaseButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (itemId !== null) {
                purchaseWithoutConfirmation(itemType, itemId);
            } else {
                console.error('Item ID not found.');
            }
        });
    }
})();

(function() {
    'use strict';


    const profiles = [

        {
            id: '669312073',
            text: 'A silly badge for a cool person. Truly the best financial supporter.',
            imageUrl: 'https://i.imgur.com/eDd16P8.png'
        },
         {
            id: '36355',
            text: 'Awxi has been a truly amazing help and supportive friend along the creation of the theme!',
            imageUrl: 'https://i.imgur.com/eDd16P8.png'
        },
          {
            id: '10590799',
            text: 'Truly a great contributor! Thank you for helping me spot all bugs!',
            imageUrl: 'https://i.imgur.com/RbYsuVC.png'
        },
          {
            id: '5585592',
            text: 'They are the reason this theme is public in the first place! Thank you for your contributions.',
            imageUrl: 'https://i.imgur.com/RbYsuVC.png'
        },
          {
            id: '668970425',
            text: 'A silly friend that helped me to spot bugs, thanks for giving me your time to test features!',
            imageUrl: 'https://i.imgur.com/RbYsuVC.png'
        },
            {
            id: '17037147',
            text: 'This cutie is the sole reason I started to work on myself and create useful things for people, Thank you M.',
            imageUrl: 'https://i.imgur.com/qbCBdN8.png'
        },
        {
            id: '20998101',
            text: 'Vee! Thank you for using my theme.',
            imageUrl: 'https://i.imgur.com/qbCBdN8.png'
        },
    ];


    GM_addStyle(`
        .custom-badge {
            position: relative; /* Change from absolute to relative */
            display: inline-block;
            width: 32px;
            height: 32px;
            left: 46%;
            top: 5%;
        }

        .custom-badge img {
            width: 100%;
            height: 100%;
            border-radius: 14px;
            cursor: pointer;
        }

        /* Added styling for the cloud-like element */
        .custom-badge .cloud-element {
            position: absolute;
            display: none;
            width: 200px;
            background-color: #0f0f0f;
            border: 1px solid #ccc;
            border-radius: 25px;
            padding: 8px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            transform: translateY(-100%);
            left: 50%;
            transform: translateX(-50%);

        }

        .custom-badge:hover .cloud-element {
            display: block;
        }
        .badge-preview-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .badge-preview-container {
            max-width: 80%;
            max-height: 80%;
            overflow: auto;
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            position: relative;
        }

        .badge-preview-container img {
            max-width: 100%;
            height: auto;
        }
    `);

    function createBadge(text, imageUrl) {
        const badge = document.createElement('div');
        badge.className = 'custom-badge';
        badge.innerHTML = `
            <img src="${imageUrl}" alt="Badge">
            <div class="cloud-element">${text}</div>
        `;
        return badge;
    }

    function showBadgePreview(imageUrl) {
        const overlay = document.createElement('div');
        overlay.className = 'badge-preview-overlay';
        overlay.addEventListener('click', () => overlay.remove());

        const container = document.createElement('div');
        container.className = 'badge-preview-container';

        const image = document.createElement('img');
        image.src = imageUrl;

        container.appendChild(image);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
    }

    function addBadges() {
        const profilePage = document.querySelector('#mobile-page #profile-page .section-top');

        if (!profilePage) return;

        const profileId = window.location.href.match(/\/profile\/(\d+)/)[1]; // Extract profile ID from URL

        for (const profile of profiles) {
            if (profile.id === profileId) {
                const badge = createBadge(profile.text, profile.imageUrl);
                badge.addEventListener('click', () => showBadgePreview(profile.imageUrl));
                profilePage.appendChild(badge);
                break;
            }
        }
    }

    window.addEventListener('load', addBadges);

})();
(function() {
    'use strict';

    // Define the profiles and their corresponding colors
    const profiles = [
        {
            url: 'https://www.kogama.com/profile/20998101/',
            glowColor: '#f27e8d',
            textColor: '#fff',
        },
        {
            url: 'https://www.kogama.com/profile/17037147/',
            glowColor: '#f27e8d',
            textColor: '#fff',
        },
          {
            url: 'https://www.kogama.com/profile/36355/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
          {
            url: 'https://www.kogama.com/profile/669312073/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
                  {
            url: 'https://www.kogama.com/profile/10590799/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
                  {
            url: 'https://www.kogama.com/profile/5585592/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },
                  {
            url: 'https://www.kogama.com/profile/668970425/',
            glowColor: '#7eabf2',
            textColor: '#ffffff',
        },

    ];

    const currentUrl = window.location.href;
    const currentProfile = profiles.find(profile => currentUrl.includes(profile.url));

    if (currentProfile) {
        // Apply glow effect and custom text color for the specific profile
        const textElement = document.querySelector('.creations-feed section.creations-custom .section-description .description-container .text');
        if (textElement) {
            textElement.style.textShadow = `0 0 10px ${currentProfile.glowColor}, 0 0 10px ${currentProfile.glowColor}, 0 0 10px ${currentProfile.glowColor}`;
            textElement.style.animation = 'glow 1s ease-in-out infinite alternate';
            textElement.style.color = currentProfile.textColor;
        }
    } else {
        // Apply default text color when not on a specific profile
        const textElement = document.querySelector('.creations-feed section.creations-custom .section-description .description-container .text');
        if (textElement) {
            textElement.style.color = '#a57aef';
        }
    }
})();
