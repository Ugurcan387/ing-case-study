# ING Case Study

## Installation
- Suggested node: v22.20.0
- Run 'npm install'
- To start the project use 'npm run dev' command

## Technologies
- [Vite] - frontend build tool
- [Vaadin-Router] - project routing
- [Lit] - library to build web components
- [Lit-Localize] - for lit localization
- [Redux] - for state management and data manipulation (as this is a frontend only project I used persisted redux state to keep data)

#### 3rd Party packages
 - [lit-flatpickr] - a custom component for date picker.

## Features
- `Multi language` - you can switch language from flag icon on the header
- `Multiple List types` - you can change display type of the project on the overview page by select input on the toolbar
- `View/Create/Update/Delete Employees`
- `Search` - you can search users on overview page

## Project Structure
``` bash
├─── index.html
│
├─── src
│
├────── components                      // page parts
│
├────── config                          // component config files to collect in one place. Main purpose is collecting all static information under one folder
│
├────── localization                    // builded localization files. No need to change, automatically created by lit localization
│
├────── router                          // router files
│
├────── store                           // redux store creation and services
├───────── states                       // contains slices
├───────── actionTypes.js               // contains action types used in slices
├───────── index.js                     // serves and persists store
│
├────── styles                          // style files for large style enlistings
│
├────── utils                           // common functions to use in components, views,... etc.
│
├────── views                           // component container, can be considered as pages
│
├────── main.js                         // creating the router enlisting on index.html
```

