# Pawgress
- Jennifer Ho
- Jesse Preble
- Stephen Zhu
- Dahna Ahn

### Intended Market
---
We are targeting business owners in the pet industry seeking an encapsulating platform for optimal organization.

### Functionality
---
- Upon initial visit, our visitors will view our main page which includes:
  - Basic information about the services provided at the facility
  - A contact form for inquiries/comments
  - A donation page
  - A signup page to make a new account and sign in
- If given trainer authorization the user will be directed to the users platform which includes:
  - The ability to create a new class for customers
  - A list of all upcoming classes
  - A list of all trainers information
  - The ability to create a new room for boarding
  - A list of all the existing rooms and their occupancy status
  - A list of all the pets currently at the facility
  - The ability to manually add a pet to the list of pets
  - A list of the full history of both training and boarding
- If given customer authorization the user will be redirected to the customer platform which includes:
  - Show the user's personal information and the ability to update information as needed
  - The ability to edit their pet's information
  - The ability to submit a form requesting a boarding service
  - The ability to sign up for a training class
  - A list of the complete history of the training and boarding of their pet

### Project Initialization
---
To begin this application on your local machine, please follow these steps:
1. Clone the repository to your local machine
2. CD into the new project directory
3. Run `docker volume create pawgress-db`
4. Run `docker compose build`
4. Run `docker compose up`
