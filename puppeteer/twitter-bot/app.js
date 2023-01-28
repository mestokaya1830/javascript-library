const puppeteer = require("puppeteer");
const fs = require("fs");

const username = "mesto1830@outlook.com";
const password = "MK1972mk";

var browser = null;
var page = null;

(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 800,
    isMobile: false,
  });

  //login section------------------------------------------
  await page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

  await page.waitForSelector('[autocomplete="username"]');
  await page.type('[autocomplete="username"]', username, { delay: 25 });
  const [button] = await page.$x("//span[contains(., 'Next')]");
  await button.click();

  await page.waitForSelector('[name="text"]');
  await page.type('input[name="text"]', "mestokaya", { delay: 25 });
  const el = await page.$('[data-testid="ocfEnterTextNextButton"]');
  await el.click();

  await page.waitForSelector('[name="password"]');
  await page.type('[name="password"]', password, { delay: 25 });
  const [login] = await page.$x("//span[contains(., 'Log in')]");
  await login.click();
  await page.waitForNavigation();

  //tweet section--------------------------------------
  await page.goto("https://twitter.com/fatmasahin", {waitUntil: "networkidle2",});

  //title of first tweet
  await page.waitForSelector(".css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0 > .css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0");
  const items = await page.evaluate(() => Array.from(document.querySelectorAll(".css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0 > .css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0"),(item) => item.innerText));
  console.log(items)
  
  //click first tweet
  const tweetLink = await page.$$('[data-testid="tweetText"]');
  await tweetLink[0].click();

  //get first tweet likes dialog page
  await page.waitForSelector(".css-4rbku5.css-18t94o4.css-901oao.r-18jsvk2.r-1loqt21.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0");
  const link = await page.evaluate(() => Array.from(document.querySelectorAll(".css-4rbku5.css-18t94o4.css-901oao.r-18jsvk2.r-1loqt21.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0"),(item) => item.href));
  let likesUrl = link[2];
  if (link[2]) {
    likesUrl = link[2];
  } else {
    likesUrl = link[1];
  }
  const users = []
  await page.goto(`${likesUrl}`, { waitUntil: "networkidle2" });

  //get all liked users from first-tweet dialog
  const getUsers = async () => {
    users.push(await page.evaluate(() => Array.from(document.querySelectorAll('a > div > div > span > span'), item => item.innerText)))
  }

  //likes dialog scroll
  await page.exposeFunction("getUsers", getUsers);
  try {
    console.log("Please wait...");
    const res = await page.$eval(".r-1dqxon3", (item) => {
      let distance = 1200;
      let totalHeight = 0;
      let timer = setInterval(() => {
        getUsers()
        item.scrollTop = item.scrollTop + distance;
        totalHeight += distance;
        if (totalHeight >= item.scrollHeight) {
          clearInterval(timer);
        }
        return item;
      }, 2000);
    });
  } catch (e) {
    console.log(e);
  }
  setTimeout(() => {
    const finalUsers = (param) => Array.from(new Set(param))
    console.log(finalUsers(users.flat()))
    const usersLength = finalUsers(users.flat()).length
    console.log(usersLength)
  }, 10000);
  //goto div bottom likes dialog scroll
    // const res = await page.$eval(".r-1dqxon3", (item) => {
    //   item.scrollTop = item.scrollHeight
    //   return item;
    // }, 2000);



  //-----------------------------------------get emails
  // const sel2 = 'a > div > div > span > span'
  // await page.waitForSelector(sel2);
  // const email = await page.evaluate(() => Array.from(document.querySelectorAll('a'), item => item.href))
  // const usersEmailUnquie = (param) => Array.from(new Set(param))
  // const usersEmail = usersEmailUnquie(email)
  // const all = []
  // usersName.forEach((key, value) => {
  //   all.push({name: key, email: usersEmail[value]})
  // });
  // await page.waitForNavigation();

  // fs.writeFileSync("./box.json", JSON.stringify(items), null, 2);
})();