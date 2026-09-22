const {test, expect} = require('@playwright/test');

test('Client App Login', async ({page}) => {
    const email="tandileskenjana@gmail.com";
    const productName = 'ZARA COAT 3';
    const products=page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Tandile2000");
    await page.locator("[value='Login']").click();
    // waitForLoadState method is used to wait for the page to load completely, we can use it to wait for the page to load before performing any actions on the page
    //networkidle means that the page has finished loading and there are no more network requests being made, we can use it to wait for the page to load completely before performing any actions on the page
    await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor();
    const tittles= await page.locator(".card-body b").allTextContents();
    console.log(tittles);

    const count = await products.count();// count method is used to get the number of elements in the locator, we can use it to get the number of products on the page
    for(let i=0; i<count; ++i)// we use the for loop to iterate through the products and get the text of each product, we can use it to get the text of all the products on the page
        {
            if( await products.nth(i).locator("b").textContent()=== productName)
             {
                await products.nth(i).locator("text = Add To Cart").click();
                break;
            }
       }
     await page.locator("[routerlink*='cart']").click(); 
     await page.locator("div li").first().waitFor();
     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
     expect (bool).toBeTruthy();
     await page.locator("text = Checkout").click();


     await page.locator("Credit Card").isVisible;
     await page.getByRole('textbox').nth(1).click();
     await page.getByRole('textbox').nth(1).fill('123');
     await page.getByRole('textbox').nth(2).fill('Tskenjana');
     //await page.locator('input[name="coupon"]').click();
     await page.getByRole('button', { name: 'Apply Coupon' }).click()
     //expect(bool).toBeTruthy();
     //await page.pause();

     await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
     //await page.locator("[placeholder*='Country']").type("South",{delay:100});
     const dropdown = page.locator(".ta-results");
     await dropdown.waitFor();
     const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
       
//     await page.pause();




});



