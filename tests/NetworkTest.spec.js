const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const loginPayload = {userEmail: "tandileskenjana@gmail.com", userPassword: "Tandile2000"};
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders= {data:[],message:"No Orders"};

let response;
test.beforeAll( async()=>
{
  
  const apiContext = await request.newContext();
  const apiUtils=new APiUtils(apiContext,loginPayload);
  response = await apiUtils.createOrder(orderPayload); 
})
// create order successfully
 test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
 
 
});


//create order is success
//request module is used to make API requests, we can use it to make API requests to the server and get the response from the server
//beforeAll method is used to run the code before all the tests in the file, 
//beforeEach method is used to run the code before each test in the file, 
