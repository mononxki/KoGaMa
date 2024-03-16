(function myLoop(i) {
  setTimeout(function() {

const authToken = 'YOUR_NOTIFY_TOKEN';  
// & Notify token here
fetch('https://www.kogama.com/model/market/i-123/purchase/', {
  //                                                                              ^ i-ID of model/avatar you want to spam purchase.
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

    if (--i) myLoop(i);
  }, 30000) // Delay, don't change
})(10000); //loop ammount
