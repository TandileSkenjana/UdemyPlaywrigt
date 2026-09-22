import { test, expect } from '@playwright/test';

test('Book Flow', async ({ page }) => {
  const email = 'anshika@gmail.com';
  const password = 'Iamking@000';
  const eventTitle = 'Playwright Automation Workshop';

  let seatsBeforeBooking = 0;
  let bookingRef = '';

  // Login
  await page.goto('https://eventhub.rahulshettyacademy.com/');
  await expect(
    page.getByRole('link', { name: 'API Documentation (Swagger)' })
  ).toBeVisible();

  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.locator('#login-btn').click();

  await expect(
    page.getByRole('link', { name: 'EventHub' })
  ).toBeVisible();

  // Go to Admin
  await page.getByRole('button', { name: 'Admin' }).click();

  await expect(
    page.getByRole('link', { name: 'Manage Bookings' })
  ).toBeVisible();

  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Manage Events' })
    .click();

  await expect(
    page.getByRole('row', { name: 'Title Category City Date' })
  ).toBeVisible();

  // Add Event
  await page.getByLabel('Title').fill(eventTitle);
  await page.getByLabel('City').fill('Bangalore');
  await page.getByLabel('Venue').fill('12 forest village');
  await page
    .getByRole('textbox', { name: 'Event Date & Time*' })
    .fill('2028-07-02T12:02');

  await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('100');

  await page.getByTestId('add-event-btn').click();

  await page.getByText('Events', { exact: true }).click();

  // Find Event Card
  const eventCards = page.getByTestId('event-card');

  await expect(eventCards.first()).toBeVisible();

  const matchingCard = eventCards.filter({
    hasText: eventTitle,
  });

  await expect(matchingCard).toBeVisible({ timeout: 5000 });

  const seatsText = await matchingCard
    .locator('text=/seat/i')
    .innerText();

  seatsBeforeBooking = parseInt(
    seatsText.match(/\d+/)?.[0] || '0',
    10
  );

  console.log('Seats Before Booking:', seatsBeforeBooking);

  // Book Event
  await matchingCard.getByTestId('book-now-btn').click();

  await expect(page.locator('#ticket-count')).toHaveText('1');

  await page.getByLabel('Full Name').fill('Anshika Sharma');
  await page.locator('#customer-email').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

  await page.locator('.confirm-booking-btn').click();

  // Verify Booking Confirmation
  const bookingRefElement = page.locator('.booking-ref').first();

  await expect(bookingRefElement).toBeVisible();

  bookingRef = (await bookingRefElement.innerText()).trim();

  console.log('Booking Reference:', bookingRef);

  // View My Bookings
  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(/.*\/bookings$/);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();

  const matchedBookingCard = bookingCards.filter({
    has: page.locator('.booking-ref', { hasText: bookingRef }),
  });

  await expect(matchedBookingCard).toBeVisible();

  await expect(matchedBookingCard).toContainText(eventTitle);

  // Verify Seat Reduction
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  const eventCardsAfterBooking = page.getByTestId('event-card');

  await expect(eventCardsAfterBooking.first()).toBeVisible();

  const matchingCardAfterBooking = eventCardsAfterBooking.filter({
    hasText: eventTitle,
  });

  await expect(matchingCardAfterBooking).toBeVisible();

  const seatsTextAfterBooking = await matchingCardAfterBooking
    .locator('text=/seat/i')
    .innerText();

  const seatsAfterBooking = parseInt(
    seatsTextAfterBooking.match(/\d+/)?.[0] || '0',
    10
  );

  console.log('Seats Before Booking:', seatsBeforeBooking);
  console.log('Seats After Booking:', seatsAfterBooking);

  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});