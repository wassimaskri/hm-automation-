@wishlist
Feature: Add Product to Favourites
  As a user on the H&M website
  I want to add a product to my favourites
  So that I can save it for later without adding it to my cart

  Background:
    Given I am on the H&M homepage

  @smoke
  Scenario: Add a product to favourites from the product detail page
    Given I search for "jacket"
    And I click on the first product result
    And the "Add to Favourites" button should be visible
    When I click the "Add to Favourites" button
    Then the product should be marked as a favourite