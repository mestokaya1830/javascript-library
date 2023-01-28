import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({headless: false,devtools: true,})
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/login/index.html");


  await page.click('a[href="login.html"]');
  await page.goto("http://127.0.0.1:5500/login/login.html");

  await page.waitForSelector('[name="username"]');
  await page.type('[name="username"]', 'mesto', {delay: 50})

  await page.waitForSelector('[name="password"]');
  await page.type('[name="password"]', '1234', {delay: 50})

  await page.waitForSelector('[name="city"]');
  await page.select('[name="city"]', 'Gaziantep')

  await page.click('input[value="Login"]')
  await page.goto("http://127.0.0.1:5500/login/dashboard.html");


  // await browser.close()
})()