const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://cjpf1688.cc');
  await page.screenshot({path: 'cjpf1688.cc.png', fullPage: true});

  await browser.close();
})();