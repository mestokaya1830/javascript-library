import puppeteer from "puppeteer";
import fs from 'fs'

(async () => {
  const browser = await puppeteer.launch({headless: false,devtools: true,})
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/scroll/index.html");

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

  const items = await scrapeInfiniteScrollItems(page, extractItems, 50);

  fs.writeFileSync('./box.json', JSON.stringify(items), null, 2);
  // await browser.close()

})()