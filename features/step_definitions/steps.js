const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect} = require('@playwright/test');
const{playwright} = require('@playwright/test');
const { chromium } = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}',{timeout : 100*10000}, async function (username,password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await chromium.launch({
       // headless:false
    });
    const context = await browser.newContext();
    this. page = await context.newPage();
    this.poManager = new POManager(this.page);
    // js file login js, dashboard
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
});

When('the user adds {string} to the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
     this.dashboardPage = this.poManager.getDashboardPage();
    await this. dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', { timeout: 300000 },async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

});

When('Enter valid details  and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect('ind', 'India');
    this. orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
});

Then('Verify the order is present in the order history', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

