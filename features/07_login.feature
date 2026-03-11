Feature: User Login

  Scenario: Login with valid credentials
    Given I open the H&M homepage
    When I click on the login button
    And I login with email "wassim.askri@outlook.fr" and password "Wassim99"
    Then I should be logged in successfully