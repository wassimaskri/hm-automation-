@search
Feature: Product Search
  As a user on the H&M website
  I want to search for a specific product
  So that I can quickly find what I am looking for

  Background:
    Given I am on the H&M homepage

  @smoke
  Scenario: Search for a Relaxed Fit cotton shirt
    When I search for "Relaxed Fit cotton shirt"
    Then I should see search results
    And the results should contain relevant shirt products

  Scenario: Search results page loads for a valid query
    When I search for "shirt"
    Then the search results page should load
    And at least one product should be displayed