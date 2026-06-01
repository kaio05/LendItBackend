Feature: User login
    A user should be able to login with the right credentials

    Scenario Outline: The credentials are valid or not
        Given email is "<email>"
        Given password is "<password>"
        When I try to login
        Then I should be told "<answer>"

    Examples:
        | email              | password | answer     |
        | user1@email.com    |  12345   | Logged in! |
        | user1@email.com    |  11111   | Invalid credentials! |
        | notauser@email.com |  11111   | Invalid credentials! |