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

## Things new to me