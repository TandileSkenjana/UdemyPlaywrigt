const {test,expect} = require('@playwright/test');

test('Pop Up Validations',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack(); this method is used to go back to the previous page
    // await page.goForward();// this method is used to go forward to the next page

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on('dialog', dialog => dialog.accept());// this method is used to accept the alert pop up, 
    await page.locator("#confirmbtn").click();
   // await page.on('dialog', dialog => dialog.dismiss());// this method is used to dismiss the alert pop up
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");// this method is used to get all the frames on the page
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck= await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})

test("Screenshot & Visual comparison",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'});// getting screenshot on a locator level 
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});// capture screenshot of the whole page 
    await expect(page.locator("#displayed-text")).toBeHidden();
});
//Visual teszting 
// screenshot-store->screenshot
test('Visual testing',async({page})=>{

    await page.goto("https://flightware.com/");
    expect(await page.screenshot()).toMatchSnapshot('Landing.png');// comapring screenshot
})