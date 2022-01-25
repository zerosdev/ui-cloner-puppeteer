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
let disable = args.hasOwnProperty('disable') ? args['disable'] : null;
const disabled = disable !== null ? disable.split(',') : [];
const hostname = new URL(target);
const host = hostname.hostname;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1024,600'
    ],
    defaultViewport: {
      width: 1024,
      height: 600
    }
  });
  const [page] = await browser.pages();
  await page.setRequestInterception(true);

  var dis = [];
  let pairs = {
    'image': 'image',
    'css': 'stylesheet',
    'js': 'script',
    'font': 'font'
  };

  Object.keys(pairs).forEach(function(v, i) {
    if (disabled.includes(v)) {
      dis.push(pairs[v]);
    }
  });

  // never load image
  page.on('request', (req) => {
    if (dis.includes(req.resourceType())) {
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
      let filePath = path.resolve(`.${path.sep}output${path.sep}${host}${url.pathname}`);
      if (path.extname(url.pathname).trim() === '') {
        filePath = `${filePath}${path.sep}index.html`;
      }
      if (! args.hasOwnProperty('--no-progress')) {
        console.info('Saving: ' + res.url() + ' => ' + filePath);
      }
      await fs.outputFile(filePath, await res.buffer());
    }
  });

  // go to target url
  await page.goto(target, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
    timeout: 120000 // 120 seconds
  });

  // wait 2 seconds and close browser
  setTimeout(async () => {
    await browser.close();
  }, 2 * 1000);

})();