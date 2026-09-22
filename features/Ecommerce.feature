Feature: Ecommerce
  @Regression // tagging the feature file
  Scenario Outline: Placing an order
    Given a login to Ecommerce application with "<username>" and "<password>"
    When the user adds "zara coat 3" to the cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details  and place the order
    Then Verify the order is present in the order history

    Examples:
          | username    	  | 	password  |
          | yeeeye@gmail.com| 123456789  |







		# Scenario Outline: Say bye
		# Given a login to Ecommerce2 application with "<username>" and "<password>"
		# Then Verify Error message is displayed

		#  Examples:
    #       | username    	  | 	password  |
    #       | yeeeye@gmail.com| 123456789  |
       