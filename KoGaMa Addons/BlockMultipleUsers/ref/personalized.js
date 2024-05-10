const CLIENT_ID = SELFID;
const USER_PROFILES = [
  { username: "scarеd.xyz", profileId: 34445 },
  { username: "কক", profileId: 1186442 },
  { username: "Xayvertonix", profileId: 2416361 },
  { username: "KenDaBeast", profileId: 2814866 },
  { username: "яαժιε 死", profileId: 3375976 },
  { username: "Fukase ふかせ", profileId: 5037938 },
  { username: "ʏᴏᴏɴ", profileId: 8339104 },
  { username: "S C Λ R Ξ D", profileId: 9019571 },
  { username: "ᴀᴍᴇᴛʜʏsᴛ", profileId: 9839184 },
  { username: "Shеlby", profileId: 10183579 },
  { username: "dolliest", profileId: 10497951 },
  { username: "scared.xyz", profileId: 15386532 },
  { username: "YourNotThatGuy", profileId: 15546142 },
  { username: "WinterCold", profileId: 16154001 },
  { username: "Venσmッ", profileId: 16324315 },
  { username: "ᴘᴏʀᴛᴀꜱ", profileId: 18365116 },
  { username: "AdaletSokakta0013", profileId: 18515594 },
  { username: "R A I N      雨", profileId: 19222931 },
  { username: ".Louis.", profileId: 19531003 },
  { username: "markeloff.xyz", profileId: 20037522 },
  { username: "-sabooo", profileId: 20107599 },
  { username: "Siki56543", profileId: 21232073 },
  { username: "the foxy.", profileId: 21269335 },
  { username: "ᴅᴇᴀᴅ.", profileId: 22535591 },
  { username: "Wynnea", profileId: 23142079 },
  { username: "Tємρєѕт", profileId: 23213484 },
  { username: "Cyxan", profileId: 23323453 },
  { username: ".Atsumi.", profileId: 24243477 },
  { username: "ৰৰ", profileId: 24304847 },
  { username: "constanzo.", profileId: 24388642 },
  { username: "Ramlethal", profileId: 25037907 },
  { username: "_v4mpixie", profileId: 25227903 },
  { username: "miruru", profileId: 25453113 },
  { username: "D A R K Y 雨", profileId: 50156316 },
  { username: ".ღ.уσмηα.ღ.", profileId: 50417643 },
  { username: "darky337_", profileId: 50596580 },
  { username: "ɪꜱᴀʙᴇʟ", profileId: 50709102 },
  { username: "Kamisato Ayato.", profileId: 50980597 },
  { username: "ᴋᴀᴢᴜxʜᴀ 楓原", profileId: 51053955 },
  { username: "ッDarkShadow.", profileId: 51597483 },
  { username: "ʟᴇɢᴇɴᴅ ᴄʜʀɪꜱ", profileId: 51605152 },
  { username: "メsᴛᴀʀʙᴏʏ.", profileId: 666676920 },
  { username: "ʏᴏʜᴀɴ", profileId: 667204078 },
  { username: "ᴏʙꜱᴇꜱꜱᴇᴅ", profileId: 667315982 },
  { username: "S o ンT iン R ン I s ン", profileId: 667411050 },
  { username: "ᴠᴇɴᴏᴍϟ", profileId: 667414035 },
  { username: "Yomna-", profileId: 667630286 },
  { username: "Skadi Windfrozt", profileId: 667633711 },
  { username: "furi.", profileId: 667635238 },
  { username: "ᛜ.ღᴇᴠᴇ_ᴡᴀɴɢღ.", profileId: 667767029 },
  { username: "skexy.", profileId: 667789126 },
  { username: "Creepy Step Dad", profileId: 667834566 },
  { username: "ღᴘ ʀ ᴏ ɢ ᴀ ᴍ ɪ ɴ ɢღ", profileId: 668064310 },
  { username: "veronica has poopybutthole", profileId: 668124616 },
  { username: "ᴘᴏʀᴛᴀꜱކ", profileId: 668156150 },
  { username: "ᴄᴏғғᴇᴇ.ϟ", profileId: 668287717 },
  { username: "ᴅᴀᴢᴀɪ 累的", profileId: 668303247 },
  { username: "ᴠᴇɴᴏᴍ", profileId: 668332488 },
  { username: "ʙᴀʟᴋɪs", profileId: 668923437 },
  { username: "এএ", profileId: 669107441 },
  { username: "Rebzyyx", profileId: 669128099 },
  { username: "雨 ᴘ ʀ ᴏ ɢ ᴀ ᴍ ɪ ɴ ɢ 雨", profileId: 669333877 },
  { username: "SolitudeSeeker失", profileId: 669358563 },
  { username: "-ᴇᴅɢᴇʟᴏʀᴅᴋɪɴɢsᴏɴɪᴄ-", profileId: 669537156 },
  { username: "亗 ᴘ ʀ ᴏ ɢ ᴀ ᴍ ɪ ɴ ɢ 亗", profileId: 669604901 },
  { username: "ᴘᴏʀᴛᴀꜱކކ", profileId: 669605680 },
  { username: "-cringeslayer-", profileId: 669650523 },
  { username: "ꜱɴᴏᴡ.", profileId: 669696966 },
  { username: "ᴘᴏʀᴛᴀꜱϟ", profileId: 669730391 }
];

async function blockUserWithDelay(username, profileId, delay) {
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
    console.log(`%cBlocked user ${username} with profile ID: ${profileId}`, "color: #f0bb2b");
  }
}

async function blockMultipleUsersWithDelay() {
  const delayBetweenRequests = 2000;

  for (const { username, profileId } of USER_PROFILES) {
    await blockUserWithDelay(username, profileId, delayBetweenRequests);
  }

  console.log("%cAll users have been blocked.", "color: #6f98b0");
}

blockMultipleUsersWithDelay();
