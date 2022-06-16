# My Thought Process to design the solution

The first step was to read the requirements carefully and understand what was required.

Then I came up with 2 solutions here.
First one, the best scalable and efficient one is using a db like mongo or postgres. It have functions like spherical geometry or earth_distance in postgres

But since the exercise required me to do it using the formula, I went with the solution below.

I created separate frontend and backend applications. Keeping in the mind the requirements to be scalable, well-architected, structured and designed

In the backend side I implemented the Haversines formula, the api will iterate through the list of addresses and get the one within range return sorted by organisation name in ASC order.

On the front end side I used multiple components and assumed the lat/lng of Rami (CEO) will come from the backend so added those as default lat/lng for the exercise.
There I added an input field which will take the distance in KM and on clicking the Get Partners button the app will make the call to the backend to get the list of partners.

### Implementation Thought Process Backend:

1. To design the backend, I went with the Routes, Controllers & Service Structure.
2. Also to include eslint, jest config, and swagger docs.
3. Now it was time to decide on the routes so the get API & added the respective controller and service.
4. Had to decide the proper validations schema, response codes & error code for the app.
5. In the common folder I added the distance calculation function based on the Haversine formula.
6. I did some research about haversine formulas and then coded it.
7. After that using some online implementations and online sphere distance calculators verified my code for the formula if working correctly.
8. Made sure everything was properly typed
9. Now time to add the unit tests for commons & services,
10. Lastly added integration tests for the whole API to test all the functions working together.
11. Made sure the test coverage was 100%
12. Updated the swagger docs.

### Implementation Thought Process Frontend:

1. I went with react, keeping a simple but scalable structure.
2. Configured eslint & prettier
3. Added an API.ts where the backend API was configured.
4. Decided to keep the input, button and the list of addresses in separate component
5. Assumed the default values for the Rami (CEO) coordinates.
6. Used SCSS for styling.
7. Made sure everything was properly typed.
8. Add tests and also added mocks for axios.
9. Made sure coverage was 100%
