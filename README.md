# UrbanTails

## Team

  - __Product Owner__: Queenie Smith
  - __Scrum Master__: Michael Shin
  - __Development Team Members__: Annah Patterson, Yufan Wang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Getting started

1. Open your terminal or command line and run npm install to install your package dependencies (see below for more details). If you do not have MongoDB installed, download and install it using the official documentation - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/.  If you already have MongoDB installed, go to step 2. Next, run mongod.

2. In a new terminal or command line window, run node seed.js to seed your database with sample data.  Then, run webpack -w to watch the files for changes.  For more information about webpack, see the official documentation here - https://webpack.js.org/guides/getting-started/.

3. Finally, run your start script: npm start to start the server.

4. Check your terminal or command line to ensure the database is connected and your server is listening on port 3000.

5. Open your Chrome browser, navigate to http://localhost:3000 to start the app.  We recommend using Chrome browser for compatibility and functionality.  We recommend installing and using React Dev Tools and Chrome Dev Tools for inspecting and debugging.

6. Functionality already implemented includes the following:
    i. Front End with React
        a. New User Sign Up page - checks if username is available, only unique usernames are allowed.
        b. New User Sign Up form - captures additional user information and saves to the database.
        c. Login page - Allows existing users to login, retrieves their profile from the database.
    ii. Server with Express - defines routes and passport authentication protocols for user sessions.
        a. Cookies and sessions are visible in the console under Application or in Mongo Compass.
        b. Sessions are currently set to expire after 2 days.
    iii. Database with MongoDB
        a. Defines the User Schema and Model.
        b. Exports a number of methods to be used by the server and front end to interact with the database.


## Requirements

Run npm install before running the app to install the following dependencies.

"babel-core": "^6.26.0",
"babel-loader": "^7.1.2",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"bcrypt": "^1.0.3",
"body-parser": "^1.18.2",
"connect-mongo": "^2.0.1",
"cookie-parser": "^1.4.3",
"css-loader": "^0.28.10",
"express": "^4.16.2",
"express-session": "^1.15.6",
"jquery": "^3.3.1",
"material-ui": "^0.20.0",
"mongodb": "^3.0.2",
"mongoose": "^5.0.6",
"mongoose-unique-validator": "^2.0.0",
"nodemon": "^1.15.1",
"passport": "^0.4.0",
"passport-local": "^1.0.0",
"passport-local-mongoose": "^5.0.0",
"react": "^16.2.0",
"react-bootstrap": "^0.32.1",
"react-calendar": "^2.13.0",
"react-dom": "^16.2.0",
"react-router": "^4.2.0",
"react-router-dom": "^4.2.2",
"validator": "^9.4.1",
"webpack": "^3.11.0"

## Development

1. Please refer to style guide in this repository for guidance on best practices.

### Installing Dependencies

From within the root directory: run npm install before running the app to install the following dependencies.

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

ROAD MAP
0: server serves index
* express backend that serves dummy data
* frontend: react render index
* server connects to client
* database connected to server
* database: schema for user (pet owner)

1: deploy barebones
*front-end: pages: signup, login
* server routes: /login, /signup, /user
* deploy successfully

2: Users can login and see own profile page
* create user profiles
* create Host Schema
* pet Owner/host toggle on signup -- todo

3: user profiles rendered with data
*seed database
* petowner landing page renders with host listings
* myAccount is accessible
* minimal styling

4: Users can search for hosts by location (LA/NY)
* front-end: add search functionality
* server: make targeted queries to db based on post from search



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
