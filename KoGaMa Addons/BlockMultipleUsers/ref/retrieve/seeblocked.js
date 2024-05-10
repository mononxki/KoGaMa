// RETRIEVE THE LIST OF BLOCKED USERS W IDS.
fetch(window.location.href, {
  method: 'GET',
  headers: {
    'Content-Type': 'text/html'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
})
.then(html => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const blockedUserElements = tempDiv.querySelectorAll('.user-row');

  const userList = [];

  blockedUserElements.forEach(userElement => {
    const username = userElement.querySelector('.control-group a').textContent.trim();
    const profileId = userElement.querySelector('.control-group input[name="profile_id"]').value.trim();
    userList.push(`Username: ${username}, Profile ID: ${profileId}`);
  });

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
    max-height: 670px;
    overflow-y: auto;
    padding: 20px;
    z-index: 1000;
  `;

  userList.forEach(user => {
    const paragraph = document.createElement('p');
    paragraph.textContent = user;
    modalContent.appendChild(paragraph);
  });

  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy';
  copyButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.value = userList.join('\n');
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('User list copied to clipboard!');
  });
  modalContent.appendChild(copyButton);

  document.body.appendChild(modalContent);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modalContent);
  });
  modalContent.appendChild(closeButton);
})
.catch(error => {
  console.error('Fetch request failed:', error);
});
