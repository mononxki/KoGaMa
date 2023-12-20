const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');


async function fetchDataAndScrape(subdomain, page) {
  try {
    const baseUrl = `https://www.kogama.com/profile/${config.TargetID}/marketplace/${subdomain}/?page=${page}&count=12`;

    const result = await axios.get(baseUrl);
    const $ = cheerio.load(result.data);

    const items = [];
    $('#mobile-page .content-shop .shop-list .shop-item .shop-name').each((index, element) => {
      const itemName = $(element).text();
      items.push(itemName);
    });

    return items;
  } catch (error) {
    console.error(`Error fetching data for ${subdomain}, page ${page}: ${error.message}`);
    return [];
  }
}


function saveToTxtFile(filename, data) {
  fs.writeFileSync(filename, data.join('\n'));
  console.log(`Data saved to ${filename}`);
}


async function fetchAndSaveData(subdomain, filename) {
  let page = 1;
  let allItems = [];

  while (true) {
    const items = await fetchDataAndScrape(subdomain, page);
    if (items.length === 0) {
      break; // No more pages to scrape
    }

    allItems = allItems.concat(items);
    page++;
  }

  saveToTxtFile(filename, allItems);
}


function checkForNewContent() {
  const lastScanData = {
    models: [],
    avatars: [],
  };

  const scanInterval = config.scanInterval || 10; // Default to 10 seconds

  setInterval(async () => {
    console.log(`Scanning for new content...`);

    const newModels = await fetchDataAndScrape('model', 1);
    const newAvatars = await fetchDataAndScrape('avatar', 1);

    const isModelNew = newModels.some(item => !lastScanData.models.includes(item));
    const isAvatarNew = newAvatars.some(item => !lastScanData.avatars.includes(item));

    if (isModelNew) {
      console.log(`New content found in Models: ${newModels.filter(item => !lastScanData.models.includes(item)).join(', ')}`);
      lastScanData.models = newModels;
    }

    if (isAvatarNew) {
      console.log(`New content found in Avatars: ${newAvatars.filter(item => !lastScanData.avatars.includes(item)).join(', ')}`);
      lastScanData.avatars = newAvatars;
    }
  }, scanInterval * 1000);
}


async function main() {
  if (config.models) {
    await fetchAndSaveData('model', 'models.txt');
  }

  if (config.avatars) {
    await fetchAndSaveData('avatar', 'avatars.txt');
  }

  checkForNewContent();
}

main();
