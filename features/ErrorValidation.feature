Feature: Ecommerce2 Error validations

  @Validation
  Scenario Outline: Login functionality with invalid data

    Given user logs in to the Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed

    Examples:
      | username              | password    |
      | invaliduser@gmail.com | wrongpass@1 |
