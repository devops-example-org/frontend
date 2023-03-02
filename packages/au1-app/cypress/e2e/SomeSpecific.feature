Feature: Some Specific Feature

              'In order to ensure that user can... do it'
              'I want the system to provide the user with... something :)'

        Background:
            Given A webbrowser is on application home page

        Scenario: Display the application in an initial state
             Then I enter the text David into textbox
              And I see text David below
