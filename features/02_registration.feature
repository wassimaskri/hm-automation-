@registration
Feature: User Registration (Sign Up)
  As a new visitor on the H&M website
  I want to create an account
  So that I can benefit from personalized shopping and order tracking

  Background:
    Given I am on the H&M login page

  @smoke
  Scenario: Navigate to the registration form
    When I click on the "Create account" link
    Then I should see the registration form

  Scenario: Registration form contains required fields
    When I click on the "Create account" link
    Then I should see a field for first name
    And I should see a field for last name
    And I should see a field for email address
    And I should see a field for password

  Scenario Outline: Fill in the registration form
    When I click on the "Create account" link
    And I fill in the registration form with:
      | firstName | <firstName> |
      | lastName  | <lastName>  |
      | email     | <email>     |
      | password  | <password>  |
    And I submit the registration form
    Then I should be redirected away from the registration page

    Examples:
      | firstName | lastName | email                             | password   |
      | Jean      | Dupont   | jean.dupont.test123@mailnull.com  | Test@1234! |
      | Marie     | Martin   | marie.martin.test456@mailnull.com | Test@5678! |