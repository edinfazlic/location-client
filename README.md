# Meta info

Application showcases knowledge of:
  - Angular
    - Component communication
    - Lifecycle hooks utilization
    - Handling material components (Table, Dialog...)
    - Forcing OnPush change detection strategy 
    - Using flex layout
    - Using material design icons
    - Using pipes (async, number)
  - State management with NGXS
    - Actions - with and without payload
    - States - specific for a feature or certain set of features
    - Selectors - plain and calculated ones
    - Chaining actions
    - Joining selectors
    - Sharing state
    - Softening the impact of NGXS 4 by defaulting injectContainerState to false
  - Reactive programming with RxJS library
    - Passing Observable as a parameter, variable, object
    - Immediately subscribing to Observables
    - Pipe usage for multiple async calls
  - Map (with OpenLayers)
    - Projections handling
    - Base tile layer configuring
    - Data displaying / Drawing on the map
    - Interacting with the map / Layers and overlay manipulation
    - Animating the map
  - Typescript
    - Object spread (mostly used to update state - NGXS)
    - Fat-arrow functions (preserving "this" context and making code more readable with meaningful names)
    - Partial (mostly used as payload for the action - NGXS)
  - General
    - REST calls
        - GET with parameters
        - POST and PUT with body 
        - DELETE with path variable
    - Data structures
        - Array for locations management, upon which JS array methods were used (map())
    - Helpers and utility classes with mostly static content
    - Fine CSS styling
    - Having git commit messages readable
  - Concepts
    - Separation of concerns
    - "N-tier architecture"
        - Display and styling only, without any logic (HTML template and CSS) - only communicates with Controllers
        - Logic
            - Small and component specific (Controllers) - only communicates with States and Logic Services
            - Otherwise in ~~State~~ (Logic Service)
        - Invoking outside of the application (Fetch Services) - only communicated by States and Logic Services
    - Linting (with TSlint - strict but not AirBnB rules)
    - Refactoring (Introducing NGXS, updating all components to OnPush change detection strategy...)
    - Prototyping (Fast completion without full functionality displaying test concept, process or design)
  - Operations
    - Setting different environments (development and production)
    - Deploying application

# Location Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

1. Have server api ([found here](https://github.com/edinfazlic/location-api)) running. 
1. Run `ng serve` or `npm start` and navigate to `http://localhost:4200/`. 
