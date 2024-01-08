// Replace $ID with the actual ID
const userId = 'USERID';

fetch(`https://www.kogama.com/user/$%7BuserId%7D/friend/?count=30`, {
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
    console.log(JSON.stringify(simplifiedData, null, 2));
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
