import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({headless: false,devtools: true,})
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/0-basic/index.html");


  //$eval return a list as text
  await page.waitForSelector('ul')
  const list = await page.$eval('ul', (el) => el.innerText);
  console.warn(list);
  console.log('--------------------------------')

  //evulate return a list as array
  await page.waitForSelector('ul li')
  const allLi = await page.evaluate(() => Array.from(document.querySelectorAll('ul li'), item => item.innerText));
  console.warn(allLi);

  const filteredList = allLi.filter(item => item == 'Html5' || item == 'NodeJs')
  console.log(filteredList)
  console.log('--------------------------------')

})()