const puppeteer = require('puppeteer');
const { URL } = require('url');
const fs = require('fs-extra');
const path = require('path');

var args = [];
process.argv.slice(2).forEach(function (val, index, array) {
  let a = val.split('=');
  args[a[0]] = a[1];
});

if (! args.hasOwnProperty('url') || args.url.length === 0) {
  console.error('ERROR: Please specify the `url`');
  return;
}

const target = args['url'];
const hostname = new URL(target);
const host = hostname.hostname;

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  // never load image
  page.on('request', (req) => {
  	if (['image'].includes(req.resourceType())) {
  		req.abort();
  	} else {
  		req.continue();
  	}
  });

  // intercept response and save content
  page.on('response', async (res) => {
  	const url = new URL(res.url());
    const regex = /http(s|):\/\//is;
    if (! regex.test(url.pathname)) {
      let filePath = path.resolve(`./output/${host}${url.pathname}`);
      if (path.extname(url.pathname).trim() === '') {
        filePath = `${filePath}/index.html`;
      }
      await fs.outputFile(filePath, await res.buffer());
    }
  });

  // go to target url
  await page.goto(target, {
      waitUntil: "networkidle2", // wait till all network requests has been processed
    });

  // wait 10 seconds and close browser
  setTimeout(async () => {
    await browser.close();
  }, 10 * 1000);
})();