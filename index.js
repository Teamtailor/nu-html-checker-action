const core = require('@actions/core');
const playwright = require('playwright');

(async () => {
  try {
    const url = core.getInput('url');

    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();

    await page.goto(`https://validator.nu/?doc=${url}`);

    await page.waitForSelector('#results .error');
    const errorsCount = await page.locator('#results .error').count();
    await browser.close();

    core.setOutput('errors-count', errorsCount);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
