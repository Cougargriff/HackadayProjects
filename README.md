# HackadayProjects
 Node.js app that uses Hackaday's API to display projects

## How to get started
The server runs on node.js so you must have node and npm installed.

To install the dependencies,
> npm install 

This project uses the dotenv node module to add variables to our environment.
You will need a .env file with the necessary information to run the server.
Here is a sample file,

```
  // .env
  API_KEY={YOUR API KEY HERE}
  API_URL=https://api.hackaday.io/v1/
```

To run the project in development mode,
> npm run dev

This starts our node app with nodemon to auto reload when js files are modified. 
Sass will also watch our .sass styling files for changes to recompile into 
our main.css file.

To start our app regularly,
> npm start

This command will compile our sass styling files once, then start our node server.


## How to run tests

This project is configured to use Nightwatch as a testing framework. Testing works best
on a linux / macOS machine. I have had troubles getting webdrivers to work on Windows's
WSL. With that said, I am using the selenium-server to drive a firefox instance for testing running on Arch Linux.

The tests are stored in ./tests.

You can run the tests with,
> npm test

## Thinks to Note

The API seemed to be a bit slow so I attempted some minor optimizations.
In the server, there are in memory caches for project pages, users, taggedProjects, and individual projects. To avoid the problem of these caches becoming out of date, the server 
will only remember the cached data for 30 min. If data is older than 30 min, new data is fetched
and sent to the client which replaces the old cached data.

I'm using vanilla js on the client to make further pagination requests to the server, however,
I opted to use the node-fetch module on the server to simplify API requests with the use of promises and async / await logic. 

### Things new to me

A lot of this project was new to me.

I have never used EJS, SASS or Nightwatch before working on this challenge.

