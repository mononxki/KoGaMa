
const userId = '18172682';
const friendsPerPage = 20;
const totalFriends = 350;

fetch(`https://www.kogama.com/user/${userId}/friend/?count=${totalFriends}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const simplifiedData = {
      data: data.data.map(friend => ({
        friend_profile_id: friend.friend_profile_id,
        friend_username: friend.friend_username
      }))
    };


    for (let page = 1; page <= Math.ceil(totalFriends / friendsPerPage); page++) {
      const startIdx = (page - 1) * friendsPerPage;
      const endIdx = Math.min(page * friendsPerPage, totalFriends);

      console.groupCollapsed(`Page ${page}`);
      simplifiedData.data.slice(startIdx, endIdx).forEach(friend => {
        console.log(`Friend ID: ${friend.friend_profile_id}`);
        console.log(`Friend Username: %c${friend.friend_username}`, 'color: white; text-shadow: 0 0 3px white; text-decoration: underline; cursor: pointer;');
        console.log(`Profile Link: %chttps://www.kogama.com/profile/${friend.friend_profile_id}`, 'color: green; cursor: pointer;');
        console.log('---');
      });
      console.groupEnd();
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
