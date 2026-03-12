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
    Then I should see the registration form "lahekem571@flosek.com"
    Then I Click on the Contineur
    Then I should fill a valid password
    Then I should fill date of birth with day "16", month "02", year "1998"
    Then I submit the registration form
    Then I click on the "Visit account" link
    Then I should be redirected away from the registration page 

  # Scenario: Registration form contains required fields
  #   When I click on the "Create account" link
  #   Then I should see a field for first name
  #   And I should see a field for last name
  #   And I should see a field for email address
  #   And I should see a field for password
  #   And I should see fields for date of birth

  # Scenario: Fill in the registration form
  #   When I click on the "Create account" link
  #   And I fill in the registration form with:
  #     | firstName | Wassim |
  #     | lastName  | Askri  |
  #     | email     | w.askri@outlook.com |
  #     | password  | Wassim99A |
  #   And I fill in date of birth with day "15", month "07", year "1990"
  #   And I submit the registration form
  #   Then I should be redirected away from the registration page