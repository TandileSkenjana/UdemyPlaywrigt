import { test, expect } from "allure-playwright";
import {customtest} from '../utils/test-base';
import { POManager } from "../pageobjects-ts/pageobjects/POManager";
import { LoginPage } from "../pageobjects-ts/pageobjects/LoginPage";
import { DashboardPage } from "../pageobjects-ts/pageobjects/DashboardPage"; 

declare const require: (id: string) => any;

const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
for (const data of dataSet) {
  test(`@Webs Client App Login for ${data.productName}`, async ({ page }) => {
    

    
      const poManager = new POManager(page);
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await loginPage.goTo();
      await loginPage.validLogin(data.username, data.password);
      await dashboardPage.searchProductAddCart(data.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductIsDisplayed(data.productName);
      await cartPage.Checkout();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect('ind', 'India');

      const orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);

      expect(orderId).not.toBeNull();
      const orderIdValue = orderId ?? "";

      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderIdValue);

      const orderIdInHistory = await ordersHistoryPage.getOrderId();
      expect(orderIdInHistory).not.toBeNull();
      expect(orderIdValue.includes(orderIdInHistory ?? "")).toBeTruthy();


  });

  customtest('Client App login', async ({ page, testDataForOrder }: { page: any; testDataForOrder: any }) => {

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