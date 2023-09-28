# Technical assignment

We would like to build a web UI for our platform. Our backend is ready and API specs are available here: https://february-21.herokuapp.com/swagger/

# Requirements
The test can be completed in a JS framework of your choice, but the use of Vue and Typescript would be a bonus as this is our stack.
1. Implement authentication UI. You may use `POST /api/v1/users/` endpoint to create new users and `POST /api-token-auth/` to get the authentication token.
2. Build a UI that allows seeing the list of available suppliers.
3. Build a UI where we can see details of the specific supplier.
4. Build a UI where we can see the created quotes.
5. Upload your code to github. Please make the repository public or provide access to the private repository on Github to `martinOpply`, `andrealucchese` and `Huzaifa-Sajjad`
   .
6. Deploy your code somewhere so that it is possible to review how it works.

# Shortcuts

We expect that the technical assignment takes under 4 hours. If you believe that it requires more time, there's a couple of shortcuts available:

1. You may avoid building signup if you use `username:password` user which is already in the system
2. You could also avoid handling the token retrieval by using the existing token `d0932c14d763289c638c53e879749299a670fdc7`
3. If you're not sure where/how to deploy your solution, you may try using Netlify as it's rather straightforward there. Or just share the repo with the code.