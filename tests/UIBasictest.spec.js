const {test, expect}= require('@playwright/test');

// browser context test with the ({browser}) fixture/parameter
//Only method means that only this test will run and all other tests will be ignored

test('Browser context Playwright test', async ({browser})=>{
   // chrome-plugins/cookies
const context= await browser.newContext();
const page =await context.newPage(); 
//page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
//page.route('**/*.css',route=> route.abort());// css to block selectors 
//('**/*.)represents url. {jpg,png,jpeg} represents images
//page.route('**/*.{jpg,png,jpeg}',route=> route.abort())// to block images 

// we use the const method to store the locator in a variable, so that we can use it later in the test
const userName = page.locator("#username"); 
const signInBtn = page.locator("#signInBtn");
const cardTittles = page.locator(".card-body a");
page.on('request',request=>console.log(request.url())); // 'on' is a listener. listen for the request to occur 
page.on('response',response=>console.log(response.url(),response.status()));
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());

//css type,fill method, id locator. we use them to locate elements and perform actions on the webpage
await userName.type("rahulshetty");
await page.locator("[type='password']").type("Learning@830$3mK2");
await signInBtn.click();



// textContent method is used to get the text of the element, we can use it to verify if the error message is displayed or not
console.log(await page.locator("[style*='block']").textContent()); 
// assertion to verify if the error message is displayed or not
await expect(page.locator("[style*='block']")).toContainText('Incorrect');

// fill method is used to fill the input field, we can use it to fill the username and password fields
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signInBtn.click();

// we use the .first()  & nth() method to get the first element of the locator, we can use it to get the first card on the page
console.log(await cardTittles.first().textContent());
console.log(await cardTittles.nth(1).textContent()); 
// this method is used to get all the text of the elements, we can use it to get all the card titles on the page
const allTittle =await cardTittles.allTextContents(); 
console.log(allTittle); // this will print all the card titles on the page

// console.log(await page.locator(".alert-success").textContent());
// await expect(page.locator(".alert-success")).toContainText('Success');


});

test('Page Playwright test', async ({page})=>{
    await page.goto('https://www.google.com/');
    //get tittle - assertion
    //console.log means to print the tittle/output in the console
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
    
})

test('UI Controls',async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   const userName = page.locator("#username")
   const signInBtn = page.locator("#signInBtn");
   const dropdown = page.locator("select.form-control");
   const documentLink = page.locator("[href*='documents-request']");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();

    //isChecked method is used to check if the radio button is checked or not, we can use it to verify if the radio button is checked or not
    console.log(await page.locator(".radiotextsty").last().isChecked());


   // assertion to verify if the radio button is checked or not
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(page.locator("documentLink")).toHaveAttribute

// await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
//await page.pause();
// await userName.type("rahulshetty");
// await page.locator("[type='password']").type("Learning@830$3mK2");
// await signInBtn.click();

});

test('Child windows',async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage]= await Promise.all([ // Array of promises, we can use it to wait for multiple promises to resolve before performing any actions on the page
     context.waitForEvent('page'),// we use the waitForEvent method to wait for the new page to open, we can use it to wait for the new page to open before performing any actions on the new page
     documentLink.click(),
    ])// opens new page in new tab
     await newPage.waitForLoadState();
     const text = await newPage.locator(".red").textContent();
     const arrayText = text.split("@");
     const domain = arrayText[1].split(" ")[0];
     console.log(domain);
     console.log(text);
    

});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })



