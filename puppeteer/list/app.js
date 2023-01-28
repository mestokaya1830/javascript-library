import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({headless: false,devtools: true,})
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/list/index.html");
  
  //outer filter
  await page.waitForSelector('ul li')
  const allLi = await page.evaluate(() => Array.from(document.querySelectorAll('ul li'), item => item.innerText));
  // console.warn(allLi);
  const filteredList = allLi.filter(item => item == 'Html5' || item == 'NodeJs')
  console.log(filteredList)
  console.log('--------------------------------')

  //get all li under the ul tag with map and class
  await page.waitForSelector('.list')
  const withMap = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.list li')).map(item => item.innerText)
  });
  console.log(withMap);
  console.log('--------------------------------')

  //inner filter
  await page.waitForSelector('.list')
  const withMapFilter = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.list li'),item => item.innerText)
    .filter(item => item == 'VueJs' || item == 'NodeJs')
    .sort()
  });
  console.log(withMapFilter);
  console.log('--------------------------------')
  
  // await browser.close()
})()
