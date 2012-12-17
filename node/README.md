## Example Node.js app

This app is an example of how to use the CoreSpring API to find, launch, and get outcomes information from CoreSpring items.

## Prerequisites / Installation

1. Node JS
2. Express Module


Node can be downloaded and installed here: http://nodejs.org/download/

Node comes with the node package manager (npm) with which you can install the Express module:

    > npm install express

Check out the code from this repository, cd into the 'node' directory, and you can now run the app...


## Running

To run the app, type:

    node server.js

In the 'node' directory.

Then go to: http://localhost:8000 on your browser.

The application requires that you use a client ID and secret, you can register as a developer at http://www.corespring.org to receive these credentials.


## About the app

The application is a simple demonstration of finding, launching, and retrieving information about a launched Assessment Item. 

The code in api.js is the client code that calls the CoreSpring api and is the best place for looking at examples of how to call the api.
