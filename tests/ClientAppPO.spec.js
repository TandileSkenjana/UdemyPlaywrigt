const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');

const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
for (const data of dataSet) {
  test(`Client App Login for ${data.productName}`, async ({ page }) => {
    await placeOrder(page, data.username, data.password, data.productName);


    async function placeOrder(page, username, password, productName) {
      const poManager = new POManager(page);
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await loginPage.goTo();
      await loginPage.validLogin(username, password);
      await dashboardPage.searchProductAddCart(productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(productName);
      await cartPage.Checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect('ind', 'India');
      const orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);

      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    }
  })



  customtest('Client App login', async ({ page, testDataForOrder }) => {

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