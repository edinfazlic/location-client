# Locations
This is an application for real life locations (with coordinates) management. Visualisation is provided through interactive map. Whether searching for a specific location or locations within given radius, do it with ease.

## Used
- Angular, version 8
- NGXS, for state management
- OpenLayers, for map displaying
- TSlint (plus codelyzer), for static code analysis
- Material design icons
- GitHub, for review

## Functionalities
This is an application with a single page, but multiple panels: Table, Search, and Map. 
- Table panel
  - Lists locations displaying their id, name, and coordinate
  - Each location can be edited and deleted
  - There is an option to animate the map to focus on (go to) specific location
  - Hovering over the row in the table highlights the location on the map
  - Double clicking the id, will automatically copy and paste it into the search
- Search panel
  - To search, a radius has to be provided and a referent point
  - There are two ways of searching
    - From a specific, previously entered, location, setting reference with an ID
    - From a manually typed coordinate
  - There is a button to clear the search panel
  - After successful search, table and map data are updated, having map animating the focus on the result set
  - There is also a button to create a new location by manually typing all the information (through popup)
- Map panel
  - Map is interactive, can be panned, zoomed in/out, with buttons and mouse scroll
  - Clicking on the map, allows two things
    - To create a new location from that point, adding in just the name, by typing it
    - To set that point as a reference in the search panel

## Meta info
Application showcases knowledge of:
  - Angular
    - Component communication
    - Lifecycle hooks utilization
    - Forcing OnPush change detection strategy 
    - Using pipes (async, number)
    - Handling material components (Table, Dialog...)
    - Using material design icons
    - **Using flex layout**
  - **State management with NGXS**
    - Actions - with and without payload
    - States - specific for a feature or certain set of features
    - Selectors - plain and calculated ones
    - **Chaining actions**
    - **Joining selectors**
    - **Sharing state**
    - **Softening the impact of NGXS 4 by defaulting injectContainerState to false**
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
    - **Object spread (mostly used to update state - NGXS)**
    - Fat-arrow functions (preserving "this" context and making code more readable with meaningful names)
    - **Partial (mostly used as payload for the action - NGXS)**
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

## Development server
1. Have server api ([found here](https://github.com/edinfazlic/location-api)) running. 
1. Run `ng serve` or `npm start`
1. In your browser navigate to `http://localhost:4200/`. 
