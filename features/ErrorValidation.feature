Feature: Ecommerce2 Error validations
  @Validation
  Scenario Outline: Login functionality with invalid data

    Given user logs in to the Ecommerce2 application with "<usename>" and "<password>"
    Then verify error message is displayed    

  Examples:
   |   usename         |password|
   | aabbccdd@gmail.com| Bbbbbb@1|
   | helper@gmail.com  | helper@1|