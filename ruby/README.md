## Example Ruby console app

This app is a simple example of how to use the CoreSpring API to find, launch, and get outcomes information from CoreSpring items.

## Prerequisites / Installation

1. Ruby
2. Json module


Ruby can be downloaded from: http://www.ruby-lang.org/en/downloads/

The rubygems (http://rubygems.org/) will allow you to install the json module:

    >gem install json


Check out the code from this repository, cd into the 'ruby' directory, and you can now run the app...


## Running

The application requires that you use a client ID and secret, you can register as a developer at http://www.corespring.org to receive these credentials.

To run the app, in a terminal type:

    ruby run.rb http://www.corespring.org client_id client_secret

In the 'ruby' directory.

The application will show you prompts on how to continue.

## About the app

The application is a simple demonstration of finding, launching, and retrieving information about a launched Assessment Item. 

The code in api.rb is the client code that calls the CoreSpring api and is the best place for looking at examples of how to call the api.
