# Prism UI
This is a [create-react-app](https://github.com/facebook/create-react-app) application, that means all common CLI commands of this kind of app are 
available. 
Let's explain the ones which are most used on Prism daily development.

## Dependencies installation
Not too much to say about this, we use [NPM](https://docs.npmjs.com/about-npm) to handle project's dependencies. 
Execute `npm install` at root directory of this project to install all the required dependencies. 

## Running the application
Also, we use NPM to compile and serve this application in our local environment, run `npm run start` command to start with building and serving process, once this is done you'll see a local URL on you terminal, this URL is where the app will be served.

#### API URL
This project uses a Python-based backend, called **Prism API**, here is the [documentation](https://bitbucket.org/rexdev/prism-api/src/develop/). If for some reason is required to change the API URL where Prism is pointing at, the file `src/store/thunks/thunks.js` is in charge of building an instance of the API client, there you can change the `url` key from the config. 

## Linter
In order to keep the code clean we use [ESLint](https://eslint.org/) among [Airbnb config](https://github.com/airbnb/javascript/tree/master/react) and [React app config](https://www.npmjs.com/package/eslint-config-react-app) both of them are applied automatically by using `nmp run lint` command which will display a list with details about all found linter errors, 
there might be some issue that can be resolved automatically by the linter using `npm run lint -- --fix` command.

## Unit tests
[React testing library](https://testing-library.com/docs/react-testing-library/intro/) is used to mange/run unit testing, in order to run all tests of the project use `npm run test` command.

There are another useful commands:

#### Running a specific test
`npm run test <ComponentName>`
#### Test coverage
We must accomplish at least 80% of test coverage for our code, in order to execute a coverage test use `npm run test:coverage`




