const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail: "tandileskenjana@gmail.com", userPassword: "Tandile2000"};
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
test.beforeAll( async()=>
{
  
  const apiContext = await request.newContext();
  const apiUtils=new APiUtils(apiContext,loginPayload);
  response = await apiUtils.createOrder(orderPayload); 
})
// create order successfully
test('API place the order', async({ page }) => 
{

  // addInitScript method is used to add the token to the local storage before the page is loaded.
  await page.addInitScript((value) =>
 {
   window.localStorage.setItem('token', value);
 }, response.token);

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows = await page.locator('tbody tr');

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

 // await page.pause();
});

//create order is success
//request module is used to make API requests, we can use it to make API requests to the server and get the response from the server
//beforeAll method is used to run the code before all the tests in the file, 
//beforeEach method is used to run the code before each test in the file, 
