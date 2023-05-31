## May 30, 2023

[Today, I worked on:

- Added functionally to outreach to Pawgress on Contact Page
- Worked through customer token issues with team
- Refreshed the team page

Troubleshooting by console.logging is the most way to understand
what might be causing certain issues
]
## May 25, 2023

[Today, I worked on:

- Worked through React hot loading issues
- Created the customer landing page, customer profile page,
  and pet profile pages

I had to troubleshoot React not hot loading. A fix to another
problem was deleting the node_modules and re-running the container,
but that triggered the change in React. I was able to solve it by
adding a file called .env with "FAST_REFRESH=false" as the content.
]

## May 24, 2023

[Today, I worked on:

- Worked through React hot loading issues
- Created the customer landing page, customer profile page,
  and pet profile pages

I had to troubleshoot React not hot loading. A fix to another
problem was deleting the node_modules and re-running the container,
but that triggered the change in React. I was able to solve it by
adding a file called .env with "FAST_REFRESH=false" as the content.
]

## May 23, 2023

[Today, I worked on:

- Jesse and I worked through how to creating the front-
  end auth

We spent the whole day troubleshooting what could be wrong
with the front-end that prevented the sign in functionality
from working - we saw a multitude of errors from CORS to
TypeErrors to Validation Errors... it ended up being a
backend issue. Lesson to learn - if you have a validation
error, it's likely related to the routers and the strict
validation of pydantic models! Also, be aware that not all
errors show you the source of the problem - be smart
]

## May 22, 2023

[Today, I worked on:

- Started front-end auth with creation of log-in form

]

## May 18, 2023

[Today, I worked on:

- We started individual work today. I worked on
  completing the user endpoints, which required the
  creation of new Pydantic models for inputs and
  outputs. I additionally had to think through
  independent password update endpoint

- With Jesse, we worked through how to create the
  many-to-many relationship between pets &
  reservations with a junction table

I had an issue with the interactive fastAPI interface
not updating the API urls accordingly. The solution
ended up being a hard refresh - always a good way to
try to solve any problems that don't make sense!
]

## May 17, 2023

[Today, I worked on:

- As a team, we worked together to create our first
  endpoint together!

]

## May 16, 2023

[Today, I worked on:

- As a team, we finalized our database tables and
  aligned on datatypes needed in the migrations folder
  for the foundation of the project.

]
