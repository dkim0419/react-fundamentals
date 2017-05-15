/*
- Flux is an architecture introduced by Facebook, it proposes a uni-directional data flow
  - Flux is one of the more challenging patterns to wrap your head around
  - Don't start using Flux when getting started with ReactDOMServer
  - It can be difficult to reason about the usefullness of the patterns in Flux if
    you haven't already tried to solve the same problems without it.

  - That being said, I've found Flux to be a useful pattern when working on larger
    applications
  - Flux makes it easy to reason about changes to state

  - The 2 important questions:
    - What state is there?
    - When does it change?


Flux - data flow
╔══════════╗     ╔════════════╗     ╔══════════╗     ╔═══════════╗
║  Actions ║––––>║ Dispatcher ║––––>║   Store  ║––––>║   Views   ║
╚══════════╝     ╚════════════╝     ╚══════════╝     ╚═══════════╝
     ^                                                     │
     └─────────────────────────────────────────────────────┘

- Views
  - React components (see components)
  - Create actions (see actions/ViewActionCreators.js)

- Actions
  - What actions can the user do that will change the state?
  - e.g. "like post", "delete comment"
  - API requests
  - Send actions through the dispatcher

- Dispatcher
  - The only actual code Facebook's flux repo gives you!
  - Synchronous dispatch of actions to ALL registered listeners (stores)
  - Ensures only one action happens at a time

- Stores
  - Store the state of your app
  - Listen for actions from the dispatcher, so they know when to update state
  - Notify listeners when the state changes
*/
