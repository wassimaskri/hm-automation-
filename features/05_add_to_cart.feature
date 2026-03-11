@cart
Feature: Add to Shopping Cart
  As a user on the H&M website
  I want to add a Relaxed Fit cotton shirt in size M to my cart
  So that I can proceed to purchase it

  Background:
    Given I am on the H&M homepage

  @smoke
  Scenario: Add a Relaxed Fit cotton shirt size M to the cart
    When I search for "Relaxed Fit cotton shirt"
    And I click on the first product result
    And I select size "M"
    And I click the "Add to Cart" button
    Then the product should be added to my shopping cart

  Scenario: Size selector is visible on product page
    When I search for "Relaxed Fit cotton shirt"
    And I click on the first product result
    Then the size selector should be displayed