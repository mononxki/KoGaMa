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
  var v1Parts = version1.split('.');
  var v2Parts = version2.split('.');
  var maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (var i = 0; i < maxLength; i++) {
    var v1 = parseInt(v1Parts[i]) || 0;
    var v2 = parseInt(v2Parts[i]) || 0;

    if (v1 < v2) {
      return -1;
    } else if (v1 > v2) {
      return 1;
    }
  }

  return 0;
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
      var latestVersion = versionElement.textContent.trim();

      // Compare the latest version with the user's version
      var userVersion = GM_info.script.version;

      console.log('Latest version:', latestVersion);
      console.log('User version:', userVersion);

      var isUpdateAvailable = compareVersions(userVersion, latestVersion) < 0;

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
    padding: 10px;
    border: 1px solid #c43333;
    box-shadow: 0 0 5px #fff;
    border-radius: 25px;
    z-index: 999999;
    color: #cfbd8f;
    font-size: 14px;
    font-family: Arial, sans-serif;
  }
`);