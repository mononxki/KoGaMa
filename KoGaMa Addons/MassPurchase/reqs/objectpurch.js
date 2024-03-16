const authToken = 'YourAuthToken'; // *Notify-Token
//this is a test script
fetch('https://www.kogama.com/model/market/a-AVATARID/purchase/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({}),
})
  .then(response => {
    if (response.ok) {
      console.log('Purchase successful!');
    } else {
      console.error('Purchase failed:', response.status);
    }
  })
  .catch(error => {
    console.error('Purchase failed:', error);
  });
  
  
