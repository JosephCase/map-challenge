# Map challange

## What I would improve or do differently if I had more time.

Generally I feel like several parts of the app could be improved with a little more time:

- I would have liked to spend a bit more time to tidy up the initialisation of google-maps, the solution seems to work, but I feel it could be improved a bit, I'm not entirely convinced about storing the google instance in state, perhaps should be a ref.
- Overall the readibility of the main solution could be improved a bit, there is quite a lot going on with different useEffects and pieces of state, I would like to see if the overall complexity can be reduced a little bit. 
- It was my first time using apollo client, so ideally I would go back and study in a bit more detail to see if I could use the tool better.
- The map should zoom and center to show the pickup and dropoff points.
- I think the error badge should only appear when the user blurs the field, not when they are typing.
- I would add an error toast in case the job creation fails.
- Perhaps some subtle indication to the user that the address is being geocoded.
- For a larger app I would use a better styling library (or pattern) like styled-components.
- Think about responsive styling.
