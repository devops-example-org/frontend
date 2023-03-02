Feature: Some Specific Feature

              'In order to ensure that user can... do it'
              'I want the system to provide the user with... something :)'

        Background:
            Given A webbrowser is on application home page

        Scenario: The text entered to textbox should be displayed below
             When I enter the text David into textbox
             Then I see text David below
