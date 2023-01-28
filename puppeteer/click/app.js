import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/click/index.html");

  //run alert function with short usage (no variable)
  // await page.click('button', {clickCount: 4});//with tag
  // await page.click('#msg');//with id
  // await page.click('.msg');//with class
  // await page.click('[name="msg"]');//with name
  // await page.click('[data="msg"]');//with data

  //with xpath
  // const [msgBnt] = await page.$x('//*[@id="msg"]');
  // await msgBnt.click()

  //-----------------------------------------------------

  //run a href link with wariable
  // const href = await page.$('a');//with tag
  // const href = await page.$('#youtube');//with id
  // const href = await page.$('.youtube');//with class
  // const href = await page.$('[name="youtube"]');//with name
  // const href = await page.$('[data="youtube"]');//with data
  // const [href] = await page.$x('//*[@id="youtube"]');//with xpath
  // await href.click();

  // const buttons = await page.$$(".btn")
  // await buttons[0].click()
  // await buttons[1].click()
  // await buttons[2].click()

  // await browser.close()
})();
