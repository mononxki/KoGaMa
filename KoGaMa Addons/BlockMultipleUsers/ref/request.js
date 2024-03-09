const CLIENT_ID = SELFID;
const PROFILE_ID = TARGETID;

fetch(`/user/${CLIENT_ID}/block/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Csrf-Token": ""
  },
  body: JSON.stringify({
    profile_id: PROFILE_ID
  })
})
  .then(response => {
  
    if (response.ok) {
      console.log('User blocked successfully');
    } else {
      console.error('Error blocking user');
    }
  })
  .catch(error => {
    console.error('Network error:', error);
  });