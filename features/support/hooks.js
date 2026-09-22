const playwright = require('@playwright/test');
const { chromium } = require('@playwright/test');
const{POManager} = require('../../pageobjects/POManager');
const{Before,After} = require('@cucumber/cucumber')
const {AfterStep, BeforeStep} = require('@cucumber/cucumber');


Before(async function () {
    console.log("i am first");
    const browser = await chromium.launch({
        headless:false
    });
    const context = await browser.newContext();
    this. page = await context.newPage();
    this.poManager = new POManager(this.page);
    //this.count = 0;
});


BeforeStep({tags: "@foo"}, function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.takeScreenshot({path:'screenshot1.png'});
    this.attach(buffer.toString('base64'), 'base64:image/png');
      console.log("Screenshot logged")
    //this.driver.takeScreenshot();
  }
});

After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("I am the last to execute")
 // return this.driver.quit();
});
