Feature: Ecommerce

  Scenario: Placing an order
    Given a login to Ecommerce application with "yeeeye@gmail.com" and "123456789"
    When the user adds "zara coat 3" to the cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details  and place the order
    Then Verify the order is present in the order history