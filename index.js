const playwright = require('playwright');

const fs = require('fs');

(async () => {
  const url = process.argv[2];

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  const reportUrl = `https://validator.nu/?doc=${url}`;
  console.log('Navigating to', reportUrl);
  await page.goto(reportUrl);

  await page.waitForSelector('#results');
  const errorsCount = await page.locator('#results .error').count();
  await browser.close();

  console.log('Errors count', errorsCount);

  fs.writeFileSync('error-count.txt', `${errorsCount}`);
  fs.writeFileSync('report-url.txt', reportUrl);
})();
