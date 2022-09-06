const core = require('@actions/core');
const playwright = require('playwright');

(async () => {
  try {
    const url = core.getInput('URL');

    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();

    // const reportUrl = `https://validator.nu/?doc=${url}`;
    const reportUrl =
      'https://validator.nu/?doc=https://accessibilitydemo.teamtailor.app';
    console.log('Navigating to', reportUrl);
    await page.goto(reportUrl);

    await page.waitForSelector('#results');
    const errorsCount = await page.locator('#results .error').count();
    await browser.close();

    console.log('Errors count', errorsCount);

    core.setOutput('errors-count', errorsCount);
    core.setOutput('report-url', reportUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
