const scrollFuntion = () => {
const fs = require('fs');
const puppeteer = require('puppeteer');

function extractItems() {
  const extractedElements = document.querySelectorAll('#boxes > div.box');
  const items = Array.from(extractedElements).map(item => item.innerText)
  return items;
}

async function scrapeInfiniteScrollItems(page,extractItems,itemTargetCount) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      console.clear()
      console.log('Please wait...')
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch(e) { console.log(e) }
  return items;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  await page.goto('https://intoli.com/blog/scrape-infinite-scroll/demo.html');

  const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

  fs.writeFileSync('./box.json', JSON.stringify(items), null, 2);
  // fs.writeFileSync('./items.txt', items.join('\n') + '\n');

  await browser.close();
})();
}

module.exports = scrollFuntion