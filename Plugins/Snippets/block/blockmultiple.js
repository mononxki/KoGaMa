const CLIENT_ID = XXXXXX;
// ID list below is mostly lol cube gun players, and cringe turkish pvpers.
const PROFILE_IDS = [
  1186442,
  2416361,
  2814866,
  51597483,
  10183579,
  18365116,
  18515594,
  19531003,
  20037522,
  20107599,
  21269335,
  23213484,
  24304847,
  50417643,
  50709102,
  51605152,
  667411050,
  667630286,
  667789126,
  667834566,
  668124616,
  668156150,
  668303247,
  668332488,
  669107441,
  669358563,
  669537156,
  669605680,
  669730391
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
