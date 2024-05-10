// PRINT THE HTML / JSON OUTPUT OF THE WEBSITE WE ARE CURRENTLY IN
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
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); 
  }
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Fetch request failed:', error);
});
