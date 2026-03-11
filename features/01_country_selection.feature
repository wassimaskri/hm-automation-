@country
Feature: Country Selection
  As a user visiting the H&M website
  I want to be able to select my country
  So that I can view localized content and prices

  Background:
    Given I am on the H&M homepage

  @smoke
  Scenario: Navigate to the France version of the website
    When I navigate to the France version of the H&M website
    Then the website should display the French locale

  @smoke
  Scenario: Navigate to the Germany version of the website
    When I navigate to the Germany version of the H&M website
    Then the website should display the German locale

  Scenario: Homepage loads correctly
    Then the homepage should be loaded successfully
    And the page should have navigation elements