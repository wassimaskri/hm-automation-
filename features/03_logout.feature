@logout
Feature: User Logout (Sign Out)
  As a logged-in user on the H&M website
  I want to be able to sign out of my account
  So that my account is protected when I leave the device

  @smoke
  Scenario: Logout via direct URL
    Given I am on the H&M homepage
    When I navigate to the logout URL
    Then the login page should be displayed