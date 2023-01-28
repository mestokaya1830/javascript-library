import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({headless: false,devtools: true,})
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/table/index.html");

  //table
  await page.waitForSelector('table tbody tr')
  const tableFilter = await page.evaluate(() => {
    const result =  Array.from(document.querySelectorAll('table tbody tr')).map(item => {
      return {
        Id: item.querySelectorAll('td')[0].innerText,
        name: item.querySelectorAll('td')[1].innerText,
        price: item.querySelectorAll('td')[2].innerText
      }
    })
    return result
  });
  console.log(tableFilter);
  console.log('--------------------------------')
  
  
  // await browser.close()
})()
