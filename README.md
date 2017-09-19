# GithubRecruitmentTool

## Running application

1. Install NodeJS (https://nodejs.org/en/download/) (The application was built using Node v6 LTS)
2. Install Angular Core by running `npm install -g angular-cli`
3. Clone the project to a directory
4. Run `npm install` to install all dependencies
5. Run `ng build` to build the angular components
6. Run `node app.js` to run the application (If there is an exception due to insufficient permission, try `sudo node app.js`; this is becuase we are using the port `80` for the application)

The application will start up, you can access it by opening `http://localhost` in a web browser.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
