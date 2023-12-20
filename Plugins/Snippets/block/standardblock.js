// Huge thanks for Awxi for actually figuring it out for me! Lots of love towards them.
// Singular Version

// Your profileID
const CLIENT_ID = XXXXXX;
// The profileID of the user you wish to block
const PROFILE_ID = XXXXX;

fetch(`/user/${CLIENT_ID}/block/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Csrf-Token": ""
  },
  body: JSON.stringify({
    profile_id: PROFILE_ID
  })