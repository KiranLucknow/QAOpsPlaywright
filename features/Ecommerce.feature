Feature: Ecommerce validations
  @Regression
  Scenario: Placing the order

    Given user logs in to the application with "aabbccdd@gmail.com" and "Bbbbbb@1"
    When Add the product "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    Then Verify "aabbccdd@gmail.com" is in the checkout page
    When Enter the "ind" and select the " India" and place the order
    Then verify order is present in the order history



  @Validation
  Scenario Outline: Login functionality with invalid data

    Given user logs in to the Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed

    Examples:
      | username           | password |
      | aabbccdd@gmail.com | Bbbbbb@1 |
      | helper@gmail.com   | helper@1 |