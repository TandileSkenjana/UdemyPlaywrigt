import { test as base, request, type Page } from '@playwright/test';
import { APiUtils } from './APiUtils';

type LoginPayload = {
  userEmail: string;
  userPassword: string;
};

type OrderPayload = {
  orders: Array<{
    country: string;
    productOrderedId: string;
  }>;
};

type OrderResponse = {
  token: string;
  orderId: string;
};

type CustomFixtures = {
  authenticatedPage: Page;
  createOrder: OrderResponse;
  testDataForOrder: {
    productName: string;
  };
};

const loginPayload: LoginPayload = {
  userEmail: 'rahulshettyw@gmail.com',
  userPassword: 'Learning@830$3mK3',
};

const orderPayload: OrderPayload = {
  orders: [{ country: 'India', productOrderedId: '6960eac0c941646b7a8b3e68' }],
};

export const customtest = base.extend<CustomFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.fill('#userEmail', 'rahulshettyw@gmail.com');
    await page.fill('#userPassword', 'Learning@830$3mK3');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await use(page);
    await context.close();
  },

  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    await apiContext.dispose();
  },

  testDataForOrder: {
    productName: 'ADIDAS ORIGINAL',
  },
});