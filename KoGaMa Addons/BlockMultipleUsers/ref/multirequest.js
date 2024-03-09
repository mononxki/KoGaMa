const CLIENT_ID = SELFID;
const PROFILE_IDS = [
    ID1,
    ID2,
    ID3,
    // ...
];


async function blockUserWithDelay(profileId, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const response = await fetch(`/user/${CLIENT_ID}/block/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Csrf-Token": ""
    },
    body: JSON.stringify({
      profile_id: profileId
    })
  });

  if (response.ok) {
    console.log(`%cBlocked user with profile ID: ${profileId}`, "color: #f0bb2b");
  }
}


async function blockMultipleUsersWithDelay() {
  const delayBetweenRequests = 2000; 

  for (const profileId of PROFILE_IDS) {
    await blockUserWithDelay(profileId, delayBetweenRequests);
  }

  console.log("%cAll users have been blocked.", "color: #6f98b0");
}


blockMultipleUsersWithDelay();