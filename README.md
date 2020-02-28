# Location Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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
        - POST with body 
        - DELETE with path variable
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
