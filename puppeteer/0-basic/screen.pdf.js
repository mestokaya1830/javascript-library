import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({headless: false,devtools: true,})
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://127.0.0.1:5500/0-basic/index.html");

  await page.emulateMediaType(MediaType.screen);
  await page.pdf({
    format: PaperFormat.a4,
    printBackground: true,
    pageRanges: '1',
    output: File('example/_dart.pdf').openWrite()
  })
  //simple way
  // await page.pdf({
  //   path: "javascript.pdf",
  // });

  // await browser.close()

})()
