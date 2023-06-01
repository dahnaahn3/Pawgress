The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

## 5/10/23

Wireframing and design

## 5/12/23

api endpoint design

## 5/15/23

Finally starting to code, creating journals, beginning work on database.

## 5/16/23

Backend authentication is up and running. Today we worked on combining the customer and trainer tables directly into one user table. We also added a role to the user table. Some other small changes were made to the docker-compose.yaml to fix the api container crashing from the database not being up yet.
We decided on how to set up our roles and creating trainer roles.

## 5/17/23

worked as a group to create pet backend endpoints

## 5/18/23

work on reservation end points

## 5/19/23

more work on reservation endpoints

## 5/22/23

Attempted front end authentication, ran into trouble with getting the token. One of the backend endpoints for the authentication/getting a token was missing a field so it was giving a validation error. It took several hours of troubleshooting to finally solve the issue.

## 5/23/23

Continued work on the front end. Created pages for the boarding reservation and training reservation forms.

## 5/24/23

Continued working on the front end. Ran into an issue with the react router. After a few hours, finally found a way to have the nested routes work properly. There are a few ways to implement it so we will work on it further in the coming days.

## 5/25/23

## 5/30/23

Today I worked on adding styling to the boarding history, training history, boarding sign up, and training sign up forms. We also troubleshooted a bug with the navigation on the customer side. When nesting the routes under customerHome, we were getting unexpected issues but we finally solved it. This was an issue that had been plaguing us for weeks. Also we figured out how to get the user information from the token on the history pages.
