import { test, expect } from '@playwright/test';

test('Playwright Special locators', async ({ page }) => {

  // slowExpect is used to set the timeout for the expect assertion, we can use it to set the timeout for the expect assertion
  const slowExpect = expect.configure({ timeout: 9000 }); // this is used to set the timeout for the expect assertion, we can use it to set the timeout for the expect assertion
  test.setTimeout(60000); // this is used to set the timeout for the test, we can use it to set the timeout for the test

  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("123qbc");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText("Success! The Form has been submitted successfully!").isVisible();

  // 5 seconds default timeout for expect assertions --{timeoout:10000} Step Level
  await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({ timeout: 10000 });
  await page.getByRole("link", { name: "Shop" }).click();

  await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");

  await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
  // await page.locator(".nav-link.btn.btn-primary").click();
  // await page.locator("body > app-root:nth-child(1) > app-shop:nth-child(3) > div:nth-child(2)").isVisible();


  // await page.pause();

  await page.getByText('Checkout ( 1 ) (current)').click();
  await expect(page.getByRole('row', { name: 'Nokia Edge by Sim cart Status' })).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toBeVisible();

  await page.getByText('I agree with the term &').click();
  await expect(page.getByRole('checkbox', { name: 'I agree with the term &' })).toBeVisible();

  await page.getByRole('button', { name: 'Purchase' }).click();

  await page.locator('div.alert.alert-success.alert-dismissible:visible').isVisible();
  await page.getByText('× Success! Thank you! Your').cli







})