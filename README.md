# Asteroids

[Live Link]: trippdavis.github.io

- [X] Create accounts
- [X] Create sessions (log in)
- [X] View recommended groups
- [X] Search for groups
- [X] View group events
- [X] Join groups
- [X] View joined groups
- [X] View events for joined groups
- [X] Search for events
- [X] Join events
- [X] View joined events
- [X] Create groups
- [X] Create events for created groups

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1/2 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create an account
and sign in, where they will redirected to the user's profile page.

[Details][phase-one]

### Phase 2: Creating Groups (~1/2 day)
I will add a rails model and controller for groups so that data can be
stored and retrieved from the database. By the end of this phase, users will be
able to create groups and view a list of groups, as well as information on
specific groups. Users will also be able to edit and destroy groups.

[Details][phase-two]

### Phase 3: Viewing Groups (~1 day)
I will add an API route to serve group data as JSON, then add Backbone models
and collections that fetch data from those routes. By the end of this phase,
users will be able to create view, update, and destroy groups within a Backbone
app.

[Details][phase-three]

### Phase 4: Creating Events (~1/2 day)
I will add a rails model and controller for events so that event data can be
stored and retrieved from the database. The route to create a new event will be
nested under groups so the controller can access the group id. By the end of
this phase, users will be able to create events for an group and view a list of
events, as well as information on specific events. Users will also be able to
edit and destroy events.

[Details][phase-four]

### Phase 5: Viewing Events (~1 1/2 days)
I will add an API route for events and adjust the JSON response built by the
groups controller to include event data, then add Backbone models and
collections that fetch data from those routes. By the end of this phase,
users will be able to create, view, update, and destroy events within the
Backbone app.

[Details][phase-five]

### Phase 6: Joining Groups and Events (~1/2 day)
I will add a rails model and controller to be able to store and retrieve join
data from the database. The user model will be updated to store its joined
groups and events. Joins will be polymorphic so that the same model and
collection can be used to represent joining an event and a group. By the end of
this phase, users will be able to join events and groups and view a list of
events and groups that they have joined.

[Details][phase-six]

### Phase 7: Viewing Joined and Organized Groups and Events (~2 days)
I will add a root view that will display groups and events for the user in three
categories: created, joined, and recommended. By the end of this phase, users
will be able to navigate to the root page and view the desired groups and
events.

[Details][phase-seven]

### Phase 8: Search for Groups and Events (~2 days)
I will add search routes to both the Groups and Events controllers. On the
Backbone side, there will be a SearchResults composite view that has GroupsIndex
and EventsIndex subviews. These views use events and groups collections, but
will fetch from the new search routes.

[Details][phase-eight]

### Bonus Features (TBD)
- [X] Interests
- [ ] Calendar Features (event time)
- [ ] Mapping Features (event location)
- [ ] Comments or Reviews (events and groups)
- [ ] User profile page
- [ ] Infinite scroll (events and groups)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
