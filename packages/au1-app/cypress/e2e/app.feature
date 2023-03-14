Feature: The Application

              'In order to ensure that application is built properly and can be started'
              'I want the system to display an initial set of features'

        Background:
            Given A webbrowser is on application home page

        Scenario: Display the application in an initial state
             Then I see the Application top-bar
              And I see text KPMG on the top-bar
