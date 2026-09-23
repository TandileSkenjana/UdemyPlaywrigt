import { test, expect } from "allure-playwright";
import { customTest } from "../utils _ts/test-base";
import { POManager } from "../pageobjects-ts/pageobjects/POManager";

declare const require: (id: string) => any;

const dataSet = JSON.parse(JSON.stringify(require('../utils _ts /placeorderTestData.json')));
for (const data of dataSet) {
  test(`@Webs Client App Login for ${data.productName}`, async ({ page }) => {
    
    
      const poManager = new POManager(page);
     
const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId:any;
     orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();



      

  });

  customTest('Client App login', async ({ page, testDataForOrder }: { page: any; testDataForOrder: any }) => {

    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage(); 
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
  
  })
}