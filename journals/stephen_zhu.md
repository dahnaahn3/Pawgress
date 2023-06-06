## May 8, 2023
Today, I worked on:

*Sample Modeling for Project

I drew up a sample project model for Pawgress with the Entities and Aggregates.

## May 9, 2023
Today, I worked on:

*Project Wireframe

The team and I worked on creating the wireframe based off of the modeling done the previous day.  We decided on what our pages would need and what type of view we wanted for the users.


## May 11, 2023
Today, I worked on:

*Finalizing project wireframe, and defining our project endpoints

Jesse, Jennifer, Dahna and I worked on finishing up the wireframes for presentation, and also began to start on our API endpoints for the project.

## May 16, 2023
Today, I worked on:

*Setting up Database Tables, getting Docker running, and connecting Beekeeper Studio

Jesse, Jennifer, Dahna and I worked together on finalizing our database tables and what datatypes we were going to need in the migrations folder for when we startup the application for backend.
Dahna and I pair programmed the authentication for our create, login, logout.

I was reminded today that extra "," break code as usual, and also to include a WAIT_HOST in the yml file is necessary precaution otherwise the container's will throw errors when starting for first time.  For some reason the return code didn't like us using a dot annotation for getting the dictionary

## May 17, 2023
Today, I worked on:

*Finalizing user for authentication, fixing docker container issues, creating first endpoint as a group, starting and finishing backend endpoints for a 'classes' table

Jesse, Jennifer, Dahna and I worked together on our first endpoint as a group for creating pets.  We solved our docker container issues where some of us would occasionally have containers not run because of the delayed startup for the database container.  I started and completed the first solo backend endpoint for the 'classes' database for the trainer side of the user.

I learned there're many exceptions to be used to catch errors to find what went wrong, sometimes using if, try and except statements properly will get the correct responses when exceptions dont work.

## May 18, 2023
Today, I worked on:

*Minor fixes to classes endpoint, Looking up Tailwind CSS

I made minor changes to the code blocks in classes queries to make the code more uniform after confirming everything worked.  The changes included changing some of the error respones from HTTPExceptions to "if and else" statements. I started doing some research on how to use Tailwind CSS for our frontend design.

## May 19, 2023 - May 21, 2023
The following days I worked on:

*template for Customer and Trainer home page layout

I worked on setting up the Home page for both customer and trainer navigation.  Did some research and tried putting together a skeleton of the sidebar navigation and top navitation

## May 22, 2023
Today, I worked on:

*Adding Finishing touches to the basic skeleton of the Frontend Trainer/Customer home page views, and started the ClassForm

I worked on using tempalates as reference on how I wanted the ui to look for both trainer and customer home pages, and applied to my already created template.  Then I started working on the ClassForm for creating classes.

## May 23, 2023
Today, I worked on:

*Finishing touches on ClassForm, started PetForm

I worked on fixing up some text error and syntax errors on the ClassForm and submitted early in the morning.  The I started working on the PetForm.

I had some challenges on the PetForms fetch call for getting the owner to show up in the drop down selection... will continue next day.

## May 24, 2023
Today, I worked on:

*Working on PetForm, and RoomForm for the Frontend.

I worked on fixing the problems that were on the PetForm trying to fetch the owner data and displaying it.  Also completed the RoomForm to create rooms with and without a pet assigned so many rooms could be created for visual purposes.  Jesse helped in solving the issue of my .map() issue not getting the the pets name to input properly.

I learned that with doing SQL it's different from django where I didn't have to apply the name of the table or keyword that was used as the ForeignKey when calling for the referenced table for example applying the .user after setting an attribute to the json response.

## May 25, 2023
Today, I worked on:

*Adding a Sign up form

I did some small fixes to the original Sign up form I made a week ago for users to sign up but didn't add into project because I thought the auth would do what we needed for the project.


## May 26, 2023
Today, I worked on:

*Adding auth and CSS to sign in form, customer and trainer views

I worked on adding authentication to sign in so it would check token and role to redirect to the correct views.  I also moved some CSS from a template Dahna made into the auth file.

## May 29, 2023
Today, I worked on:

*Adding filters to Customer/Trainer view pages

I added filters so that redirects would happen if the role of user did not match such as role: "trainer" if trying to go to localhost:3000/customers, it would redirect to localhost:3000/trainer and vice versa customer cannot go to trainer page view.  I also worked on adding some filters so that unless there's a token the view such as listings and forms will not render.

I figured out that token wasn't being saved globally so every time I hard refreshed, I would get sent back to the main page of localhost:3000.

## May 30, 2023
Today, I worked on:

*Fixing the saving of token when logging in so that it would be saved to localStorage that way when page is refreshed it doesn't redirect to the main page of localhost:3000 because of the unfound token between the refresh and when the token is fetched.  Jesse saw the problem that I was getting the 'token' but I wasn't 'setting it'.  After the solution was found I adde a removeItem('token') component so that it would delete the token information from localStorage at sign out.  Jesse, Jennifer and I dug around to find out why the forms and listings weren't showing up on the customer home page.  Eventually we figured out the problem was the redirect in the useEffect that checked for token role it was forcefully redirecting it to "/customers" before the list or form page could render.

I learned about localStorage set, get, and delete.

## May 31, 2023
Today, I worked on:

*
